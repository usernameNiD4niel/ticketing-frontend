"use client";

import { AvailableTabs } from "@/constants/enums";
import useNavigationStore from "@/hooks/states/useNavigationStore";
import { useEffect } from "react";

interface TabMutatorProps {
  availableTab: AvailableTabs;
}

export default function TabMutator({ availableTab }: TabMutatorProps) {
  const [setActiveTab] = useNavigationStore((state) => [state.setActiveTab]);

  useEffect(() => {
    setActiveTab(availableTab);
  }, []);

  return <div></div>;
}
