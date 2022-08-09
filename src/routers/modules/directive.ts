import { RouteRecordRaw } from 'vue-router';
export const directiveRouter: Array<RouteRecordRaw> = [
  {
    path: '/diretive',
    component: () => import('@/layout/index.vue'),
    redirect: '/diretive/watermark',
    meta: {
      title: '自定义指令'
    },
    children: [
      {
        path: '/diretive/watermark',
        component: () => import('@/views/directive/watermark.vue'),
        meta: {
          title: '水印指令'
        }
      }
    ]
  }
];
