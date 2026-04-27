import { defineComponent } from 'vue';
import { cn } from '@/utils/cn';
import styles from './Switch.module.scss';

export default defineComponent({
  props: {
    modelValue: {
      type: [Boolean, String, Number],
      default: false
    },
    activeValue: {
      type: [Boolean, String, Number],
      default: true
    },
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false
    },
    inlinePrompt: {
      type: Boolean,
      default: false
    },
    activeIcon: {
      type: Object,
      default: null
    },
    inactiveIcon: {
      type: Object,
      default: null
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const handleClick = () => {
      const newValue = props.modelValue === props.activeValue ? props.inactiveValue : props.activeValue;
      emit('update:modelValue', newValue);
      emit('change', newValue);
    };
    
    return () => (
      <div class={cn(styles.customSwitch, props.modelValue && styles.switchActive)} onClick={handleClick}>
        <div class={styles.switchCore}>
          <div class={cn(styles.switchButton, props.modelValue && styles.buttonActive)}></div>
          {props.inlinePrompt && (
            <div class={styles.switchIcons}>
              {props.activeIcon && (
                <component is={props.activeIcon} class={cn(styles.switchIcon, styles.active)} />
              )}
              {props.inactiveIcon && (
                <component is={props.inactiveIcon} class={cn(styles.switchIcon, styles.inactive)} />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
});