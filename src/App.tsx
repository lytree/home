import { defineVaporComponent, onMounted, onUnmounted, watch, computed } from 'vue';
import { Icon } from '@/components/ui/icon';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'vue-sonner';
import { useMainStore } from '@/store';
import { helloInit, checkDays } from '@/utils/getTime';
import cursorInit from '@/utils/cursor';
import { cn } from '@/utils/cn';

import Loading from '@/components/Loading';
import Background from '@/components/Background';
import Footer from '@/components/Footer';
import MainLeft from '@/views/Main/Left';
import MainRight from '@/views/Main/Right';

export default defineVaporComponent({
  setup() {
    const store = useMainStore();

    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      toast('为了浏览体验,本站禁用右键', { duration: 2000 });
    };

    const handleMiddleMouse = (event: MouseEvent) => {
      if (event.button === 1) {
        store.setBackgroundShow(!store.backgroundShow);
        toast(`已${store.backgroundShow ? '开启' : '退出'}壁纸展示状态`);
      }
    };

    onMounted(() => {
      cursorInit();
      store.setInnerWidth(window.innerWidth);
      window.addEventListener('resize', () => store.setInnerWidth(window.innerWidth));
      document.addEventListener('contextmenu', handleContextMenu);
      window.addEventListener('mousedown', handleMiddleMouse);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', () => store.setInnerWidth(window.innerWidth));
      document.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('mousedown', handleMiddleMouse);
    });

    watch(
      () => store.innerWidth,
      (width) => {
        if (width < 721) {
          store.setBoxOpenState(false);
          store.setSetOpenState(false);
        }
      },
    );

    const menuIcon = computed(() => (store.mobileOpenState ? 'fa:times' : 'fa:bars'));

    const onBackgroundLoad = () => {
      helloInit();
      checkDays();
    };

    return (
      <>
        <Loading />
        <Background onLoadComplete={onBackgroundLoad} />
        {store.imgLoadStatus ? (
          <main id="main" class="absolute top-0 left-0 w-full h-full">
            <div class="w-full h-screen mx-auto px-[0.5vw] lg:px-[2vw] max-h-[720px]:h-[721px]">
              {store.setOpenState ? null : (
                <section class="w-full h-full px-3 flex flex-row justify-center items-center">
                  <MainLeft />
                  <MainRight />
                </section>
              )}
            </div>
            <Icon
              class={cn(
                'absolute flex justify-center items-center top-[84%] left-[calc(50%-28px)] w-14 h-8.5 bg-black/20 backdrop-blur-md rounded-md transition-transform duration-300 animate-fade active:scale-95 -translate-y-px min-[720px]:hidden',
                store.backgroundShow ? 'hidden' : null,
              )}
              icon={menuIcon.value}
              width={24}
              height={24}
              onClick={() => store.setMobileOpenState(!store.mobileOpenState)}
            />
            {store.backgroundShow ? null : <Footer footerClass="max-[390px]:w-97.75" />}
          </main>
        ) : null}
        <Toaster position="top-center" />
      </>
    );
  },
});
