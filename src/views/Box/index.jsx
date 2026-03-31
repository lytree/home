import { defineComponent } from 'vue';
import styles from './index.module.scss';

export default defineComponent({
  setup() {
    return () => (
      <div class={styles.box}>
        <h1>Box Component</h1>
      </div>
    );
  }
});