import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import FarmingTreeRunsView from '../views/farming/TreeRunsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    /*{
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }*/
    {
      path: '/farming/tree-runs',
      name: 'farming_treeruns',
      component: FarmingTreeRunsView
    },
    {
      path: '/clue-hunting/lightbox-solver',
      name: 'cluehunting_lightboxsolver',
      component: () => import('../views/clue_hunting/LightboxSolverView.vue')
    },
  ]
})

export default router
