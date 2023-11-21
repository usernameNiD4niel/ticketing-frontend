import { TicketContent } from "@/constants/types";
import React, { FC } from "react";
import CardAccount from "./CardAccount";

type AccountRecentProps = {
  token: string;
  email: string;
};

const getRecentActivity = async (email: string, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/accounts/recent`,
    {
      body: JSON.stringify({ email }),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((data) => data.json())
    .catch((error) => error);
  return response.ticket_content as TicketContent[];
};

const AccountRecent: FC<AccountRecentProps> = async ({ token, email }) => {
  // const [activities, setActivities] = useState<TicketContent[]>([]);
  const activities = await getRecentActivity(email, token);

  return (
    <div className="flex gap-2 flex-wrap">
      {!activities || activities.length === 0 ? (
        <div className="my-20 flex items-center justify-center w-full">
          No Recent activity found
        </div>
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
