import { RouteRecordRaw } from 'vue-router';
const metaRouters = import.meta.glob('./*.ts', { eager: true });
const routeList: RouteRecordRaw[] = [];
Object.values(metaRouters).forEach((module: any) => {
  routeList.push(...module.default)
});
const homeRouter: Array<RouteRecordRaw> = [
  {
    path: '/cssDemo',
    meta: { title: 'CSS' },
    children: [...routeList]
  },
];

export default homeRouter;
