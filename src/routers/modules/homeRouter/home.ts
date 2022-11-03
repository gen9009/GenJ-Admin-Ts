import { RouteRecordRaw } from 'vue-router';

const homeRouter: Array<RouteRecordRaw> = [
  {
    path: '/home',
    redirect: '',
    component: () => import('@/layout/index.vue'),
    meta: { title: '首页' },
    children: [
      {
        path: '',
        component: () => import('@/views/home/index.vue')
      }
    ]
  }
];

export default homeRouter;
