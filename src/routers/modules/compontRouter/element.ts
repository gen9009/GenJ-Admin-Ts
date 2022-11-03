import { RouteRecordRaw } from 'vue-router';
//element组件模块
const elementRouter: Array<RouteRecordRaw> = [
  {
    path: '/compont/element',
    redirect: 'form',
    // name:'element',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: 'form',
        component: () => import('@/views/element/form/index.vue'),
        meta: {
          title: 'Form表单'
        }
      },
      {
        path: 'table',
        component: () => import('@/views/element/table/index.vue'),
        meta: {
          title: 'Table表格'
        }
      }
    ]
  },
];

export default elementRouter;
