import { defineVaporComponent } from 'vue';
import styles from './Footer.module.css';

export default defineVaporComponent({
  setup() {
    const fullYear = new Date().getFullYear();
    const rawStart = import.meta.env.VITE_SITE_START ?? '';
    const startYear = rawStart.length >= 4 ? rawStart.slice(0, 4) : null;
    const siteIcp = import.meta.env.VITE_SITE_ICP;
    const siteAuthor = import.meta.env.VITE_SITE_AUTHOR;
    const siteName = import.meta.env.VITE_SITE_NAME;
    const siteDes = import.meta.env.VITE_SITE_DES;
    const siteUrl = import.meta.env.VITE_SITE_URL ?? '';

    const getSiteUrl = () => {
      if (!siteUrl.startsWith('http://') && !siteUrl.startsWith('https://')) {
        return '//' + siteUrl;
      }
      return siteUrl;
    };

    const pieces = [
      siteName,
      siteDes,
      startYear ? `SINCE ${startYear}` : 'PERSONAL ARCHIVE',
      siteUrl.replace(/^https?:\/\//, ''),
      '手记 · 代码 · 光',
      siteAuthor,
    ].filter(Boolean);

    const marqueeItems = [...pieces, ...pieces];

    return (
      <footer class={styles.footer}>
        <div class={styles.marquee} aria-hidden="true">
          <div class={styles.track}>
            {marqueeItems.map((item, index) => (
              <span class={styles.item} key={`${item}-${index}`}>
                {item}
              </span>
            ))}
          </div>
        </div>

        <div class={styles.meta}>
          <span class={styles.copyright}>
            ©&nbsp;{startYear ? `${startYear}–` : ''}
            {fullYear}
          </span>
          <a class={styles.author} href={getSiteUrl()}>
            {siteAuthor}
          </a>
          {siteIcp ? (
            <a class={styles.icp} href="https://beian.miit.gov.cn" target="_blank" rel="noreferrer">
              {siteIcp}
            </a>
          ) : null}
        </div>
      </footer>
    );
  },
});
