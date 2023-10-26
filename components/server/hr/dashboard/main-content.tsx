import React from "react";
import CardHeader from "./card-header";
import RecentApplicationItem from "./recent-application-item";
import DashboardManpowerCard from "./dashboard-manpower-card";

const MainContent = () => {
  return (
    <div className="flex w-full gap-5 mt-5 flex-col xl:flex-row">
      <div className="w-full xl:w-[70%] space-y-6">
        <div className="w-full flex flex-col lg:flex-row gap-3">
          <CardHeader
            count={12}
            tag="Sourcing Position"
            url_button="/hr/dashboard/sourcing-position"
          />
          <CardHeader
            count={12}
            tag="For Interview"
            url_button="/hr/dashboard/for-interview"
          />
          <CardHeader
            count={12}
            tag="Hire Cancel"
            url_button="/hr/dashboard/hire-cancel"
          />
        </div>
        <div className="w-full rounded-xl space-y-4 bg-white p-6">
          <h2 className="font-bold text-2xl">Recent Application</h2>
          <RecentApplicationItem
            date="11 . 12 .2023"
            name="Juan Dela Cruz"
            position="Web Developer"
            key={"RecentApplicationItemMainContent1"}
          />
          <RecentApplicationItem
            date="11 . 12 .2023"
            name="Juan Dela Cruz"
            position="Web Developer"
            key={"RecentApplicationItemMainContent2"}
          />
          <RecentApplicationItem
            date="11 . 12 .2023"
            name="Juan Dela Cruz"
            position="Web Developer"
            key={"RecentApplicationItemMainContent3"}
          />
          <RecentApplicationItem
            date="11 . 12 .2023"
            name="Juan Dela Cruz"
            position="Web Developer"
            key={"RecentApplicationItemMainContent4"}
          />
          <RecentApplicationItem
            date="11 . 12 .2023"
            name="Juan Dela Cruz"
            position="Web Developer"
            key={"RecentApplicationItemMainContent5"}
          />
        </div>
      </div>
      <div className="w-full xl:w-[25%] flex gap-2 xl:flex-col flex-wrap">
        <DashboardManpowerCard
          date="10 . 11 . 2023"
          department="TENDER"
          id="1"
          message="Daniel request 1 manpower for their department. "
        />
        <DashboardManpowerCard
          date="10 . 11 . 2023"
          department="TENDER"
          id="1"
          message="Daniel request 1 manpower for their department. "
        />
        <DashboardManpowerCard
          date="10 . 11 . 2023"
          department="TENDER"
          id="1"
          message="Daniel request 1 manpower for their department. "
        />
      </div>
    </div>
  );
};

export default MainContent;
