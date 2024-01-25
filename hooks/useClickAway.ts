import { RefObject, useEffect, useRef } from "react";

const defaultEvents = ["mousedown", "touchstart"];

const useClickAway = (
  ref: RefObject<HTMLDivElement>,
  onClickAway: (event: MouseEvent | TouchEvent) => void,
  events = defaultEvents
) => {
  const savedCallback = useRef(onClickAway);
  useEffect(() => {
    savedCallback.current = onClickAway;
  }, [onClickAway]);
  useEffect(() => {
    // @ts-ignore
    const handler = (event) => {
      const { current: el } = ref;
      if (el && !el.contains(event.target)) {
        savedCallback.current(event);
      }
    };
    events.forEach((eventName) => {
      document.addEventListener(eventName, handler);
    });
    return () => {
      events.forEach((eventName) => {
        document.removeEventListener(eventName, handler);
      });
    };
  }, [events, ref]);
};
export default useClickAway;
