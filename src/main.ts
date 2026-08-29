import { createApp, vaporInteropPlugin } from 'vue';
import { createPinia } from 'pinia';
import App from './App';

/**
 * 创建应用实例并安装必要的插件。
 *
 * vaporInteropPlugin 用来打通业务侧的 Vapor 组件与第三方 vdom 组件
 * （@iconify/vue、swiper/vue、vue-sonner 等）之间的渲染边界。
 * 若不安装此插件，在 Vapor 父组件中嵌套 vdom 子组件时，
 * Vue 会在控制台输出 "Vapor component found in vdom tree" 警告。
 */
const app = createApp(App);

app.use(vaporInteropPlugin);
app.use(createPinia());

app.mount('#app');
