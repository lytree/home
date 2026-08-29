import { defineVaporComponent, type PropType } from 'vue';
import { Icon as IconifyIcon, type IconifyIcon as IconifyIconData } from '@iconify/vue';
import type { MouseEvent as VaporMouseEvent } from 'vue-jsx-vapor';

// @iconify/vue 的 Icon 是 vdom 组件,@vue/runtime-vapor 通过 vaporInteropPlugin
// 兼容渲染,但其 TS 类型在 Vapor JSX 上下文里推不出 class/icon/width/height
// 等运行时实际可用的 props。这里做一个 Vapor wrapper 重新声明 props 类型,
// 内部直接以 JSX 返回,让 vue-jsx-vapor 编译出 Vapor block。
// 这里必须保留为 any，否则在 TSX 上下文中，`Record<string, unknown>`
// 不会被当成可调用/可构造的 JSX 元素类型，导致“没有构造签名或调用签名”。
const IconifyIconAny = IconifyIcon as any;

export const Icon = defineVaporComponent({
  props: {
    icon: { type: [String, Object] as PropType<string | IconifyIconData>, required: true },
    width: { type: [Number, String] as PropType<number | string>, default: undefined },
    height: { type: [Number, String] as PropType<number | string>, default: undefined },
    class: { type: String, default: '' },
  },
  emits: ['click'],
  setup(props, { emit }) {
    return (
      <IconifyIconAny
        icon={props.icon}
        width={props.width}
        height={props.height}
        class={props.class}
        onClick={(e: VaporMouseEvent) => emit('click', e)}
      />
    );
  },
});
