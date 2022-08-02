import { createApp } from 'vue';
import App from '@/App.vue';
import '@/styles/reset.css';
import router from '@/routers/index';

// icon
import '@/assets/iconfont/iconfont.css';

createApp(App).use(router).mount('#app');
