import { Badge } from "@/components/ui/badge";
import BottomSheet from "@/components/utils/BottomSheet";
import EditCard from "@/components/utils/EditCard";
import { FeedTicketProps } from "@/constants/types";
import { getCookies } from "next-client-cookies/server";
import React, { FC } from "react";

type TicketContentProps = {
  ticket: FeedTicketProps;
};

const TicketContent: FC<TicketContentProps> = async ({ ticket /*id*/ }) => {
  const role = getCookies().get("it_access_level");
  // const token = getCookies().get("token");

  // const activities: Activity[] = await getSpecifiedActivities(id, token!);

  const { is_ticket_owner } = ticket;

  return (
    <div className="mt-4 flex items-center justify-center md:mx-0">
      <div className="w-full relative mx-2 md:mx-0">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold my-2">#{ticket.id}</h1>
            <div className="space-x-1">
              <Badge>{ticket.priority.toUpperCase()}</Badge>
              <Badge>{ticket.status.toUpperCase()}</Badge>
            </div>
            <h3>Requestor: {ticket.name}</h3>
            <h3>Department: {ticket.department}</h3>
            <p className="text-sm">
              <span className="mr-2">Champion:</span>
              {ticket.assigned_to ? ticket.assigned_to : "No champion assign"}
            </p>
            <p className="text-sm">
              <span className="mr-2">Location:</span>
              {ticket.location ? ticket.location : "No location"}
            </p>
            <p className="text-sm">
              <span className="mr-2">Contact:</span>
              {ticket.contact ? ticket.contact : "No contact"}
            </p>
          </div>
          <div className="text-sm md:text-end space-y-1">
            <p>Posted Date: {ticket.created_at}</p>
            <p>Updated Date: {ticket.updated_at}</p>
            <p>
              Closed Date: {ticket.closed_date ? ticket.closed_date : <>N/A</>}
            </p>
            <p>
              Cancelled:{" "}
              {ticket.cancelled_date ? ticket.cancelled_date : <>N/A</>}
            </p>
          </div>
        </div>
        {/* Body of the Ticket */}
        <div className="my-8">
          <h2 className="text-2xl font-bold my-2">{ticket.subject}</h2>
          <p className="text-sm text-justify">{ticket.description}</p>
        </div>
        <hr className="my-4" />
        {role?.toLowerCase() === "champion" ||
        role?.toLowerCase() === "catalyst" ||
        role?.toLowerCase() === "supreme" ? (
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
        {/* <RightSheet activities={activities} /> */}
        {/* <hr className="my-4" /> */}
        <BottomSheet ticket_id={ticket.id} />
      </div>
    </div>
  );
};

export default TicketContent;
