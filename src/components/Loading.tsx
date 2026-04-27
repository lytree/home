import { defineComponent } from 'vue';
import { useMainStore } from '@/store/index.ts';
import { cn } from '@/utils/cn';
import styles from './Loading.module.scss';

export default defineComponent({
  setup() {
    const store = useMainStore();
    const siteName = import.meta.env.VITE_SITE_NAME;

    return () => (
      <div class={cn(styles.loaderWrapper, 'fixed top-0 left-0 w-full h-full z-[999] overflow-hidden', store.imgLoadStatus && styles.loaded)}>
        <div class={cn(styles.loader, 'absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center')}>
          <div class={styles.loaderCircle} />
          <div class={styles.loaderText}>
            <span class={styles.name}>{siteName}</span>
            <span class={styles.tip}> 加载中 </span>
          </div>
        </div>
        <div class={cn(styles.loaderSection, styles.sectionLeft)} />
        <div class={cn(styles.loaderSection, styles.sectionRight)} />
      </div>
    );
  }
});