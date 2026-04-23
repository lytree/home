import { defineComponent } from 'vue';
import styles from './Right.module.scss';

export default defineComponent({
  setup() {
    return () => (
      <div class={styles.right}>
        <h1>Main Right</h1>
      </div>
    );
  }
});