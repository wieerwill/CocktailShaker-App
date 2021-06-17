import {
    createRouter,
    createWebHistory
} from '@ionic/vue-router';
import Tabs from './views/Tabs.vue'

const routes = [{
        path: '/',
        redirect: '/tabs/Shake'
    },
    {
        path: '/tabs/',
        component: Tabs,
        children: [{
                path: '',
                redirect: '/tabs/Shake'
            },
            {
                path: 'Shake',
                component: () => import('@/views/Shake.vue')
            },
            {
                path: 'Shake/:id',
                component: () => import('@/views/ViewCocktail.vue')
            },
            {
                path: "New",
                component: () => import('@/views/NewCocktail.vue')
            },
            {
                path: "New/:id",
                component: () => import('@/views/EditCocktail.vue')
            },
            {
                path: 'Cocktails',
                component: () => import('@/views/Cocktails.vue')
            },
            {
                path: "Apikey",
                component: () => import('@/views/ApiKey.vue')
            },
            {
                path: "motiondetector",
                component: () => import('@/views/MotionDetector.vue')
            }
        ]
    },
    {
        path: "/:catchAll(.*)",
        name: "pageNotFound",
        component: () => import('@/views/PageNotFound.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router