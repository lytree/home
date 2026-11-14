import 'vue-sonner/style.css';
import { defineComponent, h } from 'vue';
import { Toaster as SonnerToaster } from 'vue-sonner';
import type { ToasterProps } from 'vue-sonner';

// vue-sonner 不自动注入它的 CSS,需要在这里手动导入,否则
// toaster 容器 (data-sonner-toaster) 缺少 position: fixed / left: 50% /
// transform: translateX(-50%) 等规则,导致 toast 无法居中。
// 使用 h() 而不是 JSX 来实例化 SonnerToaster,以避免 vue-jsx-vapor 的
// 类型检查器无法解析其组件 props 的问题 (TS2322)。
// 这里用 vdom 的 defineComponent(而非 Vapor),setup 返回渲染函数即可,
// 经 vaporInteropPlugin 嵌入 Vapor 树,避免 Vapor 下的 non-block 警告。
export const Toaster = defineComponent({
  props: {
    position: { type: String, default: 'top-center' },
    toastOptions: { type: Object, default: () => ({}) },
  },
  setup(props) {
    return () =>
      h(SonnerToaster, {
        position: props.position as ToasterProps['position'],
        toastOptions: {
          style: {
            background: 'rgba(10, 9, 8, 0.72)',
            border: '1px solid rgba(224, 165, 72, 0.28)',
            borderRadius: '2px',
            padding: '11px 18px',
            marginBottom: '10px',
            maxWidth: '320px',
            color: '#f4eee2',
            fontFamily: 'ui-monospace, Menlo, Consolas, monospace',
            fontSize: '11px',
            letterSpacing: '0.12em',
            backdropFilter: 'blur(14px)',
            boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.6)',
            textAlign: 'center',
          },
          duration: 3000,
          ...((props.toastOptions as Record<string, unknown>) ?? {}),
        },
      });
  },
});
