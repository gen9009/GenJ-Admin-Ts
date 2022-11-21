//全局注册组件
import { App } from 'vue';
import testComp from './testComp';
import qiEcharts from './QiEcharts/index.vue';

const compList = {
  testComp,
  qiEcharts
};

export const componments = {
  install: (app: App<Element>) => {
    Object.keys(compList).forEach(comp => {
      app.component(comp, compList[comp as keyof typeof compList]);
    });
  }
};
