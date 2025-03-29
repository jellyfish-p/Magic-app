import { createRouter, createWebHashHistory, RouterOptions } from 'vue-router'

import HOME from '../components/pages/home.vue'
import ABOUT from '../components/pages/about.vue'
import RANDOM from '../components/pages/random.vue'
import SETTINGS from '../components/pages/settings.vue'

const routes: RouterOptions = {
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: HOME
        }, {
            path: '/about',
            component: ABOUT
        }, {
            path: '/random',
            component: RANDOM
        }, {
            path: '/settings',
            component: SETTINGS
        }
    ]
}

const router = createRouter(routes)

export default router