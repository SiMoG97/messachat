import { useEffect } from "react";

export const useCloseWithEscape = (callback: (e: KeyboardEvent) => void) => {
  useEffect(() => {
    window.addEventListener("keydown", callback);
    return () => window.removeEventListener("keydown", callback);
  }, [callback]);
};
