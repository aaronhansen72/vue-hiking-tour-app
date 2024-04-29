<template>
    <div class="list-item mb-6">
        <div class="list-item-image mr-6 mb-4">
            <a href="#" @click.stop="linkToRoute(tour.id)" id="teaser-01">
                <img :src="getImagePath(tour.id, tour.hauptbild)" loading="lazy"  class="teaser-image">
            </a>  
        </div>
        <div class="list-item-text">
            <div class="subheadline">{{ formatedDate(tour.id) }} | {{ tour.gebiet }}</div>
            <a href="#" @click.stop="linkToRoute(tour.id)">
                <h2>{{ tour.titel }}</h2>
            </a>
            <p>{{ tour.untertitel }}</p> 
        </div>
    </div>
</template>

<script>
import { useToursStore } from '@/stores/tours'

export default {
    name: "TourListItem",
    props: ["tour", "filteredTourList"],
    emits: ['tour-id-changed'],
    inject: ['baseUrl', 'contentBaseUrl', 'formatedDate'],
    setup() {
        const storeTours = useToursStore();
        return {
            storeTours
        }
    },
    data() {
        return {
            basePathImages: "contents/fotos/",
        }
    }, 
    methods: {
        async linkToRoute(id) {
            console.log("$router.push: ", id);
            console.log("linkToRoute - this.filteredTourList", this.filteredTourList.length);
            const routeOrigin = this.$route.name;
            this.storeTours.updateTourlist(this.filteredTourList);
            await this.$router.push({
                name: "tour-page",
                params: {
                    id: id,
                }
            });
            // Emit the tour id when route-link origin is tour-page (e.g. related tours)
            if( routeOrigin === "tour-page") {
                //location.reload();
                console.log("emit tour-id-chamnged, because routeOrigin = ", routeOrigin)
                this.$emit('tour-id-changed', id);

            }
        },
        getImagePath(tourId, fileName) {
            return this.contentBaseUrl + this.basePathImages + tourId.substring(0, 4) + "/" + tourId + "/" + fileName + ".jpg"
        }
    }
}

</script>