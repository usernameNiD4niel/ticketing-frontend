"use client";
// useScreenSize.js
import { useState, useEffect } from "react";

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: global.innerWidth,
    height: global.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: global.innerWidth,
        height: global.innerHeight,
      });
    };

    global.addEventListener("resize", handleResize);
    console.log(global);

    // Clean up the event listener when the component unmounts
    return () => {
      global.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
