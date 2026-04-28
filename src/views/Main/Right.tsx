import { useMainStore } from '@/store';
import { cn } from '@/utils/cn';
import styles from './Right.module.scss';

export default function MainRight() {
  const mobileOpenState = useMainStore((state) => state.mobileOpenState);
  const mobileFuncState = useMainStore((state) => state.mobileFuncState);

  const siteUrl = import.meta.env.VITE_SITE_URL;
  const getSiteUrl = () => {
    if (siteUrl.startsWith('http://') || siteUrl.startsWith('https://')) {
      return siteUrl.replace(/^(https?:\/\/)/, '').split('.');
    }
    return siteUrl.split('.');
  };
  const urlParts = getSiteUrl();

  return (
    <div className={cn(styles.right, !mobileOpenState && styles.hidden)}>
      <div className={cn(styles.logo, 'text-hidden fixed top-[6%] left-0 w-full text-center')} onClick={() => useMainStore.getState().setMobileFuncState(!mobileFuncState)}>
        <span className={styles.bg}>{urlParts[0]}</span>
        <span className={styles.sm}>.{urlParts[1]}</span>
      </div>
      <Func />
      <Link />
    </div>
  );
}

import Func from '@/views/Func';
import Link from '@/components/Links';