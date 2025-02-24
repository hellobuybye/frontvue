import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  { // 로그인
    path: '/login',
    name: 'login',    
    component: () => import('../views/vLogin.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  { //게시판 목록
    path: '/board',
    name: 'board',    
    component: () => import('../views/vBoard.vue')
  },
  { // 게시판 게시물 상세
    path: '/board/:idx',
    name: 'postDetail',    
    component: () => import('../views/components/vPostDetail.vue'), props:true
  },  
  { // 게시판 게시물 작성
    path: '/board/write',
    name: 'postWrite',    
    component: () => import('../views/components/vPostInsert.vue')
  },
  { // 게시판 게시물 수정
    path: '/board/modify',
    name: 'boardModify',    
    component: () => import('../views/components/vPostModify.vue')
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
