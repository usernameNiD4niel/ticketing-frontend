"use client";
import { AvailableTabs } from "@/constants/hr/enums";
import useNavigateStore from "@/hooks/hr/useNavigationStore";
import React, { FC, useEffect } from "react";

interface SelectorProps {
  activeTab: AvailableTabs;
}

const Selector: FC<SelectorProps> = ({ activeTab }) => {
  const [setActiveTab] = useNavigateStore((state) => [state.setActiveTab]);

  useEffect(() => {
    setActiveTab(activeTab);
  }, []);
  return <></>;
};

export default Selector;
