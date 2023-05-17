<template>
    <article>
    <!-- Page Navigation -->
    <div class="pagenav font-bigger pl-5 pr-5 mb-5">
        <div class="col col-right-big">
            <template v-if="showButtonPrevPage">
                <a href="#" @click.stop="linkToRoute(previousPage)">&lt;&lt;</a>
            </template>
        </div>
        <div class="col col-left-big">
            <template v-if="showButtonNextPage">
                <a href="#" @click.stop="linkToRoute(nextPage)">&gt;&gt;</a>
            </template>
        </div>
    </div>
    <!-- Tour Data Summary -->
    <div v-if="tour">
        <!-- Detail Page: Article Head-->
         <div class="article-head pl-5 pr-5 mb-4">
            <div class="subheadline">{{ formatedDate(tour.id) }} | {{ tour.land }} - {{ tour.gebiet }}</div>
            <h1>{{ tour.titel }}</h1>
            <p>{{ tour.untertitel }}</p> 
        </div>
        <!-- Main Image -->
        <div class="main-image-stage">
            <a href="#image_gallery" >
                <img :src="getImagePath(tour.id, tour.hauptbild)" class="main-image">
            </a>
        </div>
        <!-- Tour Info -->
        <section class="pl-5 pr-5 mt-5 mb-5 mt-dtp mb-dtp">
          <table>
            <tbody>
             <tr>
                <td>Datum</td>
                <td>{{ formatedDate(tour.id) }}</td>
             </tr>
             <tr>
                <td>Höhe</td>
                <td>{{ tour.hoehe }} m</td>
             </tr>
             <tr>
                <td>Dauer</td>
                <td>{{ tour.dauer }} Std</td>
             </tr>
             <tr>
                <td>Höhendifferenz</td>
                <td>{{ tour.aufstieg }} m ↑  {{ tour.abstieg }} m ↓</td>
             </tr>
             <tr>
                <td>Distanz</td>
                <td>{{ tour.distanz }} km</td>
             </tr>				
            </tbody>
           </table>
        </section>
    </div>

    <!-- Page Content -->
    <section v-html="pageContent" class="article-main pl-5 pr-5 mb-6 pl-extra-dtp pr-extra-dtp mb-dtp">
    </section>

    <!-- Images as Vanilla JS FsLightbox with data-fslightbox attribute -->
    <section class="pl-5 pr-5 mb-5" id="image_gallery">
        <h2 class="mb-3">Fotos ({{ tour.bildanzahl  }})</h2>
        <div class="gallery mt-5">
            <template v-for="tourImage in tourImages" :key="tourImage.id">
                <a data-fslightbox="tour-lightbox" :href="tourImage" exitFullscreenOnClose>
                    <img :src="tourImage" >
                </a>
            </template>
        </div>
    </section>
    </article>

    <!-- Related Tours-->
    <template v-if="relatedTours.length > 0">
        <h2 class="ml-5 mb-3">Siehe auch</h2>
        <div class="box-related-tours mb-5 mr-5 ml-5">
            <ul class="mr-5 pl-5 pt-5 pb-1">
                <li v-for="relatedTour in relatedTours" :key="relatedTour">
                    <TourListItem :tour="relatedTour" :filteredTourList="tourlist"  @tour-id-changed="refreshTourPage"></TourListItem>
                </li>
            </ul>
        </div>
    </template>

</template>

<script>
import { useToursStore } from '@/stores/tours'
import TourListItem from '../components/TourListItem.vue';

