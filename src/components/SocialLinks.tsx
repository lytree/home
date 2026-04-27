import { defineComponent, ref } from 'vue';
import socialLinks from '@/assets/socialLinks.json';
import { cn } from '@/utils/cn';
import styles from './SocialLinks.module.scss';

export default defineComponent({
  setup() {
    // 社交链接提示
    const socialTip = ref('通过这里联系我吧');
    
    return () => (
      <div class={cn(styles.social, 'mt-4 flex items-center justify-between max-w-115 w-full h-10.5 bg-transparent rounded-md backdrop-blur-sm')}>
        <div class={cn(styles.link, 'flex items-center justify-center')}>
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              class="inline-block"
              onMouseenter={() => (socialTip.value = item.tip)}
              onMouseleave={() => (socialTip.value = '通过这里联系我吧')}
            >
              <img class={cn(styles.icon, 'mx-3 h-6 transition-transform duration-300 hover:scale-110 active:scale-100')} src={item.icon} height="24" />
            </a>
          ))}
        </div>
        <span class={cn(styles.tip, 'hidden mr-3')}>{socialTip.value}</span>
      </div>
    );
  }
});