import { defineVaporComponent, ref, onMounted, onUnmounted, type PropType } from 'vue';
import { useMainStore } from '@/store';
import { cn } from '@/utils/cn';
import styles from './Background.module.css';

const BG_COUNT = 10;

export default defineVaporComponent({
  props: {
    onLoadComplete: {
      type: Function as unknown as PropType<(() => void) | null>,
      default: null,
    },
  },
  setup(props) {
    const store = useMainStore();

    const bgUrlValue = ref('');
    const imgTimeoutValue = ref<number | undefined>(undefined);

    onMounted(() => {
      const idx = Math.floor(Math.random() * BG_COUNT) + 1;
      bgUrlValue.value = `/images/background${idx}.jpg`;
    });

    const imgLoadComplete = () => {
      const timeout = window.setTimeout(
        () => {
          store.setImgLoadStatus(true);
        },
        Math.floor(Math.random() * (600 - 300 + 1)) + 300,
      );
      imgTimeoutValue.value = timeout;
    };

    /** 只响应壁纸层的入场动画，避免 kenburns 的每次循环都触发 */
    const enterAnimationEnd = (event: Event) => {
      if (event.target !== event.currentTarget) return;
      props.onLoadComplete?.();
    };

    onUnmounted(() => {
      if (imgTimeoutValue.value) {
        clearTimeout(imgTimeoutValue.value);
      }
    });

    return (
      <div class={cn(styles.root, store.backgroundShow && styles.solo)} aria-hidden="true">
        <div class={styles.film} onAnimationend={enterAnimationEnd}>
          {bgUrlValue.value ? (
            <img class={styles.image} src={bgUrlValue.value} alt="" onLoad={imgLoadComplete} />
          ) : null}
        </div>
        <div class={styles.tint} />
        <div class={styles.glow} />
        <div class={styles.vignette} />
        <div class={styles.grain} />
        <div class={cn(styles.scan, 'hidden md:block')} />
      </div>
    );
  },
});
