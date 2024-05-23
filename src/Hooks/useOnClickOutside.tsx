import { type RefObject, useEffect } from "react";

export function useOnClickOutside(
  elm: RefObject<HTMLElement>,
  openButton: RefObject<HTMLElement>,
  close: (event: MouseEvent | TouchEvent) => void,
) {
  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      if (openButton.current?.contains(e.target as Node)) return;
      if (elm.current?.contains(e.target as Node)) return;

      close(e);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [elm, openButton, close]);
}
