import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Opening a new page should start at the top, not where the last page was scrolled.
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
