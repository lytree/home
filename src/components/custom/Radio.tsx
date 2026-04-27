import { defineComponent, computed, inject, useSlots } from 'vue';
import { cn } from '@/utils/cn';
import styles from './Radio.module.scss';

export default defineComponent({
  props: {
    value: {
      type: [String, Number, Boolean],
      default: ''
    },
    label: {
      type: [String, Number, Boolean],
      default: ''
    },
    border: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'default'
    }
  },
  setup(props) {
    const slots = useSlots();
    const radioGroupContext = inject('radioGroupContext', null);
    
    const isChecked = computed(() => {
      if (radioGroupContext) {
        return radioGroupContext.modelValue === props.value;
      }
      return false;
    });
    
    const size = computed(() => {
      if (radioGroupContext) {
        return radioGroupContext.size;
      }
      return props.size;
    });
    
    const name = computed(() => {
      return `radio-${Date.now()}`;
    });
    
    const handleChange = () => {
      if (radioGroupContext) {
        radioGroupContext.updateModelValue(props.value);
      }
    };
    
    return () => (
      <label class={cn(
        styles.customRadio, 
        styles[`radio-${size.value}`],
        isChecked.value && styles.radioChecked,
        props.border && styles.radioBordered
      )}>
        <input
          type="radio"
          name={name.value}
          value={props.value}
          checked={isChecked.value}
          onChange={handleChange}
          class={styles.radioInput}
        />
        <span class={styles.radioInner}></span>
        {slots.default && (
          <span class={styles.radioLabel}>
            {slots.default()}
          </span>
        )}
      </label>
    );
  }
});