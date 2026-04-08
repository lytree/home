import { h, VNode } from "vue";
import { SpaCandle } from "@icon-park/vue-next";
import dayjs from "dayjs";
import ElMessage from "@/components/custom/message";
// --- Interfaces ---

export interface CurrentTime {
  year: number;
  month: string | number;
  day: string | number;
  hour: string | number;
  minute: string | number;
  second: string | number;
  weekday: string;
}

export interface TimeCapsuleData {
  name: string;
  total: number;
  passed: number;
  remaining: number;
  percentage: string;
}

export interface TimeCapsule {
  day: TimeCapsuleData;
  week: TimeCapsuleData;
  month: TimeCapsuleData;
  year: TimeCapsuleData;
}

// --- Functions ---

/**
 * 时钟: 获取当前详细时间
 */
export const getCurrentTime = (): CurrentTime => {
  const time = new Date();
  const year = time.getFullYear();
  // 使用 padStart 简化补零逻辑
  const format = (num: number): string => num.toString().padStart(2, "0");

  const weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

  return {
    year,
    month: format(time.getMonth() + 1),
    day: format(time.getDate()),
    hour: format(time.getHours()),
    minute: format(time.getMinutes()),
    second: format(time.getSeconds()),
    weekday: weekday[time.getDay()],
  };
};

/**
 * 时光胶囊: 计算进度的逻辑
 */
export const getTimeCapsule = (): TimeCapsule => {
  const now = dayjs();
  const dayText: Record<string, string> = {
    day: "今日",
    week: "本周",
    month: "本月",
    year: "本年",
  };

  const getDifference = (unit: "day" | "week" | "month" | "year"): TimeCapsuleData => {
    const start = now.startOf(unit);
    const end = now.endOf(unit);

    // 计算单位逻辑
    const diffUnit = unit === "day" ? "hour" : "day";
    const total = end.diff(start, diffUnit) + 1;
    let passed = now.diff(start, diffUnit);

    if (unit === "week") {
      passed = (passed + 6) % 7;
    }

    const remaining = total - passed;
    const percentage = (passed / total) * 100;

    return {
      name: dayText[unit],
      total,
      passed,
      remaining,
      percentage: percentage.toFixed(2),
    };
  };

  return {
    day: getDifference("day"),
    week: getDifference("week"),
    month: getDifference("month"),
    year: getDifference("year"),
  };
};

/**
 * 欢迎提示
 */
export const helloInit = (): void => {
  const hour = new Date().getHours();
  let hello: string;

  if (hour < 6) hello = "凌晨好";
  else if (hour < 9) hello = "早上好";
  else if (hour < 12) hello = "上午好";
  else if (hour < 14) hello = "中午好";
  else if (hour < 17) hello = "下午好";
  else if (hour < 19) hello = "傍晚好";
  else if (hour < 22) hello = "晚上好";
  else hello = "夜深了";

  ElMessage({
    dangerouslyUseHTMLString: true,
    message: `<strong>${hello}</strong> 欢迎来到我的主页`,
  });
};

/**
 * 默哀模式
 */
const anniversaries: Record<string, string> = {
  "4.4": "清明节",
  "5.12": "汶川大地震纪念日",
  "7.7": "中国人民抗日战争纪念日",
  "9.18": "九·一八事变纪念日",
  "12.13": "南京大屠杀死难者国家公祭日",
};

export const checkDays = (): void => {
  const myDate = new Date();
  const mon = myDate.getMonth() + 1;
  const date = myDate.getDate();
  const key = `${mon}.${date}`;

  if (Object.prototype.hasOwnProperty.call(anniversaries, key)) {
    console.log(`今天是${anniversaries[key]}`);
    const gray = document.createElement("style");
    gray.innerHTML = "html{filter: grayscale(100%)}";
    document.head.appendChild(gray);

    ElMessage({
      message: `今天是${anniversaries[key]}`,
      duration: 14000,
      icon: h(SpaCandle, { theme: "filled", fill: "#efefef" }) as VNode,
    });
  }
};

/**
 * 建站日期统计
 */
export const siteDateStatistics = (startDate: Date): string => {
  const currentDate = new Date();
  let years = currentDate.getFullYear() - startDate.getFullYear();
  let months = currentDate.getMonth() - startDate.getMonth();
  let days = currentDate.getDate() - startDate.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return `本站已经苟活了 ${years} 年 ${months} 月 ${days} 天`;
};