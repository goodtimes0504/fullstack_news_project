import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";
const pinia = createPinia();
pinia.use(piniaPluginPersist); // 这里原来是 piniaPlugi，没写完整
export default pinia;
