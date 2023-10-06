import React from "react";
import TicketsStatusCard from "./tickets-status-card";
import { StatusCount } from "@/constants/types";
import { getCookies } from "next-client-cookies/server";

const getStatusCount = async (token: string) => {
  const data: Promise<StatusCount> = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-tickets/counts/status`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((d) => d.json())
    .catch((error) => error);

  return data;
};

const TicketsStatus = async () => {
  const token = getCookies().get("token");

  const {
    open,
    closed,
    expired,
    resolved,
    "re-opened": reOpened,
  } = await getStatusCount(token!);

  return (
    <div className="w-full px-2">
      <h2 className="font-bold text-lg">Tickets Status</h2>
      <div className="space-y-4 mt-3 w-full">
        <TicketsStatusCard
          ticketLabel="OPEN"
          ticketNumber={open}
          className="border-s-blue-400 bg-blue-300/20 hover:bg-blue-300/30"
        />
        <TicketsStatusCard
          ticketLabel="CLOSED"
          ticketNumber={closed}
          className="border-s-orange-400 bg-orange-300/20 hover:bg-orange-300/30"
        />
        <TicketsStatusCard
          ticketLabel="EXPIRED"
          ticketNumber={expired}
          className="border-s-red-400 bg-red-300/20 hover:bg-red-300/30"
        />
        <TicketsStatusCard
          ticketLabel="RESOLVED"
          ticketNumber={resolved}
          className="border-s-green-400 bg-green-300/20 hover:bg-green-300/30"
        />
        <TicketsStatusCard
          ticketLabel="RE-OPENED"
          ticketNumber={reOpened}
          className="border-s-violet-400 bg-violet-300/20 hover:bg-violet-300/30"
        />
      </div>
    </div>
  );
};

export default TicketsStatus;
