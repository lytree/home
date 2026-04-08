import { defineComponent } from 'vue';
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
      <div class={[styles.customSwitch, props.modelValue ? styles.switchActive : ''].filter(Boolean).join(' ')} onClick={handleClick}>
        <div class={styles.switchCore}>
          <div class={[styles.switchButton, props.modelValue ? styles.buttonActive : ''].filter(Boolean).join(' ')}></div>
          {props.inlinePrompt && (
            <div class={styles.switchIcons}>
              {props.activeIcon && (
                <component is={props.activeIcon} class={[styles.switchIcon, styles.active].join(' ')} />
              )}
              {props.inactiveIcon && (
                <component is={props.inactiveIcon} class={[styles.switchIcon, styles.inactive].join(' ')} />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
});