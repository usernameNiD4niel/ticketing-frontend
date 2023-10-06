"use client";
import React from "react";
import useNavigationStore from "@/hooks/states/useNavigationStore";
import { AvailableTabs } from "@/constants/enums";
import { useEffect } from "react";
import CreateTickets from "@/components/server/overview/create-tickets";

const Overview = () => {
  const setActiveTab = useNavigationStore((state) => state.setActiveTab);
  useEffect(() => {
    setActiveTab(AvailableTabs.Overview);
  }, []);
  return (
    <>
      {/* <ActiveTab /> */}
      <div className="flex flex-col gap-3">
        <CreateTickets />
      </div>
    </>
  );
};

export default Overview;
