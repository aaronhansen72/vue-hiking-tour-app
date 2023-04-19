<template>
    <div class="pl-5">
        <h2 class="mb-3">Suche</h2>
        <!-- Search Field -->
        <div id="searchbox" class="pr-6 mb-6">
            <input type="search" @click="emptyFormField" @focus="searchText = null" v-model="searchText"
                placeholder="Suchbegriff eingeben">
            <button type="submit" @click="doSearch()" class="button button-search">Go</button>
        </div>
        <!-- Search Result -->
        <p class="mt-5 mb-6" v-html="resultInfo"></p>
        <div v-for="tour in searchResultList" :key="tour.id">
            <TourListItem :tour="tour" :filteredTourList="tourlist"></TourListItem>
        </div>
    </div>
</template>
  
<script>
import { useToursStore } from '@/stores/tours'
import TourListItem from '../components/TourListItem.vue'

export default {
    name: 'Search',
    components: {
        TourListItem
    },
    setup() {
        const storeTours = useToursStore();
        return {
            storeTours
        }
    },
    data() {
        return {
            tourlist: [],
            searchResultList: [],
            searchText: "",
            resultInfo: ""
        }
    },
    methods: {
        doSearch() {
            this.searchResultList = [];
            if (this.searchText !== "" && this.searchText !== null) {
                console.log("doSearch")
                this.searchResultList = this.getObjects(this.tourlist, "", this.searchText);
                if (this.searchResultList) {
                    this.resultInfo = this.getResultInfo(this.searchResultList.length);
                }
            } else {
                this.resultInfo = "Bitte Suchbegriff eingeben";
            }

        },
        getObjects(obj, key, val) {
            let objects = [];
            for (var i in obj) {
                if (!Object.prototype.hasOwnProperty.call(obj, i)) continue
                //if (!obj.hasOwnProperty(i)) continue;
                if (typeof obj[i] == 'object') {
                    objects = objects.concat(this.getObjects(obj[i], key, val));
                } else
                    //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
                    if (i == key && obj[i] == val || i == key && val == '') {
                        objects.push(obj);
                        console.log("BUMM");
                    } else if (obj[i].toLowerCase().indexOf(val.toLowerCase()) != -1 && key == '') {
                        // console.log("## NUR val obj[i]=" + obj[i] + " i=" + i);
                        //only add if the object is not already in the array
                        if (objects.lastIndexOf(obj) == -1) {
                            objects.push(obj);
                        }
                    }
            }
            return objects;
        },
        getResultInfo(hits) {
            let hitsText = "Ergebnisse";
            if (hits === 1) {
                hitsText = "Ergebnis";
            }
            return hits + " " + hitsText + " für <b>" + this.searchText + "</b>"
        },
        emptyFormField() {
            this.searchResultList = [];
            this.resultInfo = "";
        }
    },
    created() {
        console.log("created");
        this.storeTours.fetchTourlist().then(() => {
            this.tourlist = this.storeTours.tourlistData;
        });
    }
}
</script>

<style scoped>
#searchbox {
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
}

.searchkey {
    font-size: 3em;
    color: red;
}

input[type="search"] {
    border: none;
    /*border-radius: 5px 5px 5px 5px;*/
    background: rgba(233, 233, 233, 0.5294117647);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0.35em 0.75em;
    border: none;
    font-size: 1rem;
    text-decoration: none;
    line-height: normal;
    max-height: 3em;

    flex: 2 0 70%;
}

input[type="search"]:focus {
    background: #b1a8a8;
    color: white;
    letter-spacing: .1em;
    transition: background 400ms ease-in-out;
    outline: none;
}

button {
    flex: 1 0 20%;

    max-height: 3em;
    font-size: 1.1em;
    letter-spacing: .2em;
    text-transform: uppercase;
    /*border-radius: 0px 5px 5px 0px;*/
    background: rgba(153, 51, 0, 0.8196078431);
    color: white;
    border: none;
    padding: 0.35em 0.75em;
    cursor: pointer;

}

button:hover {
    background: #993300;
}
</style>
