import { createRouter, createWebHistory } from 'vue-router';
// import store from '../store';

import ExplorePlants from '../components/TheExplorePlants.vue';
import Contact from '../components/TheContactForm.vue';
import MyPlants from '../components/TheMyPlants.vue';
import LearnPlants from '../components/TheLearnPlants.vue';
import NotFound from '../components/TheNotFound.vue';
import LogIn from '../components/TheLogIn.vue';


const routes = [
    { path: '/', name: '/', component: LogIn },
    { path: '/explore', name: 'explore', component: ExplorePlants },
    { path: '/contact', name: 'contact', component: Contact },
    { path: '/my-plants', name: 'my-plants', component: MyPlants },
    { path: '/learn', name: 'learn', component: LearnPlants },
    { path: '/:pathMatch(.*)', name: 'NotFound', component: NotFound },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    base: process.env.environment === 'development' ? '/' : '/tend',
})


router.beforeEach(() => {

    // Re-Enable after development

    // if (to.path == "/logout") {
    //     store.commit("user/logOut");
    //     return "/";
    // } else if (to.path != "/" && !store.getters['user/isLoggedIn']) {
    //     return "/";
    // } else if (to.path == "/" && store.getters['user/isLoggedIn']) {
    //     return "/explore";
    // }
    return true;
})


export default router;