import { App } from 'vue';
import qiLoading from './modules/qiLoading';
import waterMarker from './modules/waterMarker';
import dragResize from './modules/dragResize';
import ellipsis from './modules/ellipsis';
const directivesList: any = {
  waterMarker,
  qiLoading,
  dragResize,
  ellipsis
};

export const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach(key => {
      //注册所有指令
      app.directive(key, directivesList[key]);
    });
  }
};
