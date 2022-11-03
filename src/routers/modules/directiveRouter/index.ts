import { RouteRecordRaw } from 'vue-router';
const metaRouters = import.meta.glob('./*.ts', { eager: true });
const routeList: RouteRecordRaw[] = [];
Object.values(metaRouters).forEach((module: any) => {
  routeList.push(...module.default)
});

const directiveRouter: Array<RouteRecordRaw> = [
  {
    path: '/directive',
    meta: { title: '指令' },
    children: [...routeList]
  }
];

export default directiveRouter;
