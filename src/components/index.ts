//全局注册组件
import { App } from 'vue';
import testComp from './testComp.tsx';
import qiEcharts from './QiEcharts/index.vue';
import QiSliderVue2 from './QiSliderVue2/index.vue';

const compList = {
  testComp,
  qiEcharts,
  QiSliderVue2
};

export const componments = {
  install: (app: App<Element>) => {
    Object.keys(compList).forEach(comp => {
      app.component(comp, compList[comp as keyof typeof compList]);
    });
  }
};
