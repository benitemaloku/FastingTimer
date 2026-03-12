import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
  const times = useLocation();

  useEffect(() => {
    if (!times.hash) return;

    const id = times.hash.slice(1);

    const scrollToElement = () => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    const timer = setTimeout(scrollToElement, 100);

    return () => clearTimeout(timer);
  }, [times.hash]);

  return null;
}