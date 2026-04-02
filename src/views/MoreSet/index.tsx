import { defineComponent, ref, computed, reactive, Transition } from 'vue';
import { CloseOne, SettingTwo, GithubOne, AddOne, Bug } from '@icon-park/vue-next';
import { useMainStore } from '@/store/index.ts';
import Set from '@/components/Set.tsx';
import config from '@/../package.json';
import CustomRow from '@/components/custom/Row.tsx';
import CustomCol from '@/components/custom/Col.tsx';
import CustomCard from '@/components/custom/Card.tsx';
import CustomTooltip from '@/components/custom/Tooltip.tsx';
import styles from './index.module.scss';

export default defineComponent({
  setup() {
    const store = useMainStore();
    const closeShow = ref(false);
    
    // 站点链接
    const siteUrl = computed(() => {
      const url = import.meta.env.VITE_SITE_URL;
      if (!url) return 'imsyy.top'.split('.');
      // 判断协议前缀
      if (url.startsWith('http://') || url.startsWith('https://')) {
        const urlFormat = url.replace(/^(https?:\/\/)/, '');
        return urlFormat.split('.');
      }
      return url.split('.');
    });
    
    // 更新日志
    const upData = reactive({
      new: [
        '采用 Vue 进行重构',
        '音乐歌单支持快速自定义',
        '壁纸支持个性化设置',
        '音乐播放器支持音量控制',
      ],
      fix: ['修复天气 API', '时光胶囊显示错误', '移动端动画及细节', '图标更换为 IconPark'],
    });
    
    // 跳转源代码仓库
    const jumpTo = (url) => {
      window.open(url);
    };
    
    return () => (
      <div class={styles.set} onMouseenter={() => (closeShow.value = true)} onMouseleave={() => (closeShow.value = false)} onClick={(e) => e.stopPropagation()}>
        <Transition name="el-fade-in-linear">
          {closeShow.value && (
            <CloseOne
              class={styles.close}
              theme="filled"
              size="28"
              fill="#ffffff60"
              onClick={() => (store.setOpenState = false)}
            />
          )}
        </Transition>
        <CustomRow gutter={40}>
          <CustomCol span={12} class={styles.left}>
            <div class={[styles.logo, 'text-hidden'].join(' ')}>
              <span class={styles.bg}>{siteUrl.value[0]}</span>
              <span class={styles.sm}>.{siteUrl.value[1]}</span>
            </div>
            <div class={styles.version}>
              <div class={styles.num}>v&nbsp;{config.version}</div>
              <CustomTooltip content="Github 源代码仓库" placement="right" showArrow={false}>
                <GithubOne class={styles.github} theme="outline" size="24" onClick={() => jumpTo(config.github)} />
              </CustomTooltip>
            </div>
            <CustomCard class={styles.update}>
              <template v-slot:header>
                <div class={styles.cardHeader}>
                  <span>更新日志</span>
                </div>
              </template>
              <div class={styles.upnote}>
                {upData.new.map((item, index) => (
                  <div key={index} class={styles.uptext}>
                    <AddOne theme="outline" size="22" />
                    {item}
                  </div>
                ))}
                {upData.fix.map((item, index) => (
                  <div key={index} class={styles.uptext}>
                    <Bug theme="outline" size="22" />
                    {item}
                  </div>
                ))}
              </div>
            </CustomCard>
          </CustomCol>
          <CustomCol span={12} class={styles.right}>
            <div class={styles.title}>
              <SettingTwo theme="filled" size="28" fill="#ffffff60" />
              <span class={styles.name}>全局设置</span>
            </div>
            <Set />
          </CustomCol>
        </CustomRow>
      </div>
    );
  }
});