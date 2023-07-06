import { App } from 'vue';
import qiLoading from './modules/qiLoading';
import waterMarker from './modules/waterMarker';
import dragResize from './modules/dragResize';
const directivesList: any = {
  waterMarker,
  qiLoading,
  dragResize
};

export const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach(key => {
      //注册所有指令
      app.directive(key, directivesList[key]);
    });
  }
};
