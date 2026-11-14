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
    const loading = ref(false);

    const getHitokotoData = async () => {
      if (loading.value) return;
      loading.value = true;
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
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      getHitokotoData();
    });

    return (
      <section class={styles.note}>
        <header class={styles.head}>
          <span class={styles.idx}>03</span>
          <span class={styles.label}>Note</span>
          <button
            type="button"
            class={cn(styles.refresh, loading.value && styles.loading)}
            onClick={getHitokotoData}
            aria-label="换一句"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M21 12a9 9 0 1 1-2.64-6.36" />
              <path d="M21 3v6h-6" />
            </svg>
          </button>
        </header>

        <button type="button" class={styles.body} onClick={getHitokotoData} aria-label="换一句">
          <p class={cn(styles.text, loading.value && styles.dim)}>{hitokotoData.value.text}</p>
          <span class={styles.footer}>
            <span class={styles.from}>— {hitokotoData.value.from}</span>
            <span class={styles.hint}>点击换一句</span>
          </span>
        </button>
      </section>
    );
  },
});
