import { defineVaporComponent, ref, onMounted } from 'vue';
import { getHitokoto, type HitokotoResult } from '@/api';
import { cn } from '@/utils/cn';
import styles from './Hitokoto.module.css';

export default defineVaporComponent({
  setup() {
    const hitokotoData = ref<{ text: string; from: string }>({
      text: '这里应该显示一句话',
      from: '無名',
    });

    const getHitokotoData = async () => {
      try {
        const result = (await getHitokoto()) as HitokotoResult;
        hitokotoData.value = {
          text: result.hitokoto,
          from: result.from ?? '無名',
        };
      } catch {
        hitokotoData.value = {
          text: '这里应该显示一句话',
          from: '無名',
        };
      }
    };

    onMounted(() => {
      getHitokotoData();
    });

    return (
      <div
        class={cn(styles.hitokoto, 'cards w-full h-full')}
        onClick={getHitokotoData}
      >
        <div class={styles.content}>
          <span class={styles.text}>{hitokotoData.value.text}</span>
          <span class={styles.from}>
            -&ldquo;&nbsp;{hitokotoData.value.from}&nbsp;&rdquo;
          </span>
        </div>
      </div>
    );
  },
});
