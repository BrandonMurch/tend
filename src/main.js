import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import './assets/css/style.css'
import ExplorePlants from './components/ExplorePlants.vue';
import Contact from './components/ContactForm.vue';
import MyPlants from './components/MyPlants.vue';
import LearnPlants from './components/LearnPlants.vue';
import NotFound from './components/NotFound.vue';

const routes = [
    { path: '/', name: '/', component: ExplorePlants },
    { path: '/explore', name: 'explore', component: ExplorePlants },
    { path: '/contact', name: 'contact', component: Contact },
    { path: '/my-plants', name: 'my-plants', component: MyPlants },
    { path: '/learn', name: 'learn', component: LearnPlants },
    { path: '/:pathMatch(.*)', name: 'NotFound', component: NotFound },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


createApp(App).use(router).mount('#app')
