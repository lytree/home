import { defineVaporComponent, ref, onMounted, onUnmounted, type PropType } from 'vue';
import { useMainStore } from '@/store';

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
      console.log('图片加载完成');
      const timeout = window.setTimeout(
        () => {
          store.setImgLoadStatus(true);
        },
        Math.floor(Math.random() * (600 - 300 + 1)) + 300,
      );
      imgTimeoutValue.value = timeout;
    };

    const imgAnimationEnd = () => {
      console.log('壁纸动画完成');
      props.onLoadComplete?.();
    };

    onUnmounted(() => {
      if (imgTimeoutValue.value) {
        clearTimeout(imgTimeoutValue.value);
      }
    });

    return (
      <div
        class="absolute top-0 left-0 w-full h-full transition-all z-[-1]"
        style={{
          backfaceVisibility: 'hidden',
          filter: 'blur(20px) brightness(0.3)',
          transition: 'filter 0.3s, transform 0.3s',
          animation: 'fade-blur-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
          animationDelay: '0.45s',
        }}
      >
        {bgUrlValue.value ? (
          <img
            src={bgUrlValue.value}
            class="absolute top-0 left-0 w-full h-full object-cover blur-20 brightness-50"
            style={{
              animation: 'fade-blur-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
            }}
            alt="cover"
            onLoad={imgLoadComplete}
            onAnimationend={imgAnimationEnd}
          />
        ) : null}
      </div>
    );
  },
});
