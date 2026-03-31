import { defineComponent, provide, useSlots } from 'vue';
import styles from './Collapse.module.scss';

export default defineComponent({
  props: {
    modelValue: {
      type: [String, Number, Array],
      default: ''
    },
    accordion: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const slots = useSlots();
    
    const updateModelValue = (value) => {
      emit('update:modelValue', value);
    };
    
    provide('collapseContext', {
      modelValue: props.modelValue,
      accordion: props.accordion,
      updateModelValue
    });
    
    return () => (
      <div class={styles.customCollapse}>
        {slots.default && slots.default()}
      </div>
    );
  }
});