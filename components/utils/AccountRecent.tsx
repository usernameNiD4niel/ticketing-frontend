"use client";
import Cookies from "js-cookie";
import { TicketContent } from "@/constants/types";
import React, { useEffect, useState } from "react";
import CardAccount from "./CardAccount";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/navigation";

const AccountRecent = () => {
  const { getUserRecentActivities } = useAuth();

  const token = Cookies.get("token");
  const email = Cookies.get("email");

  const [activities, setActivities] = useState<TicketContent[]>([]);
  const [error, setError] = useState();

  const router = useRouter();

  if (!(token || email)) {
    router.push("/login");
  }

  useEffect(() => {
    const getActivities = async () => {
      await getUserRecentActivities({
        email,
        setActivities,
        setError,
        token,
      });
    };
    getActivities();
  }, []);

  if (error) {
    return (
      <div>
        <p className="text-red-500 text-sm font-bold">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {activities.length === 0 ? (
        <div>No Recent activity found</div>
      ) : (
        activities.map((activity) => (
          <CardAccount
            recentActivityDescription={activity.description}
            recentActivityTitle={activity.title}
            date={activity.created_date}
            time={activity.created_time}
            key={activity.id}
          />
        ))
      )}
    </div>
  );
};

export default AccountRecent;
