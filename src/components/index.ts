//全局注册组件
import { App } from 'vue';
import testComp from './testComp';
import qiEcharts from './QiEcharts/index.vue';
import QiSliderVue2 from './QiSliderVue2/index.vue';
import QiTsTable from './QiTsTable/index.vue';
import QiTsForm from './QiTsForm/index.vue';
const compList = {
  testComp,
  qiEcharts,
  QiSliderVue2,
  QiTsTable,
  QiTsForm
};

export const componments = {
  install: (app: App<Element>) => {
    Object.keys(compList).forEach(comp => {
      app.component(comp, compList[comp as keyof typeof compList]);
    });
  }
};
