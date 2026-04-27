import { defineComponent, computed } from 'vue';
import { cn } from '@/utils/cn';
import styles from './Progress.module.scss';

export default defineComponent({
  props: {
    percentage: {
      type: Number,
      default: 0,
      validator: (value) => {
        return value >= 0 && value <= 100;
      }
    },
    textInside: {
      type: Boolean,
      default: false
    },
    strokeWidth: {
      type: Number,
      default: 10
    }
  },
  setup(props) {
    const barStyle = computed(() => {
      return {
        height: `${props.strokeWidth}px`
      };
    });
    
    const fillStyle = computed(() => {
      return {
        width: `${props.percentage}%`
      };
    });
    
    return () => (
      <div class={cn(styles.customProgress, 'w-full flex items-center')}>
        <div class={cn(styles.progressBar, 'flex-1 bg-white/20 rounded-lg overflow-hidden relative')} style={barStyle.value}>
          <div class={cn(styles.progressFill, 'h-full bg-white/80 rounded-lg transition-all duration-300')} style={fillStyle.value}></div>
          {props.textInside && (
            <div class={cn(styles.progressText, 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-black')}>
              {props.percentage}%
            </div>
          )}
        </div>
        {!props.textInside && (
          <div class={cn(styles.progressText, 'ml-2.5 text-sm font-bold text-white')}>
            {props.percentage}%
          </div>
        )}
      </div>
    );
  }
});