import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/board',
    name: 'board',    
    component: () => import('../views/vBoard.vue')
  },
  {
    path: '/board/:idx',
    name: 'boardDetail',    
    component: () => import('../views/components/vPostDetail.vue'), props:true
  },  
  {
    path: '/menu1',
    name: 'menu1',    
    component: () => import('../views/vMenu1.vue')
  },
  {
    path: '/menu2',
    name: 'menu2',    
    component: () => import('../views/vMenu2.vue')
  },
  {
    path: '/labs',
    name: 'labs',    
    component: () => import('../views/vLabs.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
