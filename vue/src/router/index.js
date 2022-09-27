import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', name: 'RPS', component: () => import(/* webpackChunkName: "rps" */ '../views/RPS.vue') }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
