import { defineComponent, onMounted, onBeforeUnmount, watch, nextTick, Transition, computed } from 'vue';
import { helloInit, checkDays } from '@/utils/getTime.ts';
import { useMainStore } from '@/store/index.ts';
import { Icon } from '@iconify/vue';
import Loading from '@/components/Loading.tsx';
import MainLeft from '@/views/Main/Left.tsx';
import MainRight from '@/views/Main/Right.tsx';
import Background from '@/components/Background.tsx';
import Footer from '@/components/Footer.tsx';
import cursorInit from '@/utils/cursor.ts';
import ElMessage from '@/components/custom/message';
import styles from './App.module.scss';

export default defineComponent({
  setup() {
    const store = useMainStore();
    const menuIcon = computed(() => store.mobileOpenState ? 'fa:times' : 'fa:bars')
    // 1. 定义一个获取宽度并更新到 Store 的函数
    const updateWidth = () => {
      store.setInnerWidth(window.innerWidth);
    };
    // 加载完成事件
    const loadComplete = () => {
      nextTick(() => {
        // 欢迎提示
        helloInit();
        // 默哀模式
        checkDays();
      });
    };

    // 监听宽度变化
    watch(
      () => store.innerWidth,
      (value) => {
        if (value < 721) {
          store.boxOpenState = false;
          store.setOpenState = false;
        }
      }
    );

    onMounted(() => {
      // 自定义鼠标
      cursorInit();

      // 屏蔽右键
      document.oncontextmenu = () => {
        ElMessage({
          message: '为了浏览体验，本站禁用右键',
          grouping: true,
          duration: 2000
        });
        return false;
      };

      // 鼠标中键事件
      window.addEventListener('mousedown', (event) => {
        if (event.button == 1) {
          store.backgroundShow = !store.backgroundShow;
          ElMessage({
            message: `已${store.backgroundShow ? '开启' : '退出'}壁纸展示状态`,
            grouping: true
          });
        }
      });

      // 监听当前页面宽度
      updateWidth();
      window.addEventListener('resize', updateWidth);

      // 控制台输出
      console.info('fork imsyy/home');
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateWidth);
    });

    return () => (
      <>
        {/* 加载 */}
        <Loading />
        {/* 壁纸 */}
        <Background onLoadComplete={loadComplete} />
        {/* 主界面 */}
        <Transition name="fade" mode="out-in">
          {store.imgLoadStatus && (
            <main id={styles.main} class="absolute top-0 left-0 w-full h-full  transition-transform duration-300 animate-[fade-blur-main-in_0.65s_cubic-bezier(0.25,0.46,0.45,0.94)_forwards] animate-delay-[500ms]">
              <div class="w-full h-screen mx-auto px-[0.5vw] lg:px-[2vw] max-h-[720px]:h-[721px]">
                <section class="w-full h-full px-3 flex flex-row justify-center items-center" v-show={!store.setOpenState}>
                  <MainLeft />
                  <MainRight />
                </section>

              </div>
              {/* 移动端菜单按钮 */}
              <Icon class="absolute flex justify-center items-center top-[84%] left-[calc(50%-28px)] w-14 h-8.5 bg-black/20 backdrop-blur-md rounded-md transition-transform duration-300 animate-fade active:scale-95 -translate-y-px min-[720px]:hidden" icon={menuIcon.value} width={24} height={24} v-show={!store.backgroundShow} onClick={() => (store.mobileOpenState = !store.mobileOpenState)} />
              {/* 页脚 */}
              <Transition name="fade" mode="out-in">
                {!store.backgroundShow && <Footer class="max-[390px]:w-97.75" />}
              </Transition>
            </main>
          )}
        </Transition>
      </>
    );
  }
});