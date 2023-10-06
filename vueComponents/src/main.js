import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import JsliuUi from './libs/jsliu-ui';


createApp(App).use(store).use(router).use(JsliuUi).mount('#app')
