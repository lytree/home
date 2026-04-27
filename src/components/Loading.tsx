import { defineComponent } from 'vue';
import { useMainStore } from '@/store/index.ts';
import styles from './Loading.module.scss';

export default defineComponent({
  setup() {
    const store = useMainStore();
    const siteName = import.meta.env.VITE_SITE_NAME;

    return () => (
      <div class={[styles.loaderWrapper, 'fixed top-0 left-0 w-full h-full z-[999] overflow-hidden', store.imgLoadStatus ? styles.loaded : ''].filter(Boolean).join(' ')}>
        <div class={[styles.loader, 'absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center'].join(' ')}>
          <div class={styles.loaderCircle} />
          <div class={styles.loaderText}>
            <span class={styles.name}>{siteName}</span>
            <span class={styles.tip}> 加载中 </span>
          </div>
        </div>
        <div class={[styles.loaderSection, styles.sectionLeft].join(' ')} />
        <div class={[styles.loaderSection, styles.sectionRight].join(' ')} />
      </div>
    );
  }
});