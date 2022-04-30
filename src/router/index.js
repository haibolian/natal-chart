import { createRouter, createWebHashHistory } from 'vue-router'

import Home from "@/views/Home.vue";
import NatalChart from '@/views/natal-chart/index.vue';

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/natal-chart',
    component: NatalChart,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router