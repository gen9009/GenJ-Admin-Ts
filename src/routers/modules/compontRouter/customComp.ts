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
        path: 'scrollText',
        component: () => import('@/views/Component/customComp/scrollText/index.vue'),
        meta: {
          title: '文字滚动'
        }
      },
      {
        path: 'slider',
        component: () => import('@/views/Component/customComp/slider/index.vue'),
        meta: {
          title: '滑块'
        }
      },
      {
        path: 'scrollNumber',
        component: () => import('@/views/Component/customComp/scrollNumber/index.vue'),
        meta: {
          title: '数字滚动'
        }
      },
      {
        path: 'spliceNumber',
        component: () => import('@/views/Component/customComp/spliceNumber/index.vue'),
        meta: {
          title: '千分位'
        }
      },
      {
        path: 'richEditor',
        component: () => import('@/views/Component/customComp/richEditor/index.vue'),
        meta: {
          title: '富文本'
        }
      },
      {
        path: 'treeEditor',
        component: () => import('@/views/Component/customComp/treeEditor/index.vue'),
        meta: {
          title: '树的编辑'
        }
      },
      {
        path: 'magnifier',
        component: () => import('@/views/Component/customComp/magnifier/index.vue'),
        meta: {
          title: '放大镜'
        }
      },
      {
        path: 'qrcode',
        component: () => import('@/views/Component/customComp/qrcode/index.vue'),
        meta: {
          title: '二维码'
        }
      },
      {
        path: 'verify',
        component: () => import('@/views/Component/customComp/verify/index.vue'),
        meta: {
          title: '验证码'
        }
      },
      {
        path: 'fileview',
        component: () => import('@/views/Component/customComp/fileview/index.vue'),
        meta: {
          title: '验证码'
        }
      }
    ]
  }
];

export default customCompRouter;
