<template>
  <TourListFilter 
    :tourlist="tourlist" 
    @filtered-tours="filteredTourList = $event"
    @reset-start-item-index="startItemIndex = 0">
  </TourListFilter>
  
<!-- TourlIst Pagination -->
  <TourListPagination
    :totalItems="totalPages" 
    :itemsPerPage="10"
    :startItemIndex="startItemIndex"
    @change-start-item-index="startItemIndex = $event">
  </TourListPagination>
  <!-- Ausgabe TourenListe -->
  <ul class="mr-1 pl-5 pt-5 pb-1">
      <li v-for="tour in paginatedTourList" :key="tour.id">
          <TourListItem :tour="tour" :filteredTourList="filteredTourList"></TourListItem>
      </li>
  </ul>
</template>


<script>
import { useToursStore } from '@/stores/tours'
import TourListFilter from '../components/TourListFilter.vue';
import TourListPagination from '../components/TourListPagination.vue';
import TourListItem from '../components/TourListItem.vue';

export default {
  name: 'Tourlist',
  components: {
    TourListFilter,
    TourListPagination,
    TourListItem
  },
  inject: ['baseUrl','contentBaseUrl'],
  setup() {
        const storeTours = useToursStore();
        return {
            storeTours
        }
  },
  data() {
    return {
      startItemIndex: 0,
      totalItems: "",
      tourlist: [],
      filteredTourList: [],
    }
  },  
  computed: {
    paginatedTourList() {
      if (this.filteredTourList !== undefined) {
        return this.filteredTourList.slice(this.startItemIndex, this.startItemIndex + 10);
      } else {
        return 0;
      }    
    },
    totalPages() {
      if (this.filteredTourList !== undefined) {
        return  this.filteredTourList.length;
      }
      else { 
         return 0;
      }  
    }
  },  
  created() {
    console.log("TOURLIST CREATED");
    this.storeTours.fetchTourlist().then(() => {
          this.tourlist = this.storeTours.tourlistData;
          if (process.env.NODE_ENV === "development") {
            this.baseUrl = "http://localhost:8080/"
          } 
          console.log("baseUrl: ", this.baseUrl)
          // if filteredTourList in pinia store get this state
          if ( this.storeTours.filteredTourlist.length !== 0) { 
            this.filteredTourList = this.storeTours.filteredTourlist
          } else if (this.filteredTourList.length === 0) { 
            this.filteredTourList = this.tourlist;
          }
          this.totalItems = this.getTotalPages;
          this.startItemIndex = this.storeTours.firstPageItem;
          // store current route
          this.storeTours.routeOrigin = this.$route.name;
      })
  },
  updated() {
    if (this.startItemIndex === 0)  {
      // Reset Pina Store PageItem vars back to default
      this.storeTours.updateFirstPageItem(0);
      this.storeTours.updateLastPageItem(0);
      this.storeTours.previousButton = false;
    }

  }
}
</script>