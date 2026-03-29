<template>
  <div class="setting">
    <CustomCollapse class="collapse" v-model="activeName" accordion>
      <CustomCollapseItem title="个性壁纸" name="1">
        <div class="bg-set">
          <CustomRadioGroup v-model="coverType" text-color="#ffffff" @change="radioChange">
            <CustomRadio value="0" size="large" border>默认壁纸</CustomRadio>
            <CustomRadio value="1" size="large" border>每日一图</CustomRadio>
            <CustomRadio value="2" size="large" border>随机风景</CustomRadio>
            <CustomRadio value="3" size="large" border>随机动漫</CustomRadio>
          </CustomRadioGroup>
        </div>
      </CustomCollapseItem>
      <CustomCollapseItem title="个性化调整" name="2">
        <div class="item">
          <span class="text">建站日期显示</span>
          <CustomSwitch
            v-model="siteStartShow"
            inline-prompt
            :active-icon="CheckSmall"
            :inactive-icon="CloseSmall"
          />
        </div>
        <div class="item">
          <span class="text">音乐点击是否打开面板</span>
          <CustomSwitch
            v-model="musicClick"
            inline-prompt
            :active-icon="CheckSmall"
            :inactive-icon="CloseSmall"
          />
        </div>
        <div class="item">
          <span class="text">底栏歌词显示</span>
          <CustomSwitch
            v-model="playerLrcShow"
            inline-prompt
            :active-icon="CheckSmall"
            :inactive-icon="CloseSmall"
          />
        </div>
        <div class="item">
          <span class="text">底栏背景模糊</span>
          <CustomSwitch
            v-model="footerBlur"
            inline-prompt
            :active-icon="CheckSmall"
            :inactive-icon="CloseSmall"
          />
        </div>
      </CustomCollapseItem>
      <CustomCollapseItem title="播放器配置" name="3">
        <div class="item">
          <span class="text">自动播放</span>
          <CustomSwitch
            v-model="playerAutoplay"
            inline-prompt
            :active-icon="CheckSmall"
            :inactive-icon="CloseSmall"
          />
        </div>
        <div class="item">
          <span class="text">随机播放</span>
          <CustomSwitch
            v-model="playerOrder"
            inline-prompt
            :active-icon="CheckSmall"
            :inactive-icon="CloseSmall"
            active-value="random"
            inactive-value="list"
          />
        </div>
        <div class="item">
          <span class="text">循环模式</span>
          <CustomRadioGroup v-model="playerLoop" size="small" text-color="#FFFFFF">
            <CustomRadio value="all" border>列表</CustomRadio>
            <CustomRadio value="one" border>单曲</CustomRadio>
            <CustomRadio value="none" border>不循环</CustomRadio>
          </CustomRadioGroup>
        </div>
      </CustomCollapseItem>
      <CustomCollapseItem title="其他设置" name="4">
        <div>设置内容待增加</div>
      </CustomCollapseItem>
    </CustomCollapse>
  </div>
</template>

<script setup>
import { CheckSmall, CloseSmall, SuccessPicture } from "@icon-park/vue-next";
import { mainStore } from "@/store";
import { storeToRefs } from "pinia";
import ElMessage from "@/components/custom/message";
import CustomCollapse from "@/components/custom/Collapse.vue";
import CustomCollapseItem from "@/components/custom/CollapseItem.vue";
import CustomRadioGroup from "@/components/custom/RadioGroup.vue";
import CustomRadio from "@/components/custom/Radio.vue";
import CustomSwitch from "@/components/custom/Switch.vue";

const store = mainStore();
const {
  coverType,
  siteStartShow,
  musicClick,
  playerLrcShow,
  footerBlur,
  playerAutoplay,
  playerOrder,
  playerLoop,
} = storeToRefs(store);

// 默认选中项
const activeName = ref("1");

// 壁纸切换
const radioChange = () => {
  ElMessage({
    message: "壁纸更换成功",
    icon: h(SuccessPicture, {
      theme: "filled",
      fill: "#efefef",
    }),
  });
};
</script>

<style lang="scss" scoped>
.setting {
  .collapse {
    border-radius: 8px;
    overflow: hidden;

    .custom-collapse-item {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);

      &:first-child {
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }

      .collapse-item-header {
        background-color: #ffffff30;
        color: #fff;
        font-size: 15px;
        padding-left: 18px;
      }

      .collapse-item-content {
        padding: 20px;
        .item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          font-size: 14px;
        }

        .custom-radio-group {
          justify-content: space-between;

          .custom-radio {
            margin: 10px 16px;
            background: #ffffff26;
            border: 2px solid transparent;
            border-radius: 8px;

            .radio-label {
              color: #fff;
            }

            &.radio-checked {
              background: #ffffff06 !important;
              border: 2px solid #eeeeee !important;
            }
          }
        }
      }
    }
  }
}
</style>
