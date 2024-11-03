import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createRouter, createWebHistory } from 'vue-router'
import TechStackList from './components/pages/TechStackList.vue'
import TechStackCreate from './components/pages/TechStackCreate.vue'
// import TechStackEdit from './components/pages/TechStackEdit'
// import TechStackShow from './components/pages/TechStackShow'

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: TechStackList },
        { path: '/create', component: TechStackCreate },
        // { path: '/edit/:id', component: TechStackEdit },
        // { path: '/show/:id', component: TechStackShow },
    ],
});

createApp(App).use(router).mount('#app')
