import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap'
import { createRoute, createWebHistory } from 'vue-router'
import TechStackList from './components/pages/TechStackList'
import TechStackCreate from './components/pages/TechStackCreate'
import TechStackEdit from './components/pages/TechStackEdit'
import TechStackShow from './components/pages/TechStackShow'

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

const router = createRoute({
    history: createWebHistory(),
    routes: [
        { path: '/', component: TechStackList },
        { path: '/create', component: TechStackCreate },
        { path: '/edit/:id', component: TechStackEdit },
        { path: '/show/:id', component: TechStackShow }
    ]
});

createApp(App).use(router).mount('#app')
