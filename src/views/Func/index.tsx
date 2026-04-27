import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import { getCurrentTime } from '@/utils/getTime.ts';
import { useMainStore } from '@/store/index.ts';
import Hitokoto from '@/components/Hitokoto.tsx';
import CustomRow from '@/components/custom/Row.tsx';
import CustomCol from '@/components/custom/Col.tsx';
import { cn } from '@/utils/cn';
import styles from './index.module.scss';

export default defineComponent({
  setup() {
    const store = useMainStore();
    
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
      <div class={cn(styles.function, 'flex flex-row items-center h-[165px] justify-between')}>
        <CustomRow gutter={20}>
          <CustomCol span={12}>
            <div class={cn(styles.left, 'w-full h-full')}>
              <Hitokoto />
            </div>
          </CustomCol>
          <CustomCol span={12}>
            <div class={cn(styles.right, 'cards p-5 flex flex-col items-center justify-between')}>
              <div class={cn(styles.time, 'text-center text-1.1rem')}>
                <div class={cn(styles.date, 'text-ellipsis overflow-x-hidden whitespace-nowrap')}>
                  <span>{currentTime.value.year}&nbsp;年&nbsp;</span>
                  <span>{currentTime.value.month}&nbsp;月&nbsp;</span>
                  <span>{currentTime.value.day}&nbsp;日&nbsp;</span>
                  <span class={styles.smHidden}>{currentTime.value.weekday}</span>
                </div>
                <div class={cn(styles.text, 'mt-2.5 text-3.25rem tracking-0.5')}>
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