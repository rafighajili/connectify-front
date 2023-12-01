import { useEffect, useRef, useState } from "react";

export function useOffsetTopCalculator<T extends HTMLElement>() {
  const targetRef = useRef<T>(null);
  const [targetOffsetTop, setTargetOffsetTop] = useState<number>(0);

  useEffect(() => {
    setTargetOffsetTop(targetRef.current?.offsetTop ?? 0);
  }, []);

  return { targetRef, targetOffsetTop };
}
