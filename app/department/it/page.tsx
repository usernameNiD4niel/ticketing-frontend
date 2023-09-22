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
import { CiSearch } from "react-icons/ci";
import { Input } from "@/components/ui/input";

const Page = () => {
  const [setActiveTab] = useNavigationStore((state) => [state.setActiveTab]);
  const { getTickets } = useAuth();
  const [tickets, setTickets] = useState<FeedTicketProps[]>([]);
  const [clonedTickets, setClonedTickets] = useState<FeedTicketProps[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [search, setSearch] = useState("");

  const router = useRouter();

  useEffect(() => {
    setActiveTab(AvailableTabs.Feed);

    fetchTicket();
  }, []);
  const fetchTicket = async () => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
      return;
    }
    const res: FeedTicketProps[] = await getTickets({ setIsFetching, token });
    setTickets(res);
    setClonedTickets(res);
  };

  useEffect(() => {
    if (clonedTickets && clonedTickets.length > 0) {
      const cleanedData = clonedTickets.filter((ticket) => {
        if (
          ticket.id.toString().includes(search) ||
          ticket.subject.toLowerCase().includes(search) ||
          ticket.created_at.toLowerCase().includes(search) ||
          ticket.status.toLowerCase().includes(search)
        ) {
          return true;
        }
        return false;
      });
      setTickets(cleanedData);
      return;
    }

    const cleanedData = tickets.filter((ticket) =>
      ticket.id.toString().includes(search)
    );
    setTickets(cleanedData);
  }, [search]);

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

  const handleOnChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <Suspense fallback={<Loading />}>
      <form className="w-full relative hidden md:block">
        <div className="absolute top-[13px] left-3 text-2xl opacity-60">
          <CiSearch />
        </div>
        <Input
          type="text"
          name="search"
          required
          placeholder="Search ticket (eg. Ticket No, Status, Date Posted)"
          value={search}
          onChange={handleOnChangeSearch}
          className="py-6 pl-10 pr-3 md:max-w-[87%]"
        />
      </form>
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
                  tabName="Feed"
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
