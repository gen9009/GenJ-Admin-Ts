import { RouteRecordRaw } from 'vue-router';
const metaRouters = import.meta.glob('./*.ts', { eager: true });
const routeList: RouteRecordRaw[] = [];
Object.values(metaRouters).forEach((module: any) => {
  routeList.push(...module.default);
});
const compontRouter: Array<RouteRecordRaw> = [
  {
    path: '/canvas',
    // redirect: {name:'element'},
    meta: { title: '可视化' },
    children: [...routeList]
  }
];

export default compontRouter;
