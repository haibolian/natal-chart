import { createRouter, createWebHashHistory } from 'vue-router'

import Home from "@/views/Home.vue";
import LifeChart from '@/views/life-chart/index.vue';

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
    path: '/life-chart',
    component: LifeChart,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router