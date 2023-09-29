import { Badge } from "@/components/ui/badge";
import BottomSheet from "@/components/utils/BottomSheet";
import EditCard from "@/components/utils/EditCard";
import RightSheet from "@/components/utils/RightSheet";
import { ActivitiesProps, Activity, FeedTicketProps } from "@/constants/types";
import { useAuth } from "@/hooks/auth";
import { getCookies } from "next-client-cookies/server";
import React, { FC } from "react";

type TicketContentProps = {
  ticket: FeedTicketProps;
  count: number;
  id: string;
};

const getSpecifiedActivities = async (id: string, token: string) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/activities/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (data.ok) {
    const activities: ActivitiesProps = await data.json();
    return activities.activities;
  } else {
    throw new Error("Error fetching activities");
  }
};

const TicketContent: FC<TicketContentProps> = async ({ count, ticket, id }) => {
  const role = getCookies().get("role");
  const token = getCookies().get("token");

  const activities: Activity[] = await getSpecifiedActivities(id, token!);

  const { is_ticket_owner } = ticket;

  return (
    <div className="mt-4 flex items-center justify-center mx-2 md:mx-0">
      <div className="max-w-6xl relative md:w-full">
        <div className="flex justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold my-2">#{ticket.id}</h1>
            <div className="space-x-1">
              <Badge>{ticket.priority.toUpperCase()}</Badge>
              <Badge>{ticket.status.toUpperCase()}</Badge>
            </div>
            <h3>Requestor: {ticket.name}</h3>
            <h3>Department: {ticket.department}</h3>
            <p className="text-sm">
              Champion:
              {ticket.assigned_to ? ticket.assigned_to : "No champion assign"}
            </p>
          </div>
          <div className="text-end text-sm">
            <p>Posted Date: {ticket.created_at}</p>
            <p>Updated Date: {ticket.updated_at}</p>
            <p>
              Resolution Date:{" "}
              {ticket.resolved_date ? (
                ticket.resolved_date
              ) : (
                <>Not yet resolve</>
              )}
            </p>
          </div>
        </div>
        {/* Body of the Ticket */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold my-2">{ticket.subject}</h2>
          <p className="text-sm text-justify">{ticket.description}</p>
        </div>
        {role?.toLowerCase() === "champion" ||
        role?.toLowerCase() === "catalyst" ? (
          <EditCard
            ticket={ticket}
            ticketNumber={`#${ticket.id}`}
            isTicketOwner={false}
          />
        ) : (
          <>
            {is_ticket_owner && (
              <EditCard
                ticket={ticket}
                ticketNumber={`#${ticket.id}`}
                isTicketOwner={is_ticket_owner}
              />
            )}
          </>
        )}
        <RightSheet activities={activities} count={count} />
        <BottomSheet ticket_id={ticket.id} />
      </div>
    </div>
  );
};

export default TicketContent;
