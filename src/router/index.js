import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

// Dynamically import routes for increased performance. 
const ExplorePlants = () => import('../components/TheExplorePlants.vue');
const Contact = () => import('../components/TheContactForm.vue');
const MyPlants = () => import('../components/TheMyPlants.vue');
const LearnPlants = () => import('../components/TheLearnPlants.vue');
const NotFound = () => import('../components/TheNotFound.vue');
const LogIn = () => import('../components/TheLogIn.vue');


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
    base: '/',
    routes,
})


router.beforeEach((to) => {


    if (to.path == "/logout") {
        store.commit("user/logOut");
        return "/";
    }
    // Re-Enable after development

    // } else if (to.path != "/" && !store.getters['user/isLoggedIn']) {
    //     return "/";
    // } else if (to.path == "/" && store.getters['user/isLoggedIn']) {
    //     return "/explore";
    // }
    return true;
})


export default router;