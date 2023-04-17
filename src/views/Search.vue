<template>
    <div class="pl-5">
        <h2>Search</h2>
        <div>
            <label>
                <input type="text"  @focus="searchText = null"  v-model="searchText"
                    placeholder="Suchbegriff eingeben">
            </label>
        </div>
        <div>
            <!--<a  class="button postfix" ng-click="doSearch()">Go</a>-->
            <button type="submit" @click="doSearch()" class="button button-search">Go</button>
        </div>

        <p>{{ resultInfo }}</p>
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
            if (this.searchText !== ""  && this.searchText !== null) {
                console.log("doSearch")
                this.searchResultList = this.getObjects(this.tourlist,"",this.searchText);
                if (this.searchResultList) {
                    this.resultInfo = this.getResultInfo(this.searchResultList.length);
                }
            }  else {
                this.resultInfo = "Bitte suchbegriff eingeben";
            }

        },
        getObjects(obj, key, val) {
            let objects = [];
            for (var i in obj) {
                if(!Object.prototype.hasOwnProperty.call(obj,i)) continue
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
        getResultInfo(hits)  {
            let hitsText = "Ergebnisse";
            if (hits === 1)  {
                hitsText = "Ergebnis";
            }
            return hits + " " + hitsText + " für " + this.searchText 
        },
    },
    created()  {
        console.log("created");
        this.storeTours.fetchTourlist().then(() => {
          this.tourlist = this.storeTours.tourlistData;
        });  
    }
}
</script>