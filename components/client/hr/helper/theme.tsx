"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const theme = () => {
  const { theme, systemTheme } = useTheme();

  const [currentTheme, setCurrentTheme] = useState<string>(
    `${theme === "system" ? systemTheme : theme}`
  );

  useEffect(
    () => setCurrentTheme(`${theme === "system" ? systemTheme : theme}`),
    [currentTheme]
  );
  return <div>theme</div>;
};

export default theme;
