import { defineComponent, computed } from 'vue';
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
      <div class={styles.customProgress}>
        <div class={styles.progressBar} style={barStyle.value}>
          <div class={styles.progressFill} style={fillStyle.value}></div>
          {props.textInside && (
            <div class={styles.progressText}>
              {props.percentage}%
            </div>
          )}
        </div>
        {!props.textInside && (
          <div class={styles.progressText}>
            {props.percentage}%
          </div>
        )}
      </div>
    );
  }
});