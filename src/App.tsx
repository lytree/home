import { defineComponent, onMounted, onBeforeUnmount, watch, nextTick, Transition, computed } from 'vue';
import { helloInit, checkDays } from '@/utils/getTime.ts';
import { useMainStore } from '@/store/index.ts';
import { Icon } from '@iconify/vue';
import Loading from '@/components/Loading.tsx';
import MainLeft from '@/views/Main/Left.tsx';
import MainRight from '@/views/Main/Right.tsx';
import Background from '@/components/Background.tsx';
import Footer from '@/components/Footer.tsx';
import cursorInit from '@/utils/cursor.js';
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
            <main id={styles.main}>
              <div class={styles.container} v-show={!store.backgroundShow} >
                <section class={styles.all} v-show={!store.setOpenState}>
                  <MainLeft />
                  <MainRight  />
                </section>

              </div>
              {/* 移动端菜单按钮 */}
              <Icon class={styles.menu} icon={menuIcon.value} width={24} height={24} v-show={!store.backgroundShow} onClick={() => (store.mobileOpenState = !store.mobileOpenState)} />
              {/* 页脚 */}
              <Transition name="fade" mode="out-in">
                {!store.backgroundShow && <Footer class={styles.footer} />}
              </Transition>
            </main>
          )}
        </Transition>
      </>
    );
  }
});