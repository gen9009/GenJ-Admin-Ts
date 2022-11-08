import { RouteRecordRaw } from 'vue-router';
//element组件模块
const elementRouter: Array<RouteRecordRaw> = [
  {
    path: '/component/element',
    redirect: 'form',
    // name:'element',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: 'form',
        component: () => import('@/views/Component/element/form/index.vue'),
        meta: {
          title: 'Form表单'
        }
      },
      {
        path: 'table',
        component: () => import('@/views/Component/element/table/index.vue'),
        meta: {
          title: 'Table表格'
        }
      },
      {
        path: 'tree',
        component: () => import('@/views/Component/element/tree/index.vue'),
        meta: {
          title: 'Tree树'
        }
      },
    ]
  },
];

export default elementRouter;
