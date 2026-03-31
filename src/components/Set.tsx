import { defineComponent, ref, h } from 'vue';
import { CheckSmall, CloseSmall, SuccessPicture } from '@icon-park/vue-next';
import { mainStore } from '@/store';
import { storeToRefs } from 'pinia';
import ElMessage from '@/components/custom/message';
import CustomCollapse from '@/components/custom/Collapse.tsx';
import CustomCollapseItem from '@/components/custom/CollapseItem.tsx';
import CustomRadioGroup from '@/components/custom/RadioGroup.tsx';
import CustomRadio from '@/components/custom/Radio.tsx';
import CustomSwitch from '@/components/custom/Switch.tsx';
import styles from './Set.module.scss';

export default defineComponent({
  setup() {
    const store = mainStore();
    const { coverType, siteStartShow } = storeToRefs(store);
    
    // 默认选中项
    const activeName = ref('1');
    
    // 壁纸切换
    const radioChange = () => {
      ElMessage({
        message: '壁纸更换成功',
        icon: h(SuccessPicture, {
          theme: 'filled',
          fill: '#efefef',
        }),
      });
    };
    
    return () => (
      <div class={styles.setting}>
        <CustomCollapse class={styles.collapse} v-model={activeName.value} accordion>
          <CustomCollapseItem title="个性壁纸" name="1">
            <div class={styles.bgSet}>
              <CustomRadioGroup v-model={coverType.value} textColor="#ffffff" onChange={radioChange}>
                <CustomRadio value="0" size="large" border>默认壁纸</CustomRadio>
                <CustomRadio value="1" size="large" border>每日一图</CustomRadio>
                <CustomRadio value="2" size="large" border>随机风景</CustomRadio>
                <CustomRadio value="3" size="large" border>随机动漫</CustomRadio>
              </CustomRadioGroup>
            </div>
          </CustomCollapseItem>
          <CustomCollapseItem title="个性化调整" name="2">
            <div class={styles.item}>
              <span class={styles.text}>建站日期显示</span>
              <CustomSwitch
                v-model={siteStartShow.value}
                inlinePrompt
                activeIcon={CheckSmall}
                inactiveIcon={CloseSmall}
              />
            </div>
          </CustomCollapseItem>
        </CustomCollapse>
      </div>
    );
  }
});