import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import store from './store'
import pinia from "./store";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use(pinia).use(router).use(ElementPlus).mount("#app");
