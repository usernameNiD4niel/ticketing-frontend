"use client";

import { AvailableTabs } from "@/constants/enums";
import useNavigationStore from "@/hooks/states/useNavigationStore";
import { useEffect } from "react";

const Code = () => {
  const [setActiveTab] = useNavigationStore((state) => [state.setActiveTab]);

  useEffect(() => {
    setActiveTab(AvailableTabs["Code"]);
  }, []);

  return <div>Code</div>;
};

export default Code;
