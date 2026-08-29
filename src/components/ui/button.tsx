import { defineVaporComponent } from 'vue';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3',
        lg: 'h-10 px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

type ButtonProps = VariantProps<typeof buttonVariants> & {
  class?: string;
};

export const Button = defineVaporComponent({
  emits: ['click'],
  props: {
    variant: { type: String, default: 'default' },
    size: { type: String, default: 'default' },
    class: { type: String, default: '' },
  },
  setup(props, { slots, emit }) {
    return (
      <button
        class={cn(buttonVariants(props as ButtonProps), (props as ButtonProps).class as string)}
        onClick={(e: MouseEvent) => emit('click', e)}
      >
        {slots.default?.()}
      </button>
    );
  },
});

export { buttonVariants };
