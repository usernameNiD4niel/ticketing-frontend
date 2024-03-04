import React from "react";
import CardHeader from "./card-header";
import RecentApplication from "./recent-application";
import DashboardManpowerCard from "./dashboard-manpower-card";

const MainContent = () => {
  return (
    <div className="flex w-full gap-5 mt-5 flex-col xl:flex-row">
      <div className="w-full xl:w-[70%] space-y-6">
        <div className="w-full flex flex-col lg:flex-row gap-3">
          <CardHeader />
        </div>
        <div className="w-full rounded-xl space-y-4 bg-white p-6">
          <RecentApplication />
        </div>
      </div>
      <div className="w-full xl:w-[25%] flex gap-2 xl:flex-col flex-wrap">
        <DashboardManpowerCard />
      </div>
    </div>
  );
};

export default MainContent;
