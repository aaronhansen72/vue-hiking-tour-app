import { defineStore } from 'pinia'
import axios from 'axios';

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useToursStore = defineStore({
    id: 'tours',
    state: () => ({
        tourlistData: [],
        filteredTourlist: [],
        firstPageItem: 0,
        lastPageItem: 0,
        totalItems: 0,
        previousButton: false,
        nextButton: true,
        latestTours: [],
        routeOrigin: "",
        baseUrl: "http://wandern.cube-online.de/",
        tourFilterValue: "",
        activeDropdownPrev: -1,
    }),

    getters: {
        getTourlistData: (state) => {
          return state.tourlistData;
        }
    },
    actions: {
        async fetchTourlist() {
            try {
                if (process.env.NODE_ENV === "development") {
                    this.baseUrl = "http://localhost:8080/"
                }
                const response = await axios.get(this.baseUrl + 'contents/data.json')
                this.tourlistData = response.data.reverse();
            } catch (error) {
                console.log(error);
            }
          },  
        updateFirstPageItem(index) {
            this.firstPageItem = index;
        },
        updateLastPageItem(index) {
            this.lastPageItem = index;
        },
        updateTotalItems(totalItems) {
            this.totalItems = totalItems;
        },
        updateTourlist(tourlist) {
            this.filteredTourlist = tourlist;
        },
        updateLatestTours(latestTours) {
            this.latestTours = latestTours;
        },
        updateTourFilterValue(filterValue) {
             this.tourFilterValue = filterValue;   
        },
        updateActiveDropdownPrev(value) {
            this.activeDropdownPrev = value;
        }
    }

})