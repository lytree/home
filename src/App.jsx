import { defineComponent, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import { helloInit, checkDays } from '@/utils/getTime.js';
import { HamburgerButton, CloseSmall } from '@icon-park/vue-next';
import { mainStore } from '@/store';
import { Icon } from '@vicons/utils';
import Loading from '@/components/Loading.jsx';
import MainLeft from '@/views/Main/Left.jsx';
import MainRight from '@/views/Main/Right.jsx';
import Background from '@/components/Background.jsx';
import Footer from '@/components/Footer.jsx';
import Box from '@/views/Box/index.jsx';
import MoreSet from '@/views/MoreSet/index.jsx';
import cursorInit from '@/utils/cursor.js';
import config from '@/../package.json';
import ElMessage from '@/components/custom/message';
import styles from './App.module.scss';

export default defineComponent({
  setup() {
    const store = mainStore();

    // 页面宽度
    const getWidth = () => {
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
      getWidth();
      window.addEventListener('resize', getWidth);

      // 控制台输出
      console.info('fork imsyy/home');
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', getWidth);
    });

    return () => (
      <>
        {/* 加载 */}
        <Loading />
        {/* 壁纸 */}
        <Background onLoadComplete={loadComplete} />
        {/* 主界面 */}
        <transition name="fade" mode="out-in">
          {store.imgLoadStatus && (
            <main class={styles.main}>
              <div class={styles.container} style={{ display: store.backgroundShow ? 'none' : 'block' }}>
                <section class={styles.all} style={{ display: store.setOpenState ? 'none' : 'block' }}>
                  <MainLeft />
                  <MainRight style={{ display: store.boxOpenState ? 'none' : 'block' }} />
                  <Box style={{ display: store.boxOpenState ? 'block' : 'none' }} />
                </section>
                <section class={styles.more} style={{ display: store.setOpenState ? 'block' : 'none' }} onClick={() => (store.setOpenState = false)}>
                  <MoreSet />
                </section>
              </div>
              {/* 移动端菜单按钮 */}
              <Icon class={styles.menu} size="24" style={{ display: store.backgroundShow ? 'none' : 'block' }} onClick={() => (store.mobileOpenState = !store.mobileOpenState)}>
                <component is={store.mobileOpenState ? CloseSmall : HamburgerButton} />
              </Icon>
              {/* 页脚 */}
              <transition name="fade" mode="out-in">
                {!store.backgroundShow && !store.setOpenState && <Footer class={styles.footer} />}
              </transition>
            </main>
          )}
        </transition>
      </>
    );
  }
});