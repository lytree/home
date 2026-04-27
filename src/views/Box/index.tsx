import { defineComponent, ref, Transition } from 'vue';
import { CloseOne, SettingTwo } from '@icon-park/vue-next';
import { useMainStore } from '@/store/index.ts';
import TimeCapsule from '@/components/TimeCapsule.tsx';
import MoreContent from '@/components/MoreContent.tsx';
import styles from './index.module.scss';

export default defineComponent({
  setup() {
    const store = useMainStore();
    const closeShow = ref(false);
    
    return () => (
      <div class={[styles.box, 'cards relative'].join(' ')} onMouseenter={() => (closeShow.value = true)} onMouseleave={() => (closeShow.value = false)}>
        <Transition name="el-fade-in-linear">
          {closeShow.value && (
            <CloseOne
              class={[styles.close, 'absolute top-[14px] right-[14px] w-7 h-7'].join(' ')}
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
              class={[styles.setting, 'absolute top-[14px] right-[56px] w-7 h-7'].join(' ')}
              theme="filled"
              size="28"
              fill="#ffffff60"
              onClick={() => (store.setOpenState = true)}
            />
          )}
        </Transition>
        <div class={styles.content}>
          {/* 可在此处自定义任意内容 */}
          <TimeCapsule />
          <MoreContent />
        </div>
      </div>
    );
  }
});