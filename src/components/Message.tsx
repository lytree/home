import { defineComponent, computed, reactive, watch, h, Transition } from 'vue';
import { Icon } from '@iconify/vue';
//@ts-ignore
import { useMainStore } from '@/store/index.ts';
import styles from './Message.module.scss';

export default defineComponent({
  setup() {
    const store = useMainStore();

    // 主页站点logo
    const siteLogo = import.meta.env.VITE_SITE_MAIN_LOGO;
    // 站点链接
    const siteUrl = computed(() => {
      const url = import.meta.env.VITE_SITE_AUTHOR;

      // 判断协议前缀
      if (url.startsWith('http://') || url.startsWith('https://')) {
        const urlFormat = url.replace(/^(https?:\/\/)/, '');
        return urlFormat.split('.');
      }
      return url.split('.');
    });

    // 简介区域文字
    const descriptionText = reactive({
      hello: import.meta.env.VITE_DESC_HELLO,
      text: import.meta.env.VITE_DESC_TEXT,
    });

    // 监听状态变化
    watch(
      () => store.boxOpenState,
      (value) => {
        if (value) {
          descriptionText.hello = import.meta.env.VITE_DESC_HELLO_OTHER;
          descriptionText.text = import.meta.env.VITE_DESC_TEXT_OTHER;
        } else {
          descriptionText.hello = import.meta.env.VITE_DESC_HELLO;
          descriptionText.text = import.meta.env.VITE_DESC_TEXT;
        }
      },
    );

    return () => (
      <div class={styles.message}>
        {/* Logo */}
        <div class={styles.logo}>
          <img class={styles.logoImg} src={siteLogo} alt="logo" />
          <div class={[styles.name, 'text-hidden', siteUrl.value[0].length >= 6 ? styles.long : ''].filter(Boolean).join(' ')}>
            <span class={styles.bg}>{siteUrl.value[0]}</span>
            <span class={styles.sm}>.{siteUrl.value[1]}</span>
          </div>
        </div>
        {/* 简介 */}
        <div class={[styles.description, 'cards'].join(' ')} >
          <div class={styles.content}>
            <Icon icon="fa:quote-left" height={16} width={16} />
            <Transition name="fade" mode="out-in">
              <div key={descriptionText.text} class={styles.text}>
                <p>{descriptionText.text}</p>
              </div>
            </Transition>
            <Icon icon="fa:quote-right" height={16} width={16} />
          </div>
        </div>
      </div>
    );
  }
});