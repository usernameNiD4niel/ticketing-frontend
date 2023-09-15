"use client";
import { AvailableTabs } from "@/constants/enums";
import useNavigationStore from "@/hooks/states/useNavigationStore";
import React, { Suspense, useEffect, useState } from "react";
import Loading from "./loading";
import { useAuth } from "@/hooks/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const UnhandledTickets = () => {
  const setActiveTab = useNavigationStore((state) => state.setActiveTab);
  const { getUnHandledTickets } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    setActiveTab(AvailableTabs["Unhandled Tickets"]);

    const token = Cookies.get("token");

    if (!token) {
      router.push("/login");
      return;
    }
    const getTickets = async () => {
      const data = getUnHandledTickets({ setError, setIsFetching, token });
    };
  }, []);

  if (isFetching) {
    return <div>Loading</div>;
  }

  return (
    <Suspense fallback={<Loading />}>
      <section className="p-2 w-full flex justify-center flex-col gap-y-2">
        <div className="flex flex-col flex-wrap w-full gap-2 md:flex-row">
          {tickets &&
            tickets
              .slice(0)
              .reverse()
              .map((ticket) => (
                <TroubleCard
                  classColor={cn(getTicketColor(ticket.priority))}
                  ticket={ticket}
                  key={ticket.id}
                />
              ))}
        </div>
        <Link
          href="/department/it/create-ticket"
          className="fixed bottom-5 text-xl right-5 bg-[#EEF7FF] dar:bg-[#EEF7FF]/50 rounded-md flex items-center justify-center gap-x-1 py-2 px-4 text-[#0B64B9] border-[1px] border-[#0B64B9]"
        >
          <IoAdd />
          <span className=" text-sm">Ticket</span>
        </Link>
      </section>
    </Suspense>
  );
};
