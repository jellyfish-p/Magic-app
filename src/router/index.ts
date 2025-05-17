import { createRouter, createWebHashHistory, RouterOptions } from 'vue-router'

const routes: RouterOptions = {
    history: createWebHashHistory(),
    routes: [
        {
            path: '/random',
            component: () => import('../components/pages/random.vue')
        }, {
            path: '/',
            redirect: '/random'
        }, {
            path: '/about',
            component: () => import('../components/pages/about.vue')
        }, {
            path: '/config',
            component: () => import('../components/pages/config.vue')
        }
    ]
}

const router = createRouter(routes)

export default router