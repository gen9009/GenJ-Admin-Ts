import { RouteRecordRaw } from 'vue-router';

const homeRouter: Array<RouteRecordRaw> = [
  {
    path: '/home',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    meta: { title: '首页' },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue')
      }
    ]
  }
];

export default homeRouter;
