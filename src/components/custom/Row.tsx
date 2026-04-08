import { defineComponent, computed, useSlots } from 'vue';
import styles from './Row.module.scss';

export default defineComponent({
  props: {
    gutter: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const slots = useSlots();
    
    const rowStyle = computed(() => {
      return {
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: `-${props.gutter / 2}px`,
        marginRight: `-${props.gutter / 2}px`
      };
    });
    
    return () => (
      <div class={styles.customRow} style={rowStyle.value}>
        {slots.default && slots.default()}
      </div>
    );
  }
});