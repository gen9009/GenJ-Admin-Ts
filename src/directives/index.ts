import { App } from 'vue';
import waterMarker from './modules/waterMarker';

const directivesList: any = {
  waterMarker
};

export const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach(key => {
      //注册所有指令
      app.directive(key, directivesList[key]);
    });
  }
};
