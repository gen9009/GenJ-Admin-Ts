import { createApp } from 'vue';
import App from '@/App.vue';
import '@/styles/reset.css';
import router from '@/routers/index';
import { createPinia } from 'pinia';
const pinia = createPinia();
// icon
import '@/assets/iconfont/iconfont.css';

createApp(App).use(router).use(pinia).mount('#app');
