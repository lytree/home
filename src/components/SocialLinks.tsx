import { defineComponent, ref } from 'vue';
import socialLinks from '@/assets/socialLinks.json';
import styles from './SocialLinks.module.scss';

export default defineComponent({
  setup() {
    // 社交链接提示
    const socialTip = ref('通过这里联系我吧');
    
    return () => (
      <div class={styles.social}>
        <div class={styles.link}>
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              onMouseenter={() => (socialTip.value = item.tip)}
              onMouseleave={() => (socialTip.value = '通过这里联系我吧')}
            >
              <img class={styles.icon} src={item.icon} height="24" />
            </a>
          ))}
        </div>
        <span class={styles.tip}>{socialTip.value}</span>
      </div>
    );
  }
});