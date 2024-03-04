import Selector from "@/components/client/hr/tab-mutator/selector";
import HeaderPage from "@/components/server/hr/dashboard/header-page";
import MainContent from "@/components/server/hr/dashboard/main-content";
import { AvailableTabs } from "@/constants/hr/enums";
import React from "react";

const Dashboard = async () => {
  return (
    <div className="flex items-center">
      <Selector activeTab={AvailableTabs.Dashboard} />
      <div className="w-full p-6">
        <HeaderPage />
        <MainContent />
      </div>
    </div>
  );
};

export default Dashboard;
