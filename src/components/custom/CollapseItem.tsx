import { defineComponent, computed, inject, useSlots } from 'vue';
import styles from './CollapseItem.module.scss';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    name: {
      type: [String, Number],
      default: ''
    }
  },
  setup(props) {
    const slots = useSlots();
    const collapseContext = inject('collapseContext');
    
    const isActive = computed(() => {
      const modelValue = collapseContext.modelValue;
      if (Array.isArray(modelValue)) {
        return modelValue.includes(props.name);
      }
      return modelValue === props.name;
    });
    
    const handleClick = () => {
      const { modelValue, accordion, updateModelValue } = collapseContext;
      
      if (accordion) {
        updateModelValue(isActive.value ? '' : props.name);
      } else {
        if (Array.isArray(modelValue)) {
          const newValue = isActive.value
            ? modelValue.filter(item => item !== props.name)
            : [...modelValue, props.name];
          updateModelValue(newValue);
        } else {
          updateModelValue(isActive.value ? '' : props.name);
        }
      }
    };
    
    return () => (
      <div class={styles.customCollapseItem}>
        <div class={styles.collapseItemHeader} onClick={handleClick}>
          <span>{props.title}</span>
          <div class={[styles.collapseItemArrow, isActive.value ? styles.arrowRotate : ''].filter(Boolean).join(' ')}>
            ▼
          </div>
        </div>
        <transition name="collapse">
          {isActive.value && (
            <div class={styles.collapseItemContent}>
              {slots.default && slots.default()}
            </div>
          )}
        </transition>
      </div>
    );
  }
});