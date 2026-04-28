import { useMainStore } from '@/store';
import { cn } from '@/utils/cn';
import styles from './Loading.module.scss';

export default function Loading() {
  const imgLoadStatus = useMainStore((state) => state.imgLoadStatus);
  const siteName = import.meta.env.VITE_SITE_NAME;

  return (
    <div className={cn(styles.loaderWrapper, 'fixed top-0 left-0 w-full h-full z-999 overflow-hidden', imgLoadStatus && styles.loaded)}>
      <div className={cn(styles.loader, 'absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center')}>
        <div className={cn(styles.loaderCircle, 'w-37.5 h-37.5 rounded-full border-3 border-transparent border-t-white')} />
        <div className={cn(styles.loaderText, 'flex flex-col items-center text-white z-2 mt-10 text-2xl')}>
          <span className={styles.name}>{siteName}</span>
          <span className={cn(styles.tip, 'mt-1.5 text-lg opacity-60')}> 加载中 </span>
        </div>
      </div>
      <div className={cn(styles.loaderSection, styles.sectionLeft, 'fixed top-0 w-[51%] h-full bg-[#333] z-1')} />
      <div className={cn(styles.loaderSection, styles.sectionRight, 'fixed top-0 w-[51%] h-full bg-[#333] z-1')} />
    </div>
  );
}