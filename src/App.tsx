import { defineVaporComponent, onMounted, onUnmounted, watch } from 'vue';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'vue-sonner';
import { useMainStore } from '@/store';
import { helloInit, checkDays } from '@/utils/getTime';
import cursorInit from '@/utils/cursor';
import { cn } from '@/utils/cn';
import styles from './App.module.css';

import Loading from '@/components/Loading';
import Background from '@/components/Background';
import Footer from '@/components/Footer';
import MainLeft from '@/views/Main/Left';
import MainRight from '@/views/Main/Right';

export default defineVaporComponent({
  setup() {
    const store = useMainStore();

    const siteName = import.meta.env.VITE_SITE_NAME;
    const siteAuthor = import.meta.env.VITE_SITE_AUTHOR;
    const siteLogo = import.meta.env.VITE_SITE_MAIN_LOGO;
    const rawSiteUrl = import.meta.env.VITE_SITE_URL ?? '';
    const siteHome = rawSiteUrl.startsWith('http') ? rawSiteUrl : `https://${rawSiteUrl}`;
    const displayUrl = rawSiteUrl.replace(/^https?:\/\//, '');

    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      toast('为了浏览体验,本站禁用右键', { duration: 2000 });
    };

    const handleMiddleMouse = (event: MouseEvent) => {
      if (event.button === 1) {
        store.setBackgroundShow(!store.backgroundShow);
        toast(store.backgroundShow ? '壁纸模式已开启' : '已返回主页');
      }
    };

    const handleResize = () => {
      store.setInnerWidth(window.innerWidth);
    };

    onMounted(() => {
      cursorInit();
      store.setInnerWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      document.addEventListener('contextmenu', handleContextMenu);
      window.addEventListener('mousedown', handleMiddleMouse);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('mousedown', handleMiddleMouse);
    });

    watch(
      () => store.innerWidth,
      (width) => {
        if (width < 1024) {
          store.setBoxOpenState(false);
          store.setSetOpenState(false);
        }
      },
    );

    const toggleMobile = () => {
      store.setMobileOpenState(!store.mobileOpenState);
    };

    const onBackgroundLoad = () => {
      helloInit();
      checkDays();
    };

    return (
      <>
        <Loading />
        <Background onLoadComplete={onBackgroundLoad} />
        {store.imgLoadStatus ? (
          <div class={styles.shell}>
            <div class={styles.frame} aria-hidden="true">
              <span class={styles.corner} />
              <span class={styles.corner} />
              <span class={styles.corner} />
              <span class={styles.corner} />
            </div>

            <div class={styles.rail} aria-hidden="true">
              <span class={styles.railLine} />
              <span>LYTREE — PERSONAL ARCHIVE</span>
              <span class={styles.railLine} />
            </div>

            {store.backgroundShow ? (
              <button
                type="button"
                class={styles.wallpaperHint}
                onClick={() => store.setBackgroundShow(false)}
              >
                <span class={styles.hintDot} />
                壁纸模式 · 点击或中键返回
              </button>
            ) : (
              <>
                <header class={styles.topbar}>
                  <a class={styles.brand} href="/">
                    <span class={styles.avatar}>
                      <img src={siteLogo} alt={siteAuthor} />
                    </span>
                    <span class={styles.brandText}>
                      <span class={styles.brandName}>{siteName}</span>
                      <span class={styles.brandSub}>personal archive</span>
                    </span>
                  </a>

                  <div class={styles.topMeta}>
                    <span class={styles.status}>
                      <i class={styles.dot} />
                      site online
                    </span>
                    <span class={styles.sep} />
                    <a class={styles.urlLink} href={siteHome} target="_blank" rel="noreferrer">
                      {displayUrl}
                    </a>
                  </div>
                </header>

                <main class={styles.main}>
                  {store.setOpenState ? null : (
                    <>
                      <MainLeft />
                      <MainRight />
                    </>
                  )}
                </main>

                <Footer />

                <button
                  type="button"
                  class={cn(styles.menu, store.mobileOpenState && styles.menuOpen)}
                  onClick={toggleMobile}
                  aria-label={store.mobileOpenState ? '返回首页' : '查看更多信息'}
                >
                  <span class={styles.menuBars}>
                    <i />
                    <i />
                  </span>
                  <span>{store.mobileOpenState ? '返回首页' : '更多信息'}</span>
                </button>
              </>
            )}
          </div>
        ) : null}
        <Toaster />
      </>
    );
  },
});
