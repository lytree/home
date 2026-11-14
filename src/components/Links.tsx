import { defineVaporComponent } from 'vue';
import { Icon } from '@/components/ui/icon';
import siteLinks from '@/assets/siteLinks.json';
import styles from './Links.module.css';

interface SiteLink {
  icon?: string;
  name?: string;
  link: string;
}

export default defineVaporComponent({
  setup() {
    if (!siteLinks[0]) return <div />;

    const total = String(siteLinks.length).padStart(2, '0');

    return (
      <section class={styles.links}>
        <header class={styles.head}>
          <span class={styles.idx}>04</span>
          <span class={styles.label}>Index</span>
          <span class={styles.count}>{total} sites</span>
        </header>

        <div class={styles.rows}>
          {siteLinks.map((item, index) => (
            <a
              class={styles.row}
              key={(item as SiteLink).link}
              href={(item as SiteLink).link}
              target="_blank"
              rel="noreferrer"
            >
              <span class={styles.num}>{String(index + 1).padStart(2, '0')}</span>
              <span class={styles.icon}>
                <Icon icon={(item as SiteLink).icon || 'fa:link'} width={14} height={14} />
              </span>
              <span class={styles.name}>{(item as SiteLink).name}</span>
              <span class={styles.hint}>访问</span>
              <span class={styles.arrow}>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 17 17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </section>
    );
  },
});
