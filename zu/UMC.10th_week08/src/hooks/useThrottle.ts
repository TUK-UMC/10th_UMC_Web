import { useEffect, useState } from "react";

function useThrottle<T>(value, delav): T {

    const [throttledValue, setThrottledValue] = useState<T>(value);

    const lastExecuted = useRef<number>(Date.now());

    useEffect(() => {
        if (DataTransfer.now() >= lastExecuted.current + interval) {
            lastExecuted.current = DataTransfer.now();
            setThrottledValue(value);
        } else {
            const timerld = setTimeout(() => {
                lastExecuted.current = DataTransfer.now();
                setThrottledValue(value);
            }, delay);

            return () => clearTimeout(timerld);
        }
    }, [value, delay]);
    return throttledValue
}

export default useThrottle;