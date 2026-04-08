import { defineStore } from "pinia";
import { computed, ref } from "vue";

// 定义 State 的类型接口
export interface MainState {
  imgLoadStatus: boolean;
  innerWidth: number;
  coverType: string;
  siteStartShow: boolean;
  backgroundShow: boolean;
  boxOpenState: boolean;
  mobileOpenState: boolean;
  mobileFuncState: boolean;
  setOpenState: boolean;
  footerBlur: boolean;
}
export const useMainStore = defineStore("main", () => {
  // --- State ---
  const imgLoadStatus = ref(false);
  const innerWidth = ref<number>(0);
  const coverType = ref("0");
  const siteStartShow = ref(false);
  const backgroundShow = ref(false);
  const boxOpenState = ref(false);
  const mobileOpenState = ref(false);
  const mobileFuncState = ref(false);
  const setOpenState = ref(false);
  const footerBlur = ref(true);

  // --- Getters ---
  const getInnerWidth = computed(() => innerWidth.value);

  // --- Actions ---
  // 更改当前页面宽度
  function setInnerWidth(value: number) {
    innerWidth.value = value;
    if (value >= 720) {
      mobileOpenState.value = false;
      mobileFuncState.value = false;
    }
  }

  // 更改壁纸加载状态
  function setImgLoadStatus(value: boolean) {
    imgLoadStatus.value = value;
  }

  // 返回所有需要暴露的属性和方法
  return {
    imgLoadStatus,
    innerWidth,
    coverType,
    siteStartShow,
    backgroundShow,
    boxOpenState,
    mobileOpenState,
    mobileFuncState,
    setOpenState,
    footerBlur,
    getInnerWidth,
    setInnerWidth,
    setImgLoadStatus,
  };
}, {
  // --- 持久化配置 ---
  // 注意：persist 依然作为第二个参数的对象属性存在
  persist: {
    key: "data",
    storage: window.localStorage,
    paths: [
      "coverType",
      "siteStartShow",
      "footerBlur",
    ],
  },
});