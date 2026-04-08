import { defineComponent, provide, useSlots } from 'vue';
import styles from './RadioGroup.module.scss';

export default defineComponent({
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: ''
    },
    size: {
      type: String,
      default: 'default'
    },
    textColor: {
      type: String,
      default: '#fff'
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const slots = useSlots();
    
    const updateModelValue = (value) => {
      emit('update:modelValue', value);
      emit('change', value);
    };
    
    provide('radioGroupContext', {
      modelValue: props.modelValue,
      size: props.size,
      textColor: props.textColor,
      updateModelValue
    });
    
    return () => (
      <div class={styles.customRadioGroup}>
        {slots.default && slots.default()}
      </div>
    );
  }
});