"use client";
import { AvailableTabs } from "@/constants/enums";
import { FeedTicketProps } from "@/constants/types";
import { useAuth } from "@/hooks/auth";
import useNavigationStore from "@/hooks/states/useNavigationStore";
import React, { Suspense, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import TroubleCard from "@/components/utils/TroubleCard";
import { cn } from "@/lib/utils";

const MyTickets = () => {
  const [setActiveTab] = useNavigationStore((state) => [state.setActiveTab]);

  const { getMyTickets } = useAuth();

  const [myTickets, setMyTickets] = useState<FeedTicketProps[]>([]);
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    setActiveTab(AvailableTabs["Existing Tickets"]);
    getMyTicket();
  }, []);

  const getMyTicket = async () => {
    const token = Cookies.get("token");
    const name = Cookies.get("name");

    getMyTickets({
      name,
      setError,
      setIsFetching,
      setMyTickets,
      token,
    });
  };

  const getTicketColor = (priority: string) => {
    switch (priority) {
      case "unset":
        return "bg-[#EEF7FF] dark:bg-[#EEF7FF]/50";
      case "low":
        return "bg-[#C3F2FC] dark:bg-[#C3F2FC]/50";
      case "medium":
        return "bg-[#FBFCC3] dark:bg-[#FBFCC3]/50";
      default:
        return "bg-[#FCC3C3] dark:bg-[#FCC3C3]/50";
    }
  };

  if (isFetching) {
    return (
      <div className="h-[90vh] flex items-center justify-center">
        <h3 className="text-xs md:text-sm">Getting your trouble tickets</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[90vh] flex items-center justify-center">
        <h3>Getting your trouble tickets</h3>
      </div>
    );
  }

  return (
    <section className="p-2 w-full flex justify-center flex-col gap-y-2">
      <div className="flex flex-col flex-wrap w-full gap-2 md:flex-row">
        {!myTickets || myTickets.length === 0 ? (
          <div className="w-full h-[90vh] flex items-center justify-center">
            <p className="text-xs md:text-sm">
              You don&apos;t have any troubles yet,{" "}
              <Link
                href="department/it/create-ticket"
                className="underline underline-offset-1"
              >
                Create your trouble ticket
              </Link>
            </p>
          </div>
        ) : (
          myTickets
            .slice(0)
            .reverse()
            .map((ticket) => (
              <TroubleCard
                classColor={cn(getTicketColor(ticket.priority))}
                ticket={ticket}
                key={ticket.id}
                tabName="My Ticket"
              />
            ))
        )}
      </div>
    </section>
  );
};

export default MyTickets;
