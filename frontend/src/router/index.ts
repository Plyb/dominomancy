import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../pages/Home.vue'
import Lobby from '../pages/Lobby.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Lobby',
    name: 'Lobby',
    component: Lobby
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
