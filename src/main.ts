import { createApp, vaporInteropPlugin } from "vue";
import "@/style/style.scss";
import App from "@/App.tsx";
// 引入 pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// swiper
import "swiper/css";
// 引入自定义消息组件
import ElMessage from "@/components/custom/message";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(vaporInteropPlugin);
app.config.globalProperties.$message = ElMessage;
app.mount("#app");
