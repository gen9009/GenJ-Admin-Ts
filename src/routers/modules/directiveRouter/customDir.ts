import { RouteRecordRaw } from 'vue-router';
const customDirRouter: Array<RouteRecordRaw> = [
  {
    path: '/diretive/customDir',
    redirect: 'watermark',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '自定义指令'
    },
    children: [
      {
        path: 'watermark',
        component: () => import('@/views/Directive/watermark.vue'),
        meta: {
          title: '水印指令'
        }
      }
    ]
  }
];

export default customDirRouter;
