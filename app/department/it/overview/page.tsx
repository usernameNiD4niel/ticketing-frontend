import React from "react";
import CreateTickets from "@/components/server/overview/create-tickets";
import ActiveTab from "@/components/client/overview/active-tab";
import TicketsStatus from "@/components/server/overview/tickets-status";
import ChampionBody from "@/components/server/overview/champion-body";

const Overview = () => {
  return (
    <>
      <ActiveTab />
      <div className="flex flex-col gap-10 md:container pb-10">
        <ChampionBody />
        <CreateTickets />
        <TicketsStatus />
      </div>
    </>
  );
};

export default Overview;
