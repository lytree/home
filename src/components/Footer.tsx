import { defineComponent, ref, computed, Transition } from 'vue';
import { useMainStore } from '@/store/index.ts';
import { cn } from '@/utils/cn';
import styles from './Footer.module.scss';

export default defineComponent({
  setup() {
    const store = useMainStore();
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
      // 判断协议前缀
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return '//' + url;
      }
      return url;
    });

    return () => (
      <footer class={cn(styles.footer, 'absolute bottom-0 left-0 w-full h-11.5 text-center z-0 text-sm break-keep whitespace-nowrap', styles.blur)}>
        <Transition name="fade" mode="out-in">

          <div class={cn(styles.power, 'animation-fade duration-300')}>
            <span>
              <span class={cn(Number(startYear.value) < fullYear ? styles.cHidden : styles.hidden, 'hidden lg:block')}>Copyright&nbsp;&nbsp;</span>
              &copy;
              {Number(startYear.value) < fullYear && (
                <span class={styles.siteStart}>
                  {startYear.value}
                  -
                </span>
              )}
              {fullYear}&nbsp;&nbsp;
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
        </Transition>
      </footer>
    );
  }
});