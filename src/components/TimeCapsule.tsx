import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import { HourglassFull } from '@icon-park/vue-next';
import { getTimeCapsule, siteDateStatistics } from '@/utils/getTime.js';
import { mainStore } from '@/store';
import CustomProgress from '@/components/custom/Progress.tsx';
import styles from './TimeCapsule.module.scss';

export default defineComponent({
  setup() {
    const store = mainStore();
    
    // 进度条数据
    const timeData = ref(getTimeCapsule());
    const startDate = ref(import.meta.env.VITE_SITE_START);
    const startDateText = ref(null);
    const timeInterval = ref(null);
    
    onMounted(() => {
      timeInterval.value = setInterval(() => {
        timeData.value = getTimeCapsule();
        if (startDate.value) startDateText.value = siteDateStatistics(new Date(startDate.value));
      }, 1000);
    });
    
    onBeforeUnmount(() => {
      clearInterval(timeInterval.value);
    });
    
    return () => (
      <div class={styles.timeCapsule}>
        <div class={styles.title}>
          <HourglassFull theme="two-tone" size="24" fill={['#efefef', '#00000020']} />
          <span>时光胶囊</span>
        </div>
        <div v-if={timeData.value} class={styles.allCapsule}>
          {Object.entries(timeData.value).map(([tag, item], index) => (
            <div key={index} class={styles.capsuleItem}>
              <div class={styles.itemTitle}>
                <span class={styles.percentage}>
                  {item.name}已度过
                  <strong>{item.passed}</strong>
                  {tag === 'day' ? '小时' : '天'}
                </span>
                <span class={styles.remaining}>
                  剩余&nbsp;{item.remaining}&nbsp;{tag === 'day' ? '小时' : '天'}
                </span>
              </div>
              <CustomProgress textInside={true} strokeWidth={20} percentage={parseFloat(item.percentage)} />
            </div>
          ))}
          {/* 建站日期 */}
          {store.siteStartShow && (
            <div class={[styles.capsuleItem, styles.start].join(' ')}>
              <div class={styles.itemTitle}>{startDateText.value}</div>
            </div>
          )}
        </div>
      </div>
    );
  }
});