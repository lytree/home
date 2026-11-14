import { defineVaporComponent, ref, computed, onMounted, onUnmounted } from 'vue';
import { getCurrentTime, siteDateStatistics, type CurrentTime } from '@/utils/getTime';
import styles from './Func.module.css';

/** 一天 24 格的刻度 */
const TICKS = Array.from({ length: 24 }, (_, i) => i);

export default defineVaporComponent({
  setup() {
    const currentTime = ref<CurrentTime>(getCurrentTime());

    const rawStart = import.meta.env.VITE_SITE_START ?? '';
    const startDate = rawStart && !Number.isNaN(Date.parse(rawStart)) ? new Date(rawStart) : null;
    const uptime = startDate ? siteDateStatistics(startDate) : '';

    /** 今日进度：0 点到现在占一整天的百分比 */
    const dayPercent = computed(() => {
      const t = currentTime.value;
      const seconds = Number(t.hour) * 3600 + Number(t.minute) * 60 + Number(t.second);
      return (seconds / 86400) * 100;
    });

    const dayPercentText = computed(() => dayPercent.value.toFixed(1));
    const currentHour = computed(() => Number(currentTime.value.hour));

    let timer: ReturnType<typeof setInterval> | undefined;

    onMounted(() => {
      timer = setInterval(() => {
        currentTime.value = getCurrentTime();
      }, 1000);
    });

    onUnmounted(() => {
      if (timer) {
        clearInterval(timer);
      }
    });

    return (
      <section class={styles.clock}>
        <header class={styles.head}>
          <span class={styles.idx}>02</span>
          <span class={styles.label}>Now</span>
          <span class={styles.loc}>GMT+8</span>
        </header>

        <div class={styles.body}>
          <div class={styles.timeRow}>
            <span class={styles.time}>
              {currentTime.value.hour}
              <i class={styles.colon}>:</i>
              {currentTime.value.minute}
            </span>
            <span class={styles.seconds}>{currentTime.value.second}</span>
          </div>

          <div class={styles.dateRow}>
            <span>
              {currentTime.value.year} / {currentTime.value.month} / {currentTime.value.day}
            </span>
            <span class={styles.weekday}>{currentTime.value.weekday}</span>
          </div>

          <div class={styles.progress}>
            <div class={styles.progressMeta}>
              <span>今日已过</span>
              <span>{dayPercentText.value}%</span>
            </div>
            <div class={styles.track}>
              <span class={styles.fill} style={{ width: `${dayPercentText.value}%` }} />
            </div>
            <div class={styles.ticks}>
              {TICKS.map((tick) => (
                <i class={tick < currentHour.value ? styles.tickOn : undefined} />
              ))}
            </div>
          </div>

          {uptime ? <p class={styles.uptime}>{uptime}</p> : null}
        </div>
      </section>
    );
  },
});
