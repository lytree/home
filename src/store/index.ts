import { defineStore } from "pinia";

// 定义 State 的类型接口
export interface MainState {
  imgLoadStatus: boolean;
  innerWidth: number | null;
  coverType: string;
  siteStartShow: boolean;
  musicClick: boolean;
  musicIsOk: boolean;
  musicVolume: number;
  musicOpenState: boolean;
  backgroundShow: boolean;
  boxOpenState: boolean;
  mobileOpenState: boolean;
  mobileFuncState: boolean;
  setOpenState: boolean;
  playerState: boolean;
  playerTitle: string | null;
  playerArtist: string | null;
  playerLrc: string;
  playerLrcShow: boolean;
  footerBlur: boolean;
  playerAutoplay: boolean;
  playerLoop: "all" | "one" | "none"; // 使用联合类型限制取值
  playerOrder: "list" | "random";     // 使用联合类型限制取值
}

export const useMainStore = defineStore("main", {
  state: (): MainState => {
    return {
      imgLoadStatus: false,
      innerWidth: null,
      coverType: "0",
      siteStartShow: false,
      musicClick: false,
      musicIsOk: false,
      musicVolume: 0,
      musicOpenState: false,
      backgroundShow: false,
      boxOpenState: false,
      mobileOpenState: false,
      mobileFuncState: false,
      setOpenState: false,
      playerState: false,
      playerTitle: null,
      playerArtist: null,
      playerLrc: "歌词加载中",
      playerLrcShow: true,
      footerBlur: true,
      playerAutoplay: false,
      playerLoop: "all",
      playerOrder: "list",
    };
  },
  getters: {
    // 在 TS 中，getter 的第一个参数 state 会被自动推导
    getPlayerLrc(state) {
      return state.playerLrc;
    },
    getPlayerData(state) {
      return {
        name: state.playerTitle,
        artist: state.playerArtist,
      };
    },
    getInnerWidth(state) {
      return state.innerWidth;
    },
  },
  actions: {
    // 更改当前页面宽度
    setInnerWidth(value: number) {
      this.innerWidth = value;
      if (value >= 720) {
        this.mobileOpenState = false;
        this.mobileFuncState = false;
      }
    },
    // 更改播放状态
    setPlayerState(value: boolean) {
      // 保持原代码逻辑：传入 true 则设为 false，传入 false 则设为 true
      this.playerState = !value;
    },
    // 更改歌词
    setPlayerLrc(value: string) {
      this.playerLrc = value;
    },
    // 更改歌曲数据
    setPlayerData(title: string, artist: string) {
      this.playerTitle = title;
      this.playerArtist = artist;
    },
    // 更改壁纸加载状态
    setImgLoadStatus(value: boolean) {
      this.imgLoadStatus = value;
    },
  },
  // 持久化配置 (通常配合 pinia-plugin-persistedstate 使用)
  persist: {
    key: "data",
    storage: window.localStorage,
    paths: [
      "coverType",
      "musicVolume",
      "siteStartShow",
      "musicClick",
      "playerLrcShow",
      "footerBlur",
      "playerAutoplay",
      "playerLoop",
      "playerOrder",
    ],
  },
});