import { RouteRecordRaw } from 'vue-router';

const homeRouter: Array<RouteRecordRaw> = [
  {
    path: '/cssDemo',
    redirect: 'scroll',
    component: () => import('@/layout/index.vue'),
    meta: { title: 'CSS' },
    children: [
      {
        path: 'scroll',
        component: () => import('@/views/cssDemo/scroll.vue')
      }
    ]
  }
];

export default homeRouter;
