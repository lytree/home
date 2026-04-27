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
          <div class={cn(styles.loaderCircle, 'w-[150px] h-[150px] rounded-full border-3 border-transparent border-t-white')} />
          <div class={cn(styles.loaderText, 'flex flex-col items-center text-white z-[2] mt-10 text-2xl')}>
            <span class={styles.name}>{siteName}</span>
            <span class={cn(styles.tip, 'mt-1.5 text-lg opacity-60')}> 加载中 </span>
          </div>
        </div>
        <div class={cn(styles.loaderSection, styles.sectionLeft, 'fixed top-0 w-[51%] h-full bg-[#333] z-[1]')} />
        <div class={cn(styles.loaderSection, styles.sectionRight, 'fixed top-0 w-[51%] h-full bg-[#333] z-[1]')} />
      </div>
    );
  }
});