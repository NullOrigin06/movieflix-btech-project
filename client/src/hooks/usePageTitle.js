import { useEffect } from "react";

// Sets the browser tab title for the current page, e.g. "Movies | MovieFlix".
function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | MovieFlix` : "MovieFlix";
  }, [title]);
}

export default usePageTitle;
