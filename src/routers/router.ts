import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

/* 
  目前使用静态路由  
    1、每个顶级模块定义为 Layout 重定向为第一个小模块
    2、使用globEager批量导入文件  vite3弃用globEager
    3、获取导入路由内容,解构至路由中
*/
// const metaRouters = import.meta.globEager('./modules/*.ts');
import './modules/compontRouter/index.ts';
const metaRouters = import.meta.glob('./modules/**/index.ts', { eager: true });
const routeList: RouteRecordRaw[] = [];
Object.keys(metaRouters).forEach((module: any) => {
  Object.keys(metaRouters[module] as object[]).forEach((key: any) => {
    routeList.push(...(metaRouters[module] as any)[key]);
  });
});
console.log(routeList, 'activeMenu');
//声明路基础路由配置  login 404
const routes: RouteRecordRaw[] = [
  {
    path: '',
    redirect: { name: 'login' }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    // 找不到路由重定向到404页面
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue')
  },
  ...routeList,
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

// router.beforeEach((to,from,next)=>{
//   console.log(to,from);
// })
export default router;
