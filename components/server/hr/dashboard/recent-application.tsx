import React from "react";
import { cookies } from "next/headers";
import { getRecentApplication } from "@/endpoints";
import RecentApplicationItem from "./recent-application-item";

const RecentApplication = async () => {
  const token = cookies().get("token")?.value;

  const recentApplication = await getRecentApplication(token!);

  return (
    <>
      <h2 className="font-bold text-2xl">Recent Application</h2>
      {recentApplication && recentApplication.length > 0 ? (
        recentApplication.map((application) => (
          <RecentApplicationItem
            date={application.created_at}
            name={application.applicant}
            position={application.position}
            id={application.id}
            key={application.id}
          />
        ))
      ) : (
        <div className="w-full h-[350px] flex items-center justify-center">
          <p className="text-sm">No recent application yet</p>
        </div>
      )}
    </>
  );
};

export default RecentApplication;
