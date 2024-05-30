import { useEffect } from "react";

export const useCloseWithEscape = (callback: () => void) => {
  useEffect(() => {
    const KeyboardEventHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") callback();
    };
    window.addEventListener("keydown", KeyboardEventHandler);
    return () => window.removeEventListener("keydown", KeyboardEventHandler);
  }, [callback]);
};
