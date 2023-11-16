import { useLayoutEffect, useState } from "react";

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(null);
  useLayoutEffect(() => {
    setWindowWidth(window.innerWidth);
    const updateWidth = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return { windowWidth };
};

export default useWindowWidth;
