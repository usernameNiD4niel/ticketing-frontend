"use client";
import { AvailableTabs } from "@/constants/enums";
import useNavigationStore from "@/hooks/states/useNavigationStore";
import React, { Suspense, useEffect, useState } from "react";
import Loading from "./loading";
import { useAuth } from "@/hooks/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { FeedTicketProps } from "@/constants/types";
import TroubleCard from "@/components/utils/TroubleCard";

const UnhandledTickets = () => {
  const setActiveTab = useNavigationStore((state) => state.setActiveTab);
  const { getUnHandledTickets } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [unhandledTickets, setUnhandledTickets] = useState<FeedTicketProps[]>(
    []
  );

  useEffect(() => {
    setActiveTab(AvailableTabs["Unhandled Tickets"]);

    const token = Cookies.get("token");

    if (!token) {
      router.push("/login");
      return;
    }
    const getTickets = async () => {
      const data: FeedTicketProps[] = await getUnHandledTickets({
        setError,
        setIsFetching,
        token,
      });
      if (data) {
        setUnhandledTickets(data);
      }
    };

    getTickets();
  }, []);

  if (isFetching) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <Suspense fallback={<Loading />}>
      <section className="p-2 w-full flex justify-center flex-col gap-y-2">
        <div className="flex flex-col flex-wrap w-full gap-2 md:flex-row">
          {unhandledTickets &&
            unhandledTickets.map((ticket) => (
              <TroubleCard
                classColor="bg-[#EEF7FF] dark:bg-[#EEF7FF]/50"
                ticket={ticket}
                key={ticket.id}
                tabName="Unhandled Tickets"
              />
            ))}
        </div>
      </section>
    </Suspense>
  );
};

export default UnhandledTickets;
