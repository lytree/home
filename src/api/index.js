// import axios from "axios";

/**
 * 一言
 */

// 获取一言数据
export const getHitokoto = async () => {
  const res = await fetch("https://v1.hitokoto.cn");
  return await res.json();
};

export const getIpInfo = async () => {
  const res = await fetch(`https://suapi.net/api/ip/ipinfo_pro`);
  return await res.json();
};
