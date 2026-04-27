import { useState, useEffect } from "react";

export const useWindowHeight = () => {
  const [height, setHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 0,
  );

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // set initial value (important for safety)
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return height;
};
export const useWindowWidth = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // set initial value (important for safety)
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};
