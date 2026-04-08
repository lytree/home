import { defineComponent } from 'vue';
import styles from './MoreContent.module.scss';

export default defineComponent({
  setup() {
    return () => (
      <div class={styles.moreContent}>您可在此编写任意内容</div>
    );
  }
});