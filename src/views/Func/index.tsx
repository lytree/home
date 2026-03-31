import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import { getCurrentTime } from '@/utils/getTime';
import { mainStore } from '@/store';
import Hitokoto from '@/components/Hitokoto.tsx';
import CustomRow from '@/components/custom/Row.tsx';
import CustomCol from '@/components/custom/Col.tsx';
import styles from './index.module.scss';

export default defineComponent({
  setup() {
    const store = mainStore();
    
    // 当前时间
    const currentTime = ref({});
    const timeInterval = ref(null);
    
    // 更新时间
    const updateTimeData = () => {
      currentTime.value = getCurrentTime();
    };
    
    onMounted(() => {
      updateTimeData();
      timeInterval.value = setInterval(updateTimeData, 1000);
    });
    
    onBeforeUnmount(() => {
      clearInterval(timeInterval.value);
    });
    
    return () => (
      <div class={[styles.function, store.mobileFuncState ? styles.mobile : ''].filter(Boolean).join(' ')}>
        <CustomRow gutter={20}>
          <CustomCol span={12}>
            <div class={styles.left}>
              <Hitokoto />
            </div>
          </CustomCol>
          <CustomCol span={12}>
            <div class={[styles.right, 'cards'].join(' ')}>
              <div class={styles.time}>
                <div class={styles.date}>
                  <span>{currentTime.value.year}&nbsp;年&nbsp;</span>
                  <span>{currentTime.value.month}&nbsp;月&nbsp;</span>
                  <span>{currentTime.value.day}&nbsp;日&nbsp;</span>
                  <span class={styles.smHidden}>{currentTime.value.weekday}</span>
                </div>
                <div class={styles.text}>
                  <span> {currentTime.value.hour}:{currentTime.value.minute}:{currentTime.value.second}</span>
                </div>
              </div>
            </div>
          </CustomCol>
        </CustomRow>
      </div>
    );
  }
});