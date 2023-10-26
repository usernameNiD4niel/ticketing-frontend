"use client";
import React from "react";
import MenuSheet from "../helper/menu-sheet";
import useNavigateStore from "@/hooks/hr/useNavigationStore";
import { getCurrentTab } from "@/components/client/hr/home/helper/functions";

const ExtenderHeader = () => {
  const [activeTab] = useNavigateStore((state) => [state.activeTab]);
  return (
    <>
      <MenuSheet activeTab={activeTab} />
      <h1 className="text-center font-bold">{getCurrentTab(activeTab)}</h1>
    </>
  );
};

export default ExtenderHeader;