export default {
    name: 'Tour',
    components: {
        //FsLightbox
        TourListItem
    },
    inject: ['baseUrl', 'contentBaseUrl', 'basePathImages', 'formatedDate', 'getImagePath'],
    setup() {
        const storeTours = useToursStore();
        return {
            storeTours
        }
    },
    data: function () {
        return {
            tour: "",
            tourId: this.$route.params.id,
            tourlist: [],
            pageContent: "",
            tourImages: [],
            basePathText: "contents/texte/",
            tmpId: '20160922',
            previousPage: "",
            nextPage: "",
            showButtonNextPage: true,
            showButtonPrevPage: true,
            relatedTours: []
        }
    },
    created(id) {
        console.log("TOUR CREATED:", id)

        this.storeTours.fetchTourlist().then(() => {
            this.tourlist = this.storeTours.tourlistData
            console.log("this.tourlist:",this.tourlist[0].titel)
            // to determine previousPage, nextpage reverse this.tourlist
            //this.tourlist = this.tourlist.reverse();
            console.log("DEBUG:",this.tourlist[0].titel)
            console.log("baseUrl: ", this.baseUrl)
            if (process.env.NODE_ENV === "development") {
                this.baseUrl = "http://localhost:8080/"
                this.contentBaseUrl = "http://localhost:8080/"
                //this.contentBaseUrl = "http://wandern.hanx.de/"
            } 
            console.log("baseUrl: ", this.baseUrl)
            console.log("contentBaseUrl: ", this.contentBaseUrl)
            // Loading Vanilla JS FsLightbox from external file (not the a vue version)        
            this.setupFsLightbox();
            console.log("this.storeTours.filteredTourlist", this.storeTours.filteredTourlist.length)
            this.renderPageData(this.tourId); 
        }); 
    },
    methods: {
        renderPageData(id)  {
            this.tour = this.getTourById(id);
            if (this.tour === undefined) {
                this.showButtonNextPage = false;
                this.showButtonPrevPage = false;
                return
            }
            this.previousPage = this.getPreviousTourId(this.tour);
            this.nextPage = this.getNextTourId(this.tour);
            //this.previousPage = this.getNextTourId(this.tour);
            //this.nextPage = this.getPreviousTourId(this.tour);

            this.loadPageContent(id);
            this.loadPageImages();
            if (this.tour.related_ids !== undefined ) {
                this.relatedTours = this.getRelatedTours(this.tour.related_ids);
            } else {
                this.relatedTours = [];
            }
            let externalScript3 = document.createElement('script')
            externalScript3.setAttribute('src', this.baseUrl + '/libs/fslightbox_refresh.js')
            document.head.appendChild(externalScript3);
            document.head.removeChild(externalScript3);
        },
        async loadPageContent(tourId) {
            try {
                const response = await fetch(this.contentBaseUrl + this.basePathText + this.tourId.substring(0, 4) + "/" + tourId + ".html");
                if (response.status === 404) {
                    this.pageContent = "sorry folks, no content found."
                } else {
                    const data = await response.text()
                    this.pageContent = data;
                }
            } catch (error) {
                console.log("error loadPageContent:" + error);
            }
        },
        loadPageImages() {
            this.tourImages = [];
            this.baselUrl = "";
            let filenamePrefix = "0";
            for (var i = 1; i <= this.tour.bildanzahl; i++) {
                if (i > 9) {
                    filenamePrefix = "";
                }
                var currentImage = this.contentBaseUrl + this.basePathImages + this.tourId.substring(0, 4) + "/" + this.tourId + "/" + filenamePrefix + i + ".jpg"
                this.tourImages.push(currentImage);
            }
        },
        getTourById(id) {
            return this.tourlist.find(x => x.id === id);
        },
        getNextTourId(tour) {
            this.showButtonNextPage = true;
            let index = this.tourlist.indexOf(tour);
            if (this.tourlist[index - 1] !== undefined) {
                return this.tourlist[index - 1].id;
            } else {
                console.log("next element does not exists");
                this.showButtonNextPage = false;
                return -1
            }

        },
        getPreviousTourId(tour) {
            this.showButtonPrevPage = true;
            let index = this.tourlist.indexOf(tour);
            if (this.tourlist[index + 1] !== undefined) {
                return this.tourlist[index + 1].id;
            } else {
                console.log("previous element does not exists");
                this.showButtonPrevPage = false;
                return -1
            }

        },
        linkToRoute(id) {
            this.$router.push({
                name: "tour-page",
                params: {
                    id: id
                },
            });
            console.log("$router.push id: ", id)
            this.tourId = id;
            this.renderPageData(this.tourId);
        },
        refreshTourPage(emitArg)  {
            // vue-convention: an emiited  value is always the first parameter of a event handler method
            // thus the name doesn't matter
            this.tourId = emitArg;
            this.renderPageData(this.tourId); 
        },
        getRelatedTours(ids)  {
            const relatedTours = [];
            const relatedTourIds = ids.split(",");
            for (var i = 0; i < relatedTourIds.length; i++) {
                if (this.getTourById(relatedTourIds[i].trim()) !== undefined) {
                    relatedTours.push(this.getTourById(relatedTourIds[i].trim())); 
                }
            }
            return relatedTours; 
        },
        setupFsLightbox() {
            let fsLightboxScript = document.createElement('script')
            let fsLightboxCustomScript = document.createElement('script')
            fsLightboxScript.setAttribute('src', this.baseUrl + '/libs/fslightbox.js')
            fsLightboxCustomScript.setAttribute('src', this.baseUrl + '/libs/fslightbox_custom.js')
            document.head.appendChild(fsLightboxScript)
            document.body.appendChild(fsLightboxCustomScript)
        }
    }
};
</script>


