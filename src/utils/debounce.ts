// 防抖
let timeout;

/**
 * 防抖函数
 * @param func 执行函数
 * @param wait 延迟时间 (ms)
 * @param immediate 是否立即执行
 */
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number = 300,
  immediate: boolean = false
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: Parameters<T>): void {
    const context = this;

    // 清除定时器
    if (timeout !== null) {
      clearTimeout(timeout);
    }

    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      
      if (callNow) {
        func.apply(context, args);
      }
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  };
}

export default debounce;
