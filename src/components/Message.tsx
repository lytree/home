import { defineVaporComponent, computed } from 'vue';
import { useMainStore } from '@/store';
import { cn } from '@/utils/cn';
import styles from './Message.module.scss';
import { Icon } from '@iconify/vue';

export default defineVaporComponent({
  setup() {
    const store = useMainStore();

    const siteLogo = import.meta.env.VITE_SITE_MAIN_LOGO;
    const siteAuthor = import.meta.env.VITE_SITE_AUTHOR;

    const urlParts = computed<string[]>(() => {
      if (siteAuthor.startsWith('http://') || siteAuthor.startsWith('https://')) {
        return siteAuthor.replace(/^(https?:\/\/)/, '').split('.');
      }
      return siteAuthor.split('.');
    });

    const descriptionText = {
      hello: import.meta.env.VITE_DESC_HELLO,
      text: import.meta.env.VITE_DESC_TEXT,
    };

    const displayText = computed(() =>
      store.boxOpenState
        ? {
            hello: import.meta.env.VITE_DESC_HELLO_OTHER,
            text: import.meta.env.VITE_DESC_TEXT_OTHER,
          }
        : descriptionText,
    );

    return (
      <>
        <div class={cn(styles.logo, 'flex flex-row items-center animation-fade max-w-115')}>
          <img class={cn(styles.logoImg, 'rounded-full w-28')} src={siteLogo} alt="logo" />
          <div
            class={cn(
              styles.name,
              'text-hidden w-full pl-5.5 -translate-y-2',
              (urlParts.value[0]?.length ?? 0) >= 6 && styles.long,
            )}
          >
            <span class={cn(styles.bg, 'text-5xl')}>{urlParts.value[0]}</span>
            <span class={cn(styles.sm, 'ml-1.5 text-2xl')}>{urlParts.value[1]}</span>
          </div>
        </div>
        <div class={cn(styles.description, 'cards p-4! mt-14! max-w-115')}>
          <div class={cn(styles.content, 'flex justify-between')}>
            <Icon icon="fa:quote-left" height={16} width={16} />
            <div class={cn(styles.text, 'my-3 mx-4 leading-8 mr-auto')}>
              <p>{displayText.value.text}</p>
            </div>
            <Icon icon="fa:quote-right" height={16} width={16} />
          </div>
        </div>
      </>
    );
  },
});
