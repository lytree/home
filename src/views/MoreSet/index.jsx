import { defineComponent } from 'vue';
import styles from './index.module.scss';

export default defineComponent({
  setup() {
    return () => (
      <div class={styles.moreSet}>
        <h1>More Set Component</h1>
      </div>
    );
  }
});