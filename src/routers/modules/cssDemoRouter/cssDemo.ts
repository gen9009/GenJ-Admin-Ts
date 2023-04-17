import { RouteRecordRaw } from 'vue-router';

const homeRouter: Array<RouteRecordRaw> = [
  {
    path: '/funDemo',
    redirect: 'scroll',
    component: () => import('@/layout/index.vue'),
    meta: { title: 'CSS' },
    children: [
      {
        path: 'scroll',
        component: () => import('@/views/FunDemo/scroll.vue'),
        meta: { title: '页面滚动' }
      }
    ]
  }
];

export default homeRouter;
