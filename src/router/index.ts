import { createRouter, createWebHashHistory, RouterOptions } from 'vue-router'

import HOME from '../components/pages/home.vue'
import ABOUT from '../components/pages/about.vue'
import RANDOM_FAKE from '../components/pages/random-fake.vue'
import RANDOM_REAL from '../components/pages/random-real.vue'
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
            path: '/random/fake',
            component: RANDOM_FAKE
        },{
            path: '/random/real',
            component: RANDOM_REAL
        }, {
            path: '/settings',
            component: SETTINGS
        }
    ]
}

const router = createRouter(routes)

export default router