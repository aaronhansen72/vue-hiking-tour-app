<template>
  <div class="header pl-5 mb-6">
    <!-- LOGO -->
    <div id="logo" class="mb-2">
      <router-link to="/" class="logo">Bergtouren & Wanderungen</router-link>
      <img src="@/assets/images/bear_and_cat.png" />
    </div>
    <!-- NAVIGATION -->
    <nav>
      <router-link to="/">HOME</router-link>
      <router-link to="/tourlist">ÜBERSICHT</router-link>
      <router-link to="/search">SUCHE</router-link>
    </nav>
  </div>
  <!-- CONTENT AREA -->
  <router-view />
  <!-- CONTENT AREA ENDE  -->

  <!-- Go Top Navigation -->
  <div class="navgotop mr-4 mb-6">
    <a href="#">Nach oben</a>
  </div>
</template>

<script>
import { useToursStore } from '@/stores/tours'
// import useFetcher from './composables/useFetcher.js'

export default {
  name: 'App',
  components: {

  },
  provide() {
    return {
      baseUrl: 'http://wandern.cube-online.de/',
      contentBaseUrl: 'http://wandern.hanx.de/',
      basePathImages: "contents/fotos/",
      formatedDate(id) {
        let formatedDate = ""
        if (id !== 'undefined') {
          formatedDate += id.toString().substring(6, 8) + ".";
          formatedDate += id.toString().substring(4, 6) + ".";
          formatedDate += id.toString().substring(0, 4);
        }
        return formatedDate
      },
      getImagePath(tourId, fileName) {
        return this.contentBaseUrl + this.basePathImages + tourId.substring(0, 4) + "/" + tourId + "/" + fileName + ".jpg"
      }
    }
  },
  setup() {
    const storeTours = useToursStore();
    return {
      storeTours
    }
  },
  created() {
    console.log("APP CREATED"); 
  }
}
</script> 

