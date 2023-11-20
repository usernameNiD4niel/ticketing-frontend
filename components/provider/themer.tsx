"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Themer() {
  const { theme, systemTheme } = useTheme();

  const [currentTheme, setCurrentTheme] = useState<string>(
    `${theme === "system" ? systemTheme : theme}`
  );

  useEffect(
    () => setCurrentTheme(`${theme === "system" ? systemTheme : theme}`),
    [currentTheme]
  );

  return <></>;
}
