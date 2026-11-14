import { defineVaporComponent } from 'vue';
import { useMainStore } from '@/store';
import { cn } from '@/utils/cn';
import styles from './Loading.module.css';

export default defineVaporComponent({
  setup() {
    const store = useMainStore();
    const siteName = import.meta.env.VITE_SITE_NAME;
    const siteAuthor = import.meta.env.VITE_SITE_AUTHOR;
    const startYear = (import.meta.env.VITE_SITE_START ?? '').slice(0, 4);
    const year = new Date().getFullYear();

    return (
      <div class={cn(styles.wrapper, store.imgLoadStatus && styles.loaded)}>
        <div class={styles.content}>
          <div class={styles.row}>
            <span>{startYear ? `SINCE ${startYear}` : 'PERSONAL ARCHIVE'}</span>
            <span>PORTFOLIO / {year}</span>
          </div>

          <div class={styles.center}>
            <span class={styles.name}>{siteName}</span>
            <div class={styles.bar}>
              <span class={styles.fill} />
            </div>
            <span class={styles.tip}>
              正在布置光影
              <span class={styles.dots}>
                <i />
                <i />
                <i />
              </span>
            </span>
          </div>

          <div class={styles.row}>
            <span>{siteAuthor}</span>
            <span>LOADING</span>
          </div>
        </div>

        <div class={cn(styles.panel, styles.panelLeft)} />
        <div class={cn(styles.panel, styles.panelRight)} />
      </div>
    );
  },
});
