import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

// Dynamically import routes for increased performance. 
const ExplorePlants = () => import('../components/TheExplorePlants.vue');
const Contact = () => import('../components/TheContactForm.vue');
const MyPlants = () => import('../components/TheMyPlants.vue');
const PlantProfilePrivate = () => import('../components/PlantProfilePrivate.vue');
const LearnPlants = () => import('../components/TheLearnPlants.vue');
const NotFound = () => import('../components/TheNotFound.vue');
const LogIn = () => import('../components/TheLogIn.vue');
const ArticleDisplay = () => import('../components/ArticleDisplay.vue');
const QuestionsViewList = () => import('../components/QuestionsViewList.vue');
const QuestionsViewSingle = () => import('../components/QuestionsViewSingle.vue');
const SpeciesView = () => import('../components/SpeciesView.vue');


const routes = [
    { path: '/', name: '/', component: LogIn },
    { path: '/explore', name: 'explore', component: ExplorePlants },
    { path: '/contact', name: 'contact', component: Contact },
    { path: '/my-plants/:id', name: 'private-plant', component: PlantProfilePrivate },
    { path: '/my-plants', name: 'my-plants', component: MyPlants },
    { path: '/species/:name', name: 'species', component: SpeciesView },

    { path: '/learn/articles/:id', name: 'articles', component: ArticleDisplay },
    { path: '/learn/questions/:answered/:id', name: 'question', component: QuestionsViewSingle },
    { path: '/learn/questions/:answered', name: 'questions-list', component: QuestionsViewList },
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