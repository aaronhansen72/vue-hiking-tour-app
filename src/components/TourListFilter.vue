<template>
     <div class="pl-5 pr-5 mt-6 mb-3">
    <div>
        <ul class="hnx-tabnav">
            <li class="tab" v-bind:class="{'active': activeDropdownPrev === -1}"><a href="#" @click="filterTourlist(tourlist, '', '')">Gesamt</a>
            </li>
            <li class="tab" v-bind:class="{'active': activeDropdownPrev === 1}"><a href="#" @click="openTabnavDropdown(1)">Jahr</a>
                <ul class="dropdown" v-bind:class="{'open': activeDropdown === 1}">
                    <li v-for="year in years" :key="year">
                        <a href="#" @click="filterTourlist(tourlist, 'jahr',year)">{{ year }}</a>
                    </li>
                </ul>
            </li>
            <li class="tab" v-bind:class="{'active': activeDropdownPrev === 2}"><a href="#" @click="openTabnavDropdown(2)">Land</a>
                <ul class="dropdown" v-bind:class="{'open': activeDropdown === 2}">
                    <li v-for="country in countries" :key="country">
                        <a href="#" @click="filterTourlist(tourlist, 'land',country)">{{ country }}</a>
                    </li>
                </ul>
            </li>
            <li class="tab" v-bind:class="{'active': activeDropdownPrev === 3}"><a href="#" @click="openTabnavDropdown(3)">Kategorie</a>
                <ul class="dropdown" v-bind:class="{'open': activeDropdown === 3}">
                    <li><a href="#" @click="filterTourlist(tourlist, 'category','Winterwanderung')">Winterwanderung</a></li>
                </ul>
            </li>
        </ul>    
    </div>
    <div class="col-center mt-4 mb-3"><span class="list-category">{{ currentFilter }}</span></div>
   </div>
   
</template>

<script>
import { useToursStore } from '@/stores/tours'

export default {
    name: "TourListFilter",
    props: [ "tourlist" ], 
    setup() {
        const storeTours = useToursStore();
        return {
            storeTours
        }
   },       
    data: function () {
        return {
            // activeTab: 'Jahr',
            // position: 'is-right',
            activeDropdown: -1,
            activeDropdownPrev: -1,
            countries: [ 'Deutschland','Italien','Korsika', 'Österreich','Norwegen','Schweiz','Spanien','Slowenien', 'Wales'],
            years: ['2024','2023','2022','2021','2020','2019','2018','2017','2016','2015','2014'],
            currentFilter: ''
        }
    },      
    methods: {
        filterTourlist (_tourlist, filterKey, filterValue)  {
            console.log("filterTourlist filterKey: " + filterKey + " = " + filterValue );
            let newArray = _tourlist.filter(function( currentObject) {
                switch (filterKey) {
                    case "land":
                        return currentObject.land == filterValue;
                    case "jahr":
                        return currentObject.id.substring(0,4) == filterValue;
                    case "category":
                        return currentObject.category == filterValue;                        
                    default:
                        return currentObject;
                        //break;
                }
            })
            this.$emit('filtered-tours', newArray);
            this.$emit('reset-start-item-index');
            this.activeDropdownPrev = this.activeDropdown; 
            this.activeDropdown = -1;
            this.currentFilter = filterValue;
            this.storeTours.updateTourFilterValue(filterValue);
            this.storeTours.updateActiveDropdownPrev(this.activeDropdownPrev);
        },
        openTabnavDropdown(index) {
            // Tabnav Item active setzen
            // dropdown muss aufklappen
            this.activeDropdown = index;
        },
        closeAllDropdowns (e) {
            if (!this.$el.contains(e.target)) {
                this.activeDropdown = -1;
            }
        }
    },
    created() {
        document.addEventListener('click', this.closeAllDropdowns);
        if(this.storeTours.tourFilterValue.length !== 0)  {
            this.currentFilter = this.storeTours.tourFilterValue;
        }
        if(this.storeTours.activeDropdownPrev !== 0)  {
            this.activeDropdownPrev = this.storeTours.activeDropdownPrev;
        }
    }, 
    beforeUnmount () {
        document.removeEventListener('click',this.closeAllDropdowns);
    }   
};
</script>

<!--


<style scoped>

ul.hnx-tabnav {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #cfcccc;
}

.hnx-tabnav > li {
  float: left;
  background-color: rgb(180, 184, 184);
}

.hnx-tabnav > li a {
  display: block;
  color: rgb(7, 7, 7);
  text-align: center;
  padding: 16px;
  text-decoration: none;
  border-bottom: 3px solid rgb(245, 209, 8);   
}

.hnx-tabnav > li a:hover {
  background-color: #e9e9e987;
}

.hnx-tabnav .active {
	background-color: #bf1d1d87;
    border-bottom-color: transparent;
   

}

.hnx-tabnav .dropdown {
    position: absolute;
    display: none;
    visibility: visible;
    opacity: 1;
    list-style-type: none;
    background-color: beige;
    border-left: 3px solid #00883a;
    border-bottom: 3px solid #00883a;
    border-right: 3px solid #00883a;
    min-width: 160px;
    max-height: 370px;
    z-index: 1000;
}

.hnx-tabnav .dropdown.open {
    display:block;
}
 

</style>
-->