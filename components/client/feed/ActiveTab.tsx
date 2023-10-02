"use client";

import { AvailableTabs } from "@/constants/enums";
import useNavigationStore from "@/hooks/states/useNavigationStore";
import { useEffect } from "react";

const ActiveTabFeed = () => {
  const [setActiveTab] = useNavigationStore((state) => [state.setActiveTab]);

  useEffect(() => {
    setActiveTab(AvailableTabs.Feed);
  }, []);
  return <div></div>;
};

export default ActiveTabFeed;
