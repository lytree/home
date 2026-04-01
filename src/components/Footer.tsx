import { defineComponent, ref, computed, Transition } from 'vue';
import { MusicOne } from '@icon-park/vue-next';
import { mainStore } from '@/store';
import styles from './Footer.module.scss';

export default defineComponent({
  setup() {
    const store = mainStore();
    const fullYear = new Date().getFullYear();

    // 加载配置数据
    const startYear = ref(
      import.meta.env.VITE_SITE_START?.length >= 4 ?
        import.meta.env.VITE_SITE_START.substring(0, 4) : null
    );
    const siteIcp = ref(import.meta.env.VITE_SITE_ICP);
    const siteAuthor = ref(import.meta.env.VITE_SITE_AUTHOR);
    const siteUrl = computed(() => {
      const url = import.meta.env.VITE_SITE_URL;
      if (!url) return 'https://www.imsyy.top';
      // 判断协议前缀
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return '//' + url;
      }
      return url;
    });

    return () => (
      <footer class={[styles.footer, store.footerBlur ? styles.blur : ''].filter(Boolean).join(' ')}>
        <Transition name="fade" mode="out-in">
          {!store.playerState || !store.playerLrcShow ? (
            <div class={styles.power}>
              <span>
                <span class={Number(startYear.value) < fullYear ? styles.cHidden : styles.hidden}>Copyright&nbsp;</span>
                &copy;
                {Number(startYear.value) < fullYear && (
                  <span class={styles.siteStart}>
                    {startYear.value}
                    -
                  </span>
                )}
                {fullYear}
                <a href={siteUrl.value}>{siteAuthor.value}</a>
              </span>
              {/* 站点备案 */}
              {siteIcp.value && (
                <span>
                  &amp;
                  <a href="https://beian.miit.gov.cn" target="_blank">
                    {siteIcp.value}
                  </a>
                </span>
              )}
            </div>
          ) : (
            <div class={styles.lrc}>
              <Transition name="fade" mode="out-in">
                <div class={styles.lrcAll} key={store.getPlayerLrc}>
                  <MusicOne theme="filled" size="18" fill="#efefef" />
                  <span class={[styles.lrcText, styles.textHidden].join(' ')} dangerouslySetInnerHTML={{ __html: store.getPlayerLrc }} />
                  <MusicOne theme="filled" size="18" fill="#efefef" />
                </div>
              </Transition>
            </div>
          )}
        </Transition>
      </footer>
    );
  }
});