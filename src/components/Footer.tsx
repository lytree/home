import { useMainStore } from '@/store';
import { cn } from '@/utils/cn';
import styles from './Footer.module.scss';

export default function Footer({ className }: { className?: string }) {
  const fullYear = new Date().getFullYear();
  const startYear = import.meta.env.VITE_SITE_START?.length >= 4
    ? import.meta.env.VITE_SITE_START.substring(0, 4)
    : null;
  const siteIcp = import.meta.env.VITE_SITE_ICP;
  const siteAuthor = import.meta.env.VITE_SITE_AUTHOR;
  const siteUrl = import.meta.env.VITE_SITE_URL;
  
  const getSiteUrl = () => {
    if (!siteUrl.startsWith('http://') && !siteUrl.startsWith('https://')) {
      return '//' + siteUrl;
    }
    return siteUrl;
  };

  return (
    <footer className={cn(styles.footer, 'absolute bottom-0 left-0 w-full h-11.5 text-center z-0 text-sm break-keep whitespace-nowrap', className, styles.blur)}>
      <div className={cn(styles.power, 'animation-fade duration-300')}>
        <span>
          <span className={cn(Number(startYear) < fullYear ? styles.cHidden : styles.hidden, 'hidden lg:block')}>Copyright&nbsp;&nbsp;</span>
          &copy;
          {Number(startYear) < fullYear && (
            <span className={styles.siteStart}>
              {startYear}-
            </span>
          )}
          {fullYear}&nbsp;&nbsp;
          <a href={getSiteUrl()}>{siteAuthor}</a>
        </span>
        {siteIcp && (
          <span>
            &amp;
            <a href="https://beian.miit.gov.cn" target="_blank">
              {siteIcp}
            </a>
          </span>
        )}
      </div>
    </footer>
  );
}