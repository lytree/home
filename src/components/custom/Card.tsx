import { defineComponent, useSlots } from 'vue';
import { cn } from '@/utils/cn';
import styles from './Card.module.scss';

export default defineComponent({
  props: {
    shadow: {
      type: String,
      default: 'default'
    }
  },
  setup() {
    const slots = useSlots();

    return () => (
      <div class={cn(
        'bg-white/10 rounded-lg overflow-hidden backdrop-blur-[10px] border border-white/20')}>
        {slots.header && (
          <div class={cn(
            'p-4 border-b border-white/10')}>
            {slots.header()}
          </div>
        )}
        <div class={cn(
          'p-5')}>
          {slots.default && slots.default()}
        </div>
      </div>
    );
  }
});