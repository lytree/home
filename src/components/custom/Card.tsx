import { defineComponent, useSlots } from 'vue';
import styles from './Card.module.scss';

export default defineComponent({
  props: {
    shadow: {
      type: String,
      default: 'default'
    }
  },
  setup() {
    const slots = useSlots();
    
    return () => (
      <div class={styles.customCard}>
        {slots.header && (
          <div class={styles.cardHeader}>
            {slots.header()}
          </div>
        )}
        <div class={styles.cardBody}>
          {slots.default && slots.default()}
        </div>
      </div>
    );
  }
});