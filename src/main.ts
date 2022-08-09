import { createApp } from 'vue';
import App from '@/App.vue';
import '@/styles/reset.css';
import '@/styles/element.scss';

// icon
import '@/assets/iconfont/iconfont.css';
import { directives } from '@/directives/index';
import router from '@/routers/index';
import pinia from '@/utils/piniaState';

createApp(App).use(router).use(pinia).use(directives).mount('#app');
