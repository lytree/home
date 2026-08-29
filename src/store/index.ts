import { defineStore } from 'pinia';
import { ref } from 'vue';

const PERSIST_KEY = 'main-storage';

interface PersistedState {
  coverType: string;
  siteStartShow: boolean;
  footerBlur: boolean;
}

const loadPersisted = (): Partial<PersistedState> => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(PERSIST_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as PersistedState;
  } catch {
    return {};
  }
};

const persistState = (state: PersistedState) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(PERSIST_KEY, JSON.stringify(state));
};

export const useMainStore = defineStore('main', () => {
  const persisted = loadPersisted();

  const imgLoadStatus = ref(false);
  const innerWidth = ref(0);
  const coverType = ref(persisted.coverType ?? '0');
  const siteStartShow = ref(persisted.siteStartShow ?? false);
  const backgroundShow = ref(false);
  const boxOpenState = ref(false);
  const mobileOpenState = ref(false);
  const mobileFuncState = ref(false);
  const setOpenState = ref(false);
  const footerBlur = ref(persisted.footerBlur ?? true);

  const setInnerWidth = (value: number) => {
    innerWidth.value = value;
    if (value >= 720) {
      mobileOpenState.value = false;
      mobileFuncState.value = false;
    }
  };

  const setImgLoadStatus = (value: boolean) => {
    imgLoadStatus.value = value;
  };

  const setCoverType = (value: string) => {
    coverType.value = value;
    persist();
  };

  const setSiteStartShow = (value: boolean) => {
    siteStartShow.value = value;
    persist();
  };

  const setBackgroundShow = (value: boolean) => {
    backgroundShow.value = value;
  };

  const setBoxOpenState = (value: boolean) => {
    boxOpenState.value = value;
  };

  const setMobileOpenState = (value: boolean) => {
    mobileOpenState.value = value;
  };

  const setMobileFuncState = (value: boolean) => {
    mobileFuncState.value = value;
  };

  const setSetOpenState = (value: boolean) => {
    setOpenState.value = value;
  };

  const setFooterBlur = (value: boolean) => {
    footerBlur.value = value;
    persist();
  };

  const persist = () => {
    persistState({
      coverType: coverType.value,
      siteStartShow: siteStartShow.value,
      footerBlur: footerBlur.value,
    });
  };

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
    setInnerWidth,
    setImgLoadStatus,
    setCoverType,
    setSiteStartShow,
    setBackgroundShow,
    setBoxOpenState,
    setMobileOpenState,
    setMobileFuncState,
    setSetOpenState,
    setFooterBlur,
  };
});
