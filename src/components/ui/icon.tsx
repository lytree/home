import { defineVaporComponent, type PropType } from 'vue';
import { Icon as IconifyIcon, type IconifyIcon as IconifyIconData } from '@iconify/vue';
import type { MouseEvent as VaporMouseEvent } from 'vue-jsx-vapor';

// @iconify/vue 的 Icon 是 vdom 组件,在 Vapor JSX 上下文里类型推导出错
// (缺少 class/icon/width/height 等运行时实际可用的 props)。
// 运行时通过 vaporInteropPlugin 是兼容的,这里用 Vapor 类型重新声明 props。
const IconVdom = IconifyIcon as unknown as {
  (props: Record<string, unknown>): unknown;
};

export const Icon = defineVaporComponent({
  props: {
    icon: { type: [String, Object] as PropType<string | IconifyIconData>, required: true },
    width: { type: [Number, String] as PropType<number | string>, default: undefined },
    height: { type: [Number, String] as PropType<number | string>, default: undefined },
    class: { type: String, default: '' },
  },
  emits: ['click'],
  setup(props, { emit }) {
    return () =>
      IconVdom({
        icon: props.icon,
        width: props.width,
        height: props.height,
        class: props.class,
        onClick: (e: VaporMouseEvent) => emit('click', e),
      });
  },
});
