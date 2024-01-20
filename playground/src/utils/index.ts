export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  let timeout: number = 0;

  const debounced = (...args: any[]) => {
    (clearTimeout as typeof window.clearTimeout)(timeout);
    timeout = (setTimeout as typeof window.setTimeout)(
      () => func(...args),
      waitFor
    );
  };

  return debounced as unknown as (...args: Parameters<F>) => ReturnType<F>;
};

export type ThrottledFunction<T extends (...args: any) => any> = (
  ...args: Parameters<T>
) => ReturnType<T>;
export function throttle<T extends (...args: any) => any>(
  func: T,
  limit: number
): ThrottledFunction<T> {
  let inThrottle: boolean;
  let lastResult: ReturnType<T>;

  return function (this: any): ReturnType<T> {
    const args = arguments;
    const context = this;

    if (!inThrottle) {
      inThrottle = true;

      setTimeout(() => (inThrottle = false), limit);

      lastResult = func.apply(context, args);
    }

    return lastResult;
  };
}
