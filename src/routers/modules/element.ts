import { RouteRecordRaw } from 'vue-router';

//element组件模块
const elementRouter: Array<RouteRecordRaw> = [
  {
    path: '/element',
    component: () => import('@/layout/index.vue'),
    redirect: '/element/form',
    meta: { title: '饿了么组件' },
    children: [
      {
        path: '/element/form',
        component: () => import('@/views/element/form/index.vue'),
        meta: {
          title: 'Form表单'
        }
      },
      {
        path: '/element/table',
        component: () => import('@/views/element/table/index.vue'),
        meta: {
          title: 'Table表格'
        }
      }
    ]
  }
];

export default elementRouter;
