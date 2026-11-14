import { defineVaporComponent, ref } from 'vue';
import socialLinks from '@/assets/socialLinks.json';
import styles from './SocialLinks.module.css';

interface SocialItem {
  name: string;
  icon: string;
  tip: string;
  url: string;
}

export default defineVaporComponent({
  setup() {
    const socialTip = ref('在这些地方找到我');

    return (
      <div class={styles.social}>
        <span class={styles.label}>Contact</span>

        <div class={styles.list}>
          {(socialLinks as SocialItem[]).map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              class={styles.item}
              aria-label={item.name}
              onMouseenter={() => (socialTip.value = item.tip)}
              onMouseleave={() => (socialTip.value = '在这些地方找到我')}
            >
              <img src={item.icon} alt="" />
            </a>
          ))}
        </div>

        <span class={styles.tip}>{socialTip.value}</span>
      </div>
    );
  },
});
