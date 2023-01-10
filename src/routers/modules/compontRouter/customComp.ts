import { RouteRecordRaw } from 'vue-router';
//element组件模块
const customCompRouter: Array<RouteRecordRaw> = [
  {
    path: '/component/customComp',
    redirect: 'list',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: 'list',
        component: () => import('@/views/Component/customComp/list/index.vue'),
        meta: {
          title: '列表'
        }
      },
      {
        path: 'turnTable',
        component: () => import('@/views/Component/customComp/turnTable/index.vue'),
        meta: {
          title: '转盘'
        }
      },
    ]
  },
];

export default customCompRouter;
