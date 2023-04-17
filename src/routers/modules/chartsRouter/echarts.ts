import { RouteRecordRaw } from 'vue-router';
//element组件模块
const echartsCompRouter: Array<RouteRecordRaw> = [
  {
    path: '/canvas/echarts',
    redirect: 'charts',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: 'charts',
        component: () => import('@/views/Canvas/echarts/charts/index.vue'),
        meta: {
          title: '图表'
        }
      },
      {
        path: 'comp',
        component: () => import('@/views/Canvas/echarts/comp/index.vue'),
        meta: {
          title: '组件'
        }
      }
    ]
  }
];

export default echartsCompRouter;
