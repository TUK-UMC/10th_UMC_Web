import { useEffect, useRef, useState } from "react";

export default function useThrottle<T>(value: T, delay = 500): T {
  // 1. 상태 변수
  const [throttledValue, setThrottledValue] = useState<T>(value);
  // 2. Red lastExecuted: 마지막으로 실행된 시간을 기록하는 변수
  const lastExecuted = useRef<number>(Date.now());

  // 3. useEffect: value, delay가 변경될 때 실행
  useEffect(() => {
    if (Date.now() >= lastExecuted.current + delay) {
      lastExecuted.current = Date.now();
      setThrottledValue(value);
    } else {
      const timerId = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, delay);
      return () => clearTimeout(timerId);
    }
  }, [value, delay]);

  return throttledValue;
}
