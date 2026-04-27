import { defineComponent, ref, Transition } from 'vue';
import { CloseOne, SettingTwo } from '@icon-park/vue-next';
import { useMainStore } from '@/store/index.ts';
import TimeCapsule from '@/components/TimeCapsule.tsx';
import MoreContent from '@/components/MoreContent.tsx';
import { cn } from '@/utils/cn';
import styles from './index.module.scss';

export default defineComponent({
  setup() {
    const store = useMainStore();
    const closeShow = ref(false);
    
    return () => (
      <div class={cn(styles.box, 'cards relative flex-1 ml-3 h-4/5 max-w-[50%]')} onMouseenter={() => (closeShow.value = true)} onMouseleave={() => (closeShow.value = false)}>
        <Transition name="el-fade-in-linear">
          {closeShow.value && (
            <CloseOne
              class={cn(styles.close, 'absolute top-3.5 right-3.5 w-7 h-7')}
              theme="filled"
              size="28"
              fill="#ffffff60"
              onClick={() => (store.boxOpenState = false)}
            />
          )}
        </Transition>
        <Transition name="el-fade-in-linear">
          {closeShow.value && (
            <SettingTwo
              class={cn(styles.setting, 'absolute top-3.5 right-14 w-7 h-7')}
              theme="filled"
              size="28"
              fill="#ffffff60"
              onClick={() => (store.setOpenState = true)}
            />
          )}
        </Transition>
        <div class={cn(styles.content, 'flex flex-col p-7.5 w-full h-full')}>
          {/* 可在此处自定义任意内容 */}
          <TimeCapsule />
          <MoreContent />
        </div>
      </div>
    );
  }
});