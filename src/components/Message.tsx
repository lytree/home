import { defineComponent, computed, reactive, watch, Transition } from 'vue';
import { Icon } from '@iconify/vue';
import { useMainStore } from '@/store/index.ts';
import { cn } from '@/utils/cn';
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
      < >
        {/* Logo */}
        <div class={cn(styles.logo, 'flex flex-row items-center animation-fade max-w-115')}>
          <img class={cn(styles.logoImg, 'rounded-full w-28')} src={siteLogo} alt="logo" />
          <div class={cn(styles.name, 'text-hidden w-full pl-5.5 -translate-y-2', siteUrl.value[0].length >= 6 && styles.long)}>
            <span class={cn(styles.bg, 'text-5xl')}>{siteUrl.value[0]}</span>
            <span class={cn(styles.sm, 'ml-1.5 text-2xl')}>{siteUrl.value[1]}</span>
          </div>
        </div>
        {/* 简介 */}
        <div class={cn(styles.description, 'cards p-4! mt-14! max-w-115')} >
          <div class={cn(styles.content, 'flex justify-between')}>
            <Icon icon="fa:quote-left" height={16} width={16} />
            <Transition name="fade" mode="out-in">
              <div key={descriptionText.text} class={cn(styles.text, 'my-3 mx-4 leading-8 mr-auto')}>
                <p>{descriptionText.text}</p>
              </div>
            </Transition>
            <Icon icon="fa:quote-right" height={16} width={16} />
          </div>
        </div>
      </>
    );
  }
});