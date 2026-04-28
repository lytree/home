import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MainState {
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
  setInnerWidth: (value: number) => void;
  setImgLoadStatus: (value: boolean) => void;
  setCoverType: (value: string) => void;
  setSiteStartShow: (value: boolean) => void;
  setBackgroundShow: (value: boolean) => void;
  setBoxOpenState: (value: boolean) => void;
  setMobileOpenState: (value: boolean) => void;
  setMobileFuncState: (value: boolean) => void;
  setSetOpenState: (value: boolean) => void;
  setFooterBlur: (value: boolean) => void;
}

export const useMainStore = create<MainState>()(
  persist(
    (set) => ({
      imgLoadStatus: false,
      innerWidth: 0,
      coverType: '0',
      siteStartShow: false,
      backgroundShow: false,
      boxOpenState: false,
      mobileOpenState: false,
      mobileFuncState: false,
      setOpenState: false,
      footerBlur: true,
      setInnerWidth: (value) => {
        set({ innerWidth: value });
        if (value >= 720) {
          set({ mobileOpenState: false, mobileFuncState: false });
        }
      },
      setImgLoadStatus: (value) => set({ imgLoadStatus: value }),
      setCoverType: (value) => set({ coverType: value }),
      setSiteStartShow: (value) => set({ siteStartShow: value }),
      setBackgroundShow: (value) => set({ backgroundShow: value }),
      setBoxOpenState: (value) => set({ boxOpenState: value }),
      setMobileOpenState: (value) => set({ mobileOpenState: value }),
      setMobileFuncState: (value) => set({ mobileFuncState: value }),
      setSetOpenState: (value) => set({ setOpenState: value }),
      setFooterBlur: (value) => set({ footerBlur: value }),
    }),
    {
      name: 'main-storage',
      partialize: (state) => ({
        coverType: state.coverType,
        siteStartShow: state.siteStartShow,
        footerBlur: state.footerBlur,
      }),
    }
  )
);