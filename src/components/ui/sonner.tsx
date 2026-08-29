import 'vue-sonner/style.css';
import { defineVaporComponent } from 'vue';
import { Toaster as SonnerToaster } from 'vue-sonner';

// vue-sonner 不自动注入它的 CSS,需要在这里手动导入,否则
// toaster 容器 (data-sonner-toaster) 缺少 position: fixed / left: 50% /
// transform: translateX(-50%) 等规则,导致 toast 无法居中。
export const Toaster = defineVaporComponent({
  props: {
    position: { type: String, default: 'top-center' },
    toastOptions: { type: Object, default: () => ({}) },
  },
  setup(props) {
    return (
      <SonnerToaster
        position={props.position as 'top-center'}
        toastOptions={{
          style: {
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '25px',
            padding: '12px 20px',
            marginBottom: '10px',
            maxWidth: '300px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            textAlign: 'center',
          },
          duration: 3000,
          ...((props.toastOptions as Record<string, unknown>) ?? {}),
        }}
      />
    );
  },
});
