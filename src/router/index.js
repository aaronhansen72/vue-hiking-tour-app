import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
//import Overview from '../views/Overview.vue';
import Tour from '../views/Tour.vue';
import Tourlist from '../views/TourList.vue'
import Search from '../views/Search.vue';


const routes = [
  { path: '/', name: "home", component: Home},
  { path: '/tourlist', name: "tour-list", component: Tourlist},  
  { path: '/tour/:id', name: "tour-page", component: Tour},   
  { path: '/search', name: "tour-search", component: Search},  
];



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
