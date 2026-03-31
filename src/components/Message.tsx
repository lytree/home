import { defineComponent, computed, reactive, watch, h } from 'vue';
import { Icon } from '@iconify/vue';
import { Error } from '@icon-park/vue-next';
import { mainStore } from '@/store';
import ElMessage from '@/components/custom/message';
import styles from './Message.module.scss';

export default defineComponent({
  setup() {
    const store = mainStore();
    
    // 主页站点logo
    const siteLogo = import.meta.env.VITE_SITE_MAIN_LOGO;
    // 站点链接
    const siteUrl = computed(() => {
      const url = import.meta.env.VITE_SITE_AUTHOR;
      if (!url) return 'imsyy.top'.split('.');
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
    
    // 切换右侧功能区
    const changeBox = () => {
      if (store.getInnerWidth >= 721) {
        store.boxOpenState = !store.boxOpenState;
      } else {
        ElMessage({
          message: '当前页面宽度不足以开启盒子',
          grouping: true,
          icon: h(Error, {
            theme: 'filled',
            fill: '#efefef',
          }),
        });
      }
    };
    
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
        <div class={[styles.description, 'cards'].join(' ')} onClick={changeBox}>
          <div class={styles.content}>
            <Icon icon="fa:quote-left" size={16} />
            <transition name="fade" mode="out-in">
              <div key={descriptionText.hello + descriptionText.text} class={styles.text}>
                <p>{descriptionText.hello}</p>
                <p>{descriptionText.text}</p>
              </div>
            </transition>
            <Icon icon="fa:quote-right" size={16} />
          </div>
        </div>
      </div>
    );
  }
});