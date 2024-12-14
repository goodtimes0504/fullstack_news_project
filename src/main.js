import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import store from './store'
import pinia from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//粒子效果
import Particles from "@tsparticles/vue3";
// import { loadSlim } from "tsparticles-slim";
import { loadFull } from "tsparticles";
import '@/utils/axios.config.js'

createApp(App)
  .use(pinia)
  .use(router)
  .use(ElementPlus)
  .use(Particles, {
    init: async (engine) => {
      await loadFull(engine);
    },
  })
  .mount("#app");
