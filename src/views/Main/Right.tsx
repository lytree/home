import { defineVaporComponent, computed } from 'vue';
import { useMainStore } from '@/store';
import { cn } from '@/utils/cn';
import styles from './Right.module.scss';

import Func from '@/views/Func';
import Link from '@/components/Links';

export default defineVaporComponent({
  setup() {
    const store = useMainStore();

    const siteUrl = import.meta.env.VITE_SITE_URL;
    const urlParts = computed<string[]>(() => {
      if (siteUrl.startsWith('http://') || siteUrl.startsWith('https://')) {
        return siteUrl.replace(/^(https?:\/\/)/, '').split('.');
      }
      return siteUrl.split('.');
    });

    const toggleMobileFunc = () => {
      store.setMobileFuncState(!store.mobileFuncState);
    };

    return (
      <div class={cn(styles.right, !store.mobileOpenState && styles.hidden)}>
        <div
          class={cn(
            styles.logo,
            'text-hidden fixed top-[6%] left-0 w-full text-center',
          )}
          onClick={toggleMobileFunc}
        >
          <span class={styles.bg}>{urlParts.value[0]}</span>
          <span class={styles.sm}> .{urlParts.value[1]}</span>
        </div>
        <Func />
        <Link />
      </div>
    );
  },
});
