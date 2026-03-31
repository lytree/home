import { defineComponent } from 'vue';
import styles from './Left.module.scss';

export default defineComponent({
  setup() {
    return () => (
      <div class={styles.left}>
        <h1>Main Left</h1>
      </div>
    );
  }
});