import { Badge } from "@/components/ui/badge";
import BottomSheet from "@/components/utils/BottomSheet";
import EditCard from "@/components/utils/EditCard";
import { FeedTicketProps } from "@/constants/types";
import { getCookies } from "next-client-cookies/server";
import { cookies } from "next/headers";
import React, { FC } from "react";

type TicketContentProps = {
  ticket: FeedTicketProps;
};

const TicketContent: FC<TicketContentProps> = async ({ ticket }) => {
  const role = cookies().get("it_access_level")?.value;

  return (
    <div className="mt-4 flex items-center justify-center md:mx-0">
      <div className="w-full relative mx-2 md:mx-0">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="space-y-1">
            {ticket.ticket_type &&
              role?.toLowerCase() !== "unset" &&
              role?.toLowerCase() !== "requestor" && (
                <div className="text-sm bg-gradient-to-r from-[#99CC68] dark:from-indigo-900 p-1 pl-2 font-bold">
                  {ticket.ticket_type}
                </div>
              )}
            <h1 className="text-3xl font-bold my-2">#{ticket.id}</h1>
            <div className="space-x-1">
              {role?.toLowerCase() !== "requestor" && (
                <Badge>{ticket.priority.toUpperCase()}</Badge>
              )}
              <Badge>{ticket.status.toUpperCase()}</Badge>
            </div>
            <h3 className="text-sm">Requestor: {ticket.name}</h3>
            <h3 className="text-sm">Department: {ticket.department}</h3>
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
        <div className="my-8 max-w-5xl">
          <h2 className="text-2xl font-bold my-2">{ticket.subject}</h2>
          <p className="text-sm text-justify">{ticket.description}</p>
        </div>
        <hr className="my-4" />
        <EditCard ticket={ticket} ticketNumber={`#${ticket.id}`} />
        <BottomSheet
          ticket_id={ticket.id}
          isOpen={ticket.status.toLowerCase() === "open"}
        />
      </div>
    </div>
  );
};

export default TicketContent;
