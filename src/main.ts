import { createApp } from 'vue';
import App from '@/App.vue';
// 全局样式
import '@/styles/reset.css';
import '@/styles/element.scss';
import '@/styles/flex.scss';
// icon
import '@/assets/iconfont/iconfont.css';

import { directives } from '@/directives/index.ts';
import { componments } from '@/components/index.ts';

//Vue3 挂在全局变量
// app.config.globalProperties

import router from '@/routers/index.ts';
import pinia from '@/utils/piniaState.ts';

createApp(App).use(router).use(pinia).use(directives).use(componments).mount('#app');
