import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

//声明路基础路由配置  login 404
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'login' }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue')
  },
  {
    // 找不到路由重定向到404页面
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue')
  },
  {
    // 找不到路由重定向到404页面
    path: '/:pathMatch(.*)',
    redirect: { name: '404' }
  }
];

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
});
export default router;
