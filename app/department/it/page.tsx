"use client";
import TroubleCard from "@/components/utils/TroubleCard";
import { AvailableTabs } from "@/constants/enums";
import { FeedTicketProps } from "@/constants/types";
import { useAuth } from "@/hooks/auth";
import useNavigationStore from "@/hooks/states/useNavigationStore";
import { Suspense, useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Loading from "./loading";
import { useRouter } from "next/navigation";

const Page = () => {
  const [setActiveTab] = useNavigationStore((state) => [state.setActiveTab]);
  const { getTickets } = useAuth();
  const [tickets, setTickets] = useState<FeedTicketProps[] | undefined>([]);
  const [isFetching, setIsFetching] = useState(true);

  const router = useRouter();

  useEffect(() => {
    setActiveTab(AvailableTabs.Feed);
    const fetchTicket = async () => {
      const token = Cookies.get("token");
      if (!token) {
        router.push("/login");
        return;
      }
      const res: FeedTicketProps[] = await getTickets({ setIsFetching, token });
      setTickets(res);
      console.log(tickets, "undefined");
    };

    fetchTicket();
  }, []);

  if (isFetching) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

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

export default Page;
