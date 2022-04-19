import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Index from '../views/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/search/:id',
    name: 'Search',
    component: () => import(/* webpackChunkName:"City" */ '../views/Search/index.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import(/* webpackChunkName:"Main" */ '../views/Main/index.vue'),
    children: [
      {
        path: '/main/msite',
        name: 'MainMsite',
        component: () => import(/* webpackChunkName:"Main" */ '../views/Main/Msite/index.vue')
      },
      {
        path: '/main/search',
        name: 'MainSearch',
        component: () => import(/* webpackChunkName:"Main" */ '../views/Main/Search/index.vue')
      },
      {
        path: '/main/list',
        name: 'MainList',
        component: () => import(/* webpackChunkName:"Main" */ '../views/Main/List/index.vue')
      },
      {
        path: '/main/mine',
        name: 'MainMine',
        component: () => import(/* webpackChunkName:"Main" */ '../views/Main/Mine/index.vue')
      }
    ]
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName:"Food" */ '../views/Shop/index.vue'),
    children: [
      {
        path: 'shopDetail',
        name: 'ShopDetail',
        component: () => import(/* webpackChunkName:"Food" */ '../views/Shop/shopDetail.vue')
      }
    ]
  },
  {
    path: '/storelist',
    name: 'StoreList',
    component: () => import(/* webpackChunkName: "Food" */ '../views/StoreList/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
