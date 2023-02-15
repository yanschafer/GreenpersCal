import {createRouter, createWebHistory} from 'vue-router'
import HomeView from "@/views/HomeView.vue";


const routes = [
    {
        path: '/',
        component: () => HomeView,
    },
    {
        path: '/bot/:jetBotId/:telegramId',
        component: () => HomeView,
        meta: { tg: true }
    }
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to) => {
    if (to.meta.tg) {
        localStorage.setItem('jetBotId', to.params.jetBotId)
        localStorage.setItem('telegramId', to.params.telegramId)
        return {
            path: '/'
        }
    }
})
export default router