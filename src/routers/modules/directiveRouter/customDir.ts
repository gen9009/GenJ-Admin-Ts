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
      },
      {
        path: 'dragResize',
        component: () => import('@/views/Directive/dragresize.vue'),
        meta: {
          title: '拉伸指令'
        }
      },
      {
        path: 'ellipsis',
        component: () => import('@/views/Directive/ellipsis.vue'),
        meta: {
          title: '省略指令'
        }
      }
    ]
  }
];

export default customDirRouter;
