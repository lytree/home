/**
 * 一言
 */
export interface HitokotoResult {
  id?: number;
  hitokoto: string;
  type?: string;
  from?: string;
  from_who?: string;
  creator?: string;
  creator_uid?: number;
  reviewer?: number;
  commit_from?: string;
  created_at?: string;
  length?: number;
}

/**
 * 获取一言数据
 */
export const getHitokoto = async (): Promise<HitokotoResult> => {
  const res = await fetch('https://v1.hitokoto.cn');
  return (await res.json()) as HitokotoResult;
};

export const getIpInfo = async (): Promise<unknown> => {
  const res = await fetch('https://suapi.net/api/ip/ipinfo_pro');
  return await res.json();
};
