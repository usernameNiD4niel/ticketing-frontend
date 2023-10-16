"use client";
import { AvailableTabs } from "@/constants/enums";
import useNavigationStore from "@/hooks/states/useNavigationStore";
import React, { useEffect } from "react";

const Tabs = () => {
  const [setActiveTab] = useNavigationStore((state) => [state.setActiveTab]);

  useEffect(() => {
    setActiveTab(AvailableTabs["Code"]);
  }, []);
  return <div></div>;
};

export default Tabs;
