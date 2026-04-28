import { useEffect } from 'react';
import { Icon } from '@iconify/react';
import Loading from '@/components/Loading';
import MainLeft from '@/views/Main/Left';
import MainRight from '@/views/Main/Right';
import Background from '@/components/Background';
import Footer from '@/components/Footer';
import { useMainStore } from '@/store';
import { helloInit, checkDays } from '@/utils/getTime';
import cursorInit from '@/utils/cursor';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/utils/cn';

export default function App() {
  const store = useMainStore();
  const menuIcon = store.mobileOpenState ? 'fa:times' : 'fa:bars';

  const updateWidth = () => {
    store.setInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    cursorInit();
    updateWidth();
    window.addEventListener('resize', updateWidth);

    document.oncontextmenu = (e) => {
      e.preventDefault();
      toast('为了浏览体验,本站禁用右键', {
        duration: 2000
      });
      return false;
    };

    window.addEventListener('mousedown', (event: MouseEvent) => {
      if (event.button == 1) {
        store.setBackgroundShow(!store.backgroundShow);
        toast(`已${store.backgroundShow ? '开启' : '退出'}壁纸展示状态`);
      }
    });

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  useEffect(() => {
    if (store.innerWidth < 721) {
      store.setBoxOpenState(false);
      store.setSetOpenState(false);
    }
  }, [store.innerWidth]);

  const handleLoadComplete = () => {
    helloInit();
    checkDays();
  };

  return (
    <>
      <Loading />
      <Background onLoadComplete={handleLoadComplete} />
      {store.imgLoadStatus && (
        <main id="main" className="absolute top-0 left-0 w-full h-full">
          <div className="w-full h-screen mx-auto px-[0.5vw] lg:px-[2vw] max-h-[720px]:h-[721px]">
            {store.setOpenState ? null : (
              <section className="w-full h-full px-3 flex flex-row justify-center items-center">
                <MainLeft />
                <MainRight />
              </section>
            )}
          </div>
          <Icon
            className={cn(
              "absolute flex justify-center items-center top-[84%] left-[calc(50%-28px)] w-14 h-8.5 bg-black/20 backdrop-blur-md rounded-md transition-transform duration-300 animate-fade active:scale-95 -translate-y-px min-[720px]:hidden",
              store.backgroundShow && "hidden"
            )}
            icon={menuIcon}
            width={24}
            height={24}
            onClick={() => store.setMobileOpenState(!store.mobileOpenState)}
          />
          {!store.backgroundShow && (
            <Footer className="max-[390px]:w-97.75" />
          )}
        </main>
      )}
      <Toaster position="top-center" />
    </>
  );
}