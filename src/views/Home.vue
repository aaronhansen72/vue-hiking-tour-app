<template>
    <!-- HOME -->
    <!-- Opener -->
    <template v-for="tour in tourlist.slice(0,1)" :key="tour.id" >
        <div class="main-image-stage mt-5" >
            <!-- Frontpage Image linked -->
            <router-link :to="{ name: 'tour-page',params: { id: tour.id }}">
                <img :src="getImagePath(tour.id, tour.hauptbild)" class="main-image">
            </router-link>  
            <div class="opener mb-6">
                <div class="subheadline"><span class="country-region">{{ formatedDate(tour.id) }} | {{ tour.gebiet }}</span></div>
                <router-link :to="{ name: 'tour-page',params: { id: tour.id }}">
                    <h1>{{ tour.titel }}</h1>
                </router-link>
                <p>{{ tour.untertitel }}</p> 
            </div>
        </div>
    </template>
    <!-- Frühere Touren -->
    <h2 class="ml-5">Frühere Touren</h2>
    <ul class="mr-5 pl-5 pt-5 pb-1">
        <li v-for="tour in tourlist.slice(1,tourItemsLimit)" :key="tour.id">
            <TourListItem :tour="tour" :filteredTourList="tourlist"></TourListItem>
        </li>
    </ul>
    <!-- ENDE HOME -->
</template>
  
<script>
import { useToursStore } from '@/stores/tours'
import TourListItem from '../components/TourListItem.vue'

export default {
    name: 'Home',
    components: {
        TourListItem
    },
    inject: ['baseUrl', 'contentBaseUrl', 'basePathImages', 'formatedDate', 'getImagePath'],
    setup() {
        const storeTours = useToursStore();
        return {
            storeTours
        }
    },
    data() {
        return {
            tourlist: [],
            filteredTourList: [],
            latestTours: [],
            tourItemsLimit: 6,
        }
    },
    methods: {
        getLatestTours(tourArray) {
            return tourArray.reverse();
        }
    },
    created() {
        console.log("HOME CREATED = ");
        this.storeTours.fetchTourlist().then(() => {
            this.tourlist = this.storeTours.tourlistData;
        })

    }
}
</script>
  