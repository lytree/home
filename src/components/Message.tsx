import { defineVaporComponent } from 'vue';
import styles from './Message.module.css';

export default defineVaporComponent({
  setup() {
    const siteName = import.meta.env.VITE_SITE_NAME;
    const siteAuthor = import.meta.env.VITE_SITE_AUTHOR;
    const rawDes = import.meta.env.VITE_SITE_DES;
    // “杨 ◦ 柳 ｜ 记录平淡生活里的微光” -> 只留破折号后的那句，避免与姓名重复
    const tagline = rawDes.split(/[｜|]/).pop()?.trim() || rawDes;
    const siteUrl = (import.meta.env.VITE_SITE_URL ?? '').replace(/^https?:\/\//, '');
    const descText = import.meta.env.VITE_DESC_TEXT;
    const rawStart = import.meta.env.VITE_SITE_START ?? '';
    const startYear = rawStart.length >= 4 ? rawStart.slice(0, 4) : '';

    const nameChars = (siteName.replace(/\s|◦/g, '') || siteAuthor || 'LY').split('');
    const latin = siteAuthor || 'lytree';

    return (
      <div class={styles.identity}>
        <div class={styles.eyebrow}>
          <span class={styles.index}>01</span>
          <span class={styles.label}>Portfolio</span>
          <span class={styles.rule} />
          <span class={styles.year}>{startYear ? `EST. ${startYear}` : 'PERSONAL SITE'}</span>
        </div>

        <h1 class={styles.name} aria-label={siteName}>
          <span class={styles.chars} aria-hidden="true">
            {nameChars.map((char, i) => (
              <span class={styles.charMask}>
                <span class={styles.char} style={{ animationDelay: `${0.46 + i * 0.1}s` }}>
                  {char}
                </span>
              </span>
            ))}
          </span>
          <span class={styles.latin} aria-hidden="true">
            {latin}
          </span>
        </h1>

        <p class={styles.tagline}>{tagline}</p>

        <div class={styles.metaRow}>
          <span class={styles.metaItem}>
            <i class={styles.metaDot} />
            {siteUrl}
          </span>
          <span class={styles.metaDivider} />
          <span class={styles.metaItem}>手记 · 代码 · 光</span>
        </div>

        <figure class={styles.quote}>
          <span class={styles.quoteMark} aria-hidden="true">
            “
          </span>
          <blockquote class={styles.quoteText}>{descText}</blockquote>
          <figcaption class={styles.quoteFrom}>写在首页的一句话</figcaption>
        </figure>
      </div>
    );
  },
});
