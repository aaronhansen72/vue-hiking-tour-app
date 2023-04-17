<template>
    <!-- Tourlist Page: Pagination  -->
    <section>
        <div class="pagenav pl-5 pr-5 mb-5">
            <div class="col col-left"><a href="#" @click="decrementIndex" v-if="hasPrevious">zuruck</a> </div>
            <div class="col col-center">{{firstPageItem + 1}} -  {{lastPageItem }}/ {{ totalItems }}</div>
            <div class="col col-right"><a href="#" @click="incrementIndex" v-if="hasNext">weiter</a></div>
        </div>
    </section>
</template>

<script>
import { useToursStore } from '@/stores/tours'

export default {
    name: "TourListPagination",
    props: [ "totalItems","itemsPerPage", "startItemIndex"],
    setup() {
        const storeTours = useToursStore();
        return {
            storeTours
        }
    },    
    data: function () {
        return {
            modifiedStartItemIndex: this.startItemIndex,
            firstPageItem: this.startItemIndex,
            lastPageItem: 0,
            // lastPageItem: this.startItemIndex + this.itemsPerPage + 1,
            hasNext: true,
            hasPrevious: false

        }
    },
    methods: {
        getLastPageItem() {
            this.lastPageItem = this.startItemIndex + this.itemsPerPage;
            if (this.lastPageItem > this.totalItems) {
                this.lastPageItem = this.totalItems
            }
        },
        incrementIndex() {
            this.hasPrevious = true;
            if (this.modifiedStartItemIndex < this.totalItems - 10) {
                this.modifiedStartItemIndex += this.itemsPerPage;
                this.firstPageItem +=  this.itemsPerPage;   
                this.lastPageItem  +=  this.itemsPerPage; 
                this.hasNext = true; 
                if (this.lastPageItem >= this.totalItems) {
                    this.lastPageItem = this.totalItems;
                    this.hasNext = false;
                }
            }
            this.storeTours.updateFirstPageItem(this.firstPageItem);
            this.storeTours.updateLastPageItem(this.lastPageItem);
            this.storeTours.updateTotalItems(this.totalItems);
            this.storeTours.nextButton = this.hasNext;
            this.storeTours.previousButton = this.hasPrevious;
            this.$emit('change-start-item-index', this.modifiedStartItemIndex);
        },
        decrementIndex() {
            this.hasNext = true;
            if (this.modifiedStartItemIndex > 0) {
                this.modifiedStartItemIndex -= this.itemsPerPage;
                this.firstPageItem -=  this.itemsPerPage;
                this.lastPageItem  =  this.firstPageItem + this.itemsPerPage;
                this.hasPrevious = true;      
            } else {
                this.hasPrevious = false;
            }
            this.storeTours.updateFirstPageItem(this.firstPageItem);
            this.storeTours.updateLastPageItem(this.lastPageItem);
            this.storeTours.updateTotalItems(this.totalItems);
            this.storeTours.nextButton = this.hasNext;
            this.storeTours.previousButton = this.hasPrevious;
            this.$emit('change-start-item-index', this.modifiedStartItemIndex);
        },
        resetPagination() {
                this.modifiedStartItemIndex = 0;
                this.firstPageItem = this.startItemIndex;
                this.lastPageItem = this.startItemIndex + this.itemsPerPage;
                this.hasNext = true,
                this.hasPrevious = false
        }        
    },
    watch: {
        // Pagenav Werte resetten, wenn startItemIndex 0 ist 
        startItemIndex: function () {
            if (this.startItemIndex === 0) {
                this.resetPagination();
            }
        },
        totalItems: function() {
            this.hasNext = true;
            this.getLastPageItem();
            if (this.lastPageItem >= this.totalItems) {
                this.hasNext = false;
            }    
        }
    },
    mounted() {
        this.firstPageItem = this.storeTours.firstPageItem;
        this.lastPageItem = this.storeTours.lastPageItem;
        this.hasNext = this.storeTours.nextButton;
        this.hasPrevious =  this.storeTours.previousButton;
        //this.totalItems = this.storeTours.totalItems;
        // wenn firstPageParam im Pinia store, dann nimm diesen Wert
        if (this.storeTours.firstPageItem !== 0) {
            this.modifiedStartItemIndex = this.storeTours.firstPageItem;
        }
    }
};
</script>

