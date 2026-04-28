import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import { CurrentTime, getCurrentTime } from '@/utils/getTime.ts';
import Hitokoto from '@/components/Hitokoto.tsx';

export default defineComponent({
  setup() {

    // 当前时间
    const currentTime = ref<CurrentTime>(getCurrentTime());
    const timeInterval = ref(-1);

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
      <div class="flex flex-row items-center h-41.25 justify-between w-full">
        <div class="flex-1 p-1 w-full h-full">
          <Hitokoto />
        </div>
        <div class="flex-1 p-1 max-w-[calc(50%-10px)] w-full h-full">
          <div class="w-full h-full cards p-5 flex flex-col items-center justify-between animate-fade">
            <div class="text-center text-[1.1rem] max-[1280px]:text-base max-[992px]:text-sm">
              <div class="text-ellipsis overflow-x-hidden whitespace-nowrap">
                <span>{currentTime.value.year}&nbsp;年&nbsp;</span>
                <span>{currentTime.value.month}&nbsp;月&nbsp;</span>
                <span>{currentTime.value.day}&nbsp;日&nbsp;</span>
                <span class="max-[910px]:hidden">{currentTime.value.weekday}</span>
              </div>
              <div class="mt-2.5 text-[3.25rem] tracking-[2px] max-[1280px]:text-[2.75rem] max-[992px]:text-[2.5rem]">
                <span> {currentTime.value.hour}:{currentTime.value.minute}:{currentTime.value.second}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});