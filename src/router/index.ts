import { createRouter, createWebHashHistory, RouterOptions } from 'vue-router'

const routes: RouterOptions = {
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: ()=>import('../components/pages/home.vue')
        }, {
            path: '/about',
            component: ()=>import('../components/pages/about.vue')
        }, {
            path: '/random/fake',
            component: ()=>import('../components/pages/random-fake.vue')
        },{
            path: '/random/real',
            component: ()=>import('../components/pages/random-real.vue')
        }, {
            path: '/settings',
            component: ()=>import('../components/pages/settings.vue')
        }
    ]
}

const router = createRouter(routes)

export default router