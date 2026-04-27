import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import { HourglassFull } from '@icon-park/vue-next';
import { getTimeCapsule, siteDateStatistics, TimeCapsule } from '@/utils/getTime.ts';
import { useMainStore } from '@/store/index.ts';
import CustomProgress from '@/components/custom/Progress.tsx';
import { cn } from '@/utils/cn';
import styles from './TimeCapsule.module.scss';

export default defineComponent({
  setup() {
    const store = useMainStore();

    // 进度条数据
    const timeData = ref<TimeCapsule>(getTimeCapsule());
    const startDate = ref(import.meta.env.VITE_SITE_START);
    const startDateText = ref<string>("");
    const timeInterval = ref<ReturnType<typeof setInterval> | null>(null);

    onMounted(() => {
      timeInterval.value = setInterval(() => {
        timeData.value = getTimeCapsule();
        if (startDate.value) {
          startDateText.value = siteDateStatistics(new Date(startDate.value));
        }
      }, 1000);
    });

    onBeforeUnmount(() => {
      clearInterval(timeInterval.value === null ? undefined : timeInterval.value);
    });

    return () => (
      <div class={cn(styles.timeCapsule, 'w-full')}>
        <div class={cn(styles.title, 'flex flex-row items-center my-0.5 mb-6 text-1.1rem')}>
          <HourglassFull theme="two-tone" size="24" fill={['#efefef', '#00000020']} />
          <span>时光胶囊</span>
        </div>
        <div v-if={timeData.value} class={styles.allCapsule}>
          {Object.entries(timeData.value).map(([tag, item], index) => (
            <div key={index} class={cn(styles.capsuleItem, 'mb-4')}>
              <div class={cn(styles.itemTitle, 'flex flex-row items-center justify-between my-2 mx-0 text-0.95rem')}>
                <span class={styles.percentage}>
                  {item.name}已度过
                  <strong>{item.passed}</strong>
                  {tag === 'day' ? '小时' : '天'}
                </span>
                <span class={cn(styles.remaining, 'opacity-60 text-0.85rem italic')}>
                  剩余&nbsp;{item.remaining}&nbsp;{tag === 'day' ? '小时' : '天'}
                </span>
              </div>
              <CustomProgress textInside={true} strokeWidth={20} percentage={parseFloat(item.percentage)} />
            </div>
          ))}
          {/* 建站日期 */}
          {store.siteStartShow && (
            <div class={cn(styles.capsuleItem, styles.start, 'mb-0')}>
              <div class={cn(styles.itemTitle, 'justify-center opacity-80 text-0.85rem')}>{startDateText.value}</div>
            </div>
          )}
        </div>
      </div>
    );
  }
});