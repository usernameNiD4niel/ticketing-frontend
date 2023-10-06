"use client";
import { AvailableTabs } from "@/constants/enums";
import useNavigationStore from "@/hooks/states/useNavigationStore";
import React, { useEffect } from "react";

const ActiveTab = () => {
  const setActiveTab = useNavigationStore((state) => state.setActiveTab);
  useEffect(() => {
    setActiveTab(AvailableTabs.Overview);
  }, []);
  return <div></div>;
};

export default ActiveTab;
