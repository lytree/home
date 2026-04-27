import { defineComponent, ref, reactive, onMounted, h, Transition } from 'vue';
import { Error } from '@icon-park/vue-next';
//@ts-ignore
import { getHitokoto } from '@/api';
//@ts-ignore
import { useMainStore } from '@/store/index.ts';
import debounce from '@/utils/debounce.ts';
import ElMessage from '@/components/custom/message';
import styles from './Hitokoto.module.scss';

export default defineComponent({
  setup() {
    const store = useMainStore();

    // 开启音乐面板按钮显隐
    const openMusicShow = ref(false);

    // 一言数据
    const hitokotoData = reactive({
      text: '这里应该显示一句话',
      from: '無名',
    });

    // 获取一言数据
    const getHitokotoData = async () => {
      try {
        const result = await getHitokoto();
        hitokotoData.text = result.hitokoto;
        hitokotoData.from = result.from;
      } catch (error) {
        ElMessage({
          message: '一言获取失败',
          icon: h(Error, {
            theme: 'filled',
            fill: '#efefef',
          }),
        });
        hitokotoData.text = '这里应该显示一句话';
        hitokotoData.from = '無名';
      }
    };

    // 更新一言数据
    const updateHitokoto = () => {
      // 防抖
      debounce(() => {
        getHitokotoData();
      }, 500);
    };

    onMounted(() => {
      getHitokotoData();
    });

    return () => (
      <div
        class={[styles.hitokoto, 'cards w-full h-full'].join(' ')}
        style={{ display: store.musicOpenState ? 'none' : 'flex' }}
        onMouseenter={() => (openMusicShow.value = true)}
        onMouseleave={() => (openMusicShow.value = false)}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 一言内容 */}
        <Transition name="el-fade-in-linear" mode="out-in">
          <div key={hitokotoData.text} class={styles.content} onClick={updateHitokoto}>
            <span class={styles.text}>{hitokotoData.text}</span>
            <span class={styles.from}>-「&nbsp;{hitokotoData.from}&nbsp;」</span>
          </div>
        </Transition>
      </div>
    );
  }
});