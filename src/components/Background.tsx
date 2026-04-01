import { defineComponent, ref, watch, onMounted, onBeforeUnmount, h, Transition } from 'vue';
//@ts-ignore
import { mainStore } from '@/store';
import { Error } from '@icon-park/vue-next';
import ElMessage from '@/components/custom/message';
import styles from './Background.module.scss';

export default defineComponent({
  props: {
    onLoadComplete: {
      type: Function,
      default: () => { }
    }
  },
  setup(props) {
    const store = mainStore();
    const bgUrl = ref("");
    const imgTimeout = ref();

    // 壁纸随机数
    // 请依据文件夹内的图片个数修改 Math.random() 后面的第一个数字
    const bgRandom = Math.floor(Math.random() * 10 + 1);

    // 更换壁纸链接
    const changeBg = (type: number) => {
      if (type == 0) {
        bgUrl.value = `/images/background${bgRandom}.jpg`;
      } else if (type == 1) {
        bgUrl.value = 'https://api.dujin.org/bing/1920.php';
      } else if (type == 2) {
        bgUrl.value = 'https://api.vvhan.com/api/wallpaper/views';
      } else if (type == 3) {
        bgUrl.value = 'https://api.vvhan.com/api/wallpaper/acg';
      }
    };

    // 图片加载完成
    const imgLoadComplete = () => {
      imgTimeout.value = setTimeout(
        () => {
          store.setImgLoadStatus(true);
        },
        Math.floor(Math.random() * (600 - 300 + 1)) + 300
      );
    };

    // 图片动画完成
    const imgAnimationEnd = () => {
      console.log('壁纸加载且动画完成');
      // 加载完成事件
      props.onLoadComplete();
    };

    // 图片显示失败
    const imgLoadError = () => {
      console.error('壁纸加载失败：', bgUrl.value);
      ElMessage({
        message: '壁纸加载失败，已临时切换回默认',
        icon: h(Error, {
          theme: 'filled',
          fill: '#efefef'
        })
      });
      bgUrl.value = `/images/background${bgRandom}.jpg`;
    };

    // 监听壁纸切换
    watch(
      () => store.coverType,
      (value) => {
        changeBg(value);
      }
    );

    onMounted(() => {
      // 加载壁纸
      changeBg(store.coverType);
    });

    onBeforeUnmount(() => {
      clearTimeout(imgTimeout.value);
    });

    return () => (
      <div class={[styles.cover, store.backgroundShow ? styles.show : ''].filter(Boolean).join(' ')}>

        <img
          src={bgUrl.value}
          class={styles.bg}
          alt="cover"
          onLoad={imgLoadComplete}
          onError={imgLoadError}
          onAnimationend={imgAnimationEnd}
        />
        )
        <div class={[styles.gray, store.backgroundShow ? styles.hidden : ''].filter(Boolean).join(' ')} />
        <Transition name="fade" mode="out-in">
          {store.backgroundShow && store.coverType != '3' && (
            <a
              class={styles.down}
              href={bgUrl.value}
              target="_blank"
            >
              下载壁纸
            </a>
          )}
        </Transition>
      </div>
    );
  }
});