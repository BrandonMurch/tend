import { createApp } from 'vue';
import './assets/css/style.css'

import store from './store';
import router from './router';

import App from './App.vue';

const vue = createApp(App)

vue.use(router)
    .use(store)
    .mount('#app')

// vue.config.performance = true;
// vue.config.devtools = true;
