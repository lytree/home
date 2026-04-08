import { defineComponent, ref, useSlots } from 'vue';
import styles from './Tooltip.module.scss';

export default defineComponent({
  props: {
    content: {
      type: String,
      required: true
    },
    placement: {
      type: String,
      default: 'top'
    },
    showArrow: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const slots = useSlots();
    const visible = ref(false);
    
    const showTooltip = () => {
      visible.value = true;
    };
    
    const hideTooltip = () => {
      visible.value = false;
    };
    
    return () => (
      <div class={styles.customTooltipContainer} onMouseenter={showTooltip} onMouseleave={hideTooltip}>
        <div class={styles.tooltipTrigger}>
          {slots.default && slots.default()}
        </div>
        <div class={[
          styles.customTooltip, 
          `${styles[`tooltip-${props.placement}`]}`,
          visible.value ? styles.tooltipShow : ''
        ].filter(Boolean).join(' ')}>
          {props.showArrow && <div class={styles.tooltipArrow}></div>}
          <div class={styles.tooltipContent}>
            {props.content}
          </div>
        </div>
      </div>
    );
  }
});