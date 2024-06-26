import { useEffect } from "react";

export function useRemoveWeirdFbUrlString() {
  useEffect(() => {
    if (!window.location.hash || window.location.hash !== "#_=_") return;
    if (window.history?.replaceState)
      return window.history.replaceState(
        "",
        document.title,
        window.location.pathname + window.location.search,
      );
    // Prevent scrolling by storing the page's current scroll offset
    const scroll = {
      top: document.body.scrollTop,
      left: document.body.scrollLeft,
    };
    window.location.hash = "";
    // Restore the scroll offset, should be flicker free
    document.body.scrollTop = scroll.top;
    document.body.scrollLeft = scroll.left;
  }, []);
}
