import { defineComponent, ref, Transition } from 'vue';
import { CloseOne, SettingTwo } from '@icon-park/vue-next';
import { mainStore } from '@/store';
import TimeCapsule from '@/components/TimeCapsule.tsx';
import MoreContent from '@/components/MoreContent.tsx';
import styles from './index.module.scss';

export default defineComponent({
  setup() {
    const store = mainStore();
    const closeShow = ref(false);
    
    return () => (
      <div class={[styles.box, 'cards'].join(' ')} onMouseenter={() => (closeShow.value = true)} onMouseleave={() => (closeShow.value = false)}>
        <Transition name="el-fade-in-linear">
          {closeShow.value && (
            <CloseOne
              class={styles.close}
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
              class={styles.setting}
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