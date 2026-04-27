import { defineComponent, computed } from 'vue';
import { useMainStore } from '@/store/index.ts';
import Func from '@/views/Func/index.tsx';
import Link from '@/components/Links.tsx';
import styles from './Right.module.scss';

export default defineComponent({
  setup() {
    const store = useMainStore();
    
    // 站点链接
    const siteUrl = computed(() => {
      const url = import.meta.env.VITE_SITE_URL;
      if (!url) return 'imsyy.top'.split('.');
      // 判断协议前缀
      if (url.startsWith('http://') || url.startsWith('https://')) {
        const urlFormat = url.replace(/^(https?:\/\/)/, '');
        return urlFormat.split('.');
      }
      return url.split('.');
    });
    
    return () => (
      <div class={[styles.right, store.mobileOpenState ? '' : styles.hidden].filter(Boolean).join(' ')}>
        {/* 移动端 Logo */}
        <div class={[styles.logo, 'text-hidden fixed top-[6%] left-0 w-full text-center'].join(' ')} onClick={() => (store.mobileFuncState = !store.mobileFuncState)}>
          <span class={styles.bg}>{siteUrl.value[0]}</span>
          <span class={styles.sm}>.{siteUrl.value[1]}</span>
        </div>
        {/* 功能区 */}
        <Func />
        {/* 网站链接 */}
        <Link />
      </div>
    );
  }
});