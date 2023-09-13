"use client";
import { Badge } from "@/components/ui/badge";
import BottomSheet from "@/components/utils/BottomSheet";
import RightSheet from "@/components/utils/RightSheet";
import { FeedTicketProps } from "@/constants/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineComment } from "react-icons/ai";
import { BsChevronRight } from "react-icons/bs";

const TicketPage = ({ params }: { params: { id: string } }) => {
  const [ticket, setTicket] = useState<FeedTicketProps | null>(null);

  useEffect(() => {
    const _ticket = localStorage.getItem("TICKET");
    if (_ticket) {
      setTicket(JSON.parse(_ticket));
      console.log("second use effect", ticket?.subject);
    }
  }, []);

  return (
    <section className="w-full">
      <ul className="flex gap-x-2 items-center text-xs">
        <li>
          <Link href="/department/it">Feed</Link>
        </li>
        <li>
          <BsChevronRight />
        </li>
        <li>
          <Link href={`/department/it/${params.id}`}>Ticket {params.id}</Link>
        </li>
      </ul>
      {ticket ? <TicketContent {...ticket} /> : <div>No data found</div>}
    </section>
  );
};

const TicketContent = (ticket: FeedTicketProps) => {
  return (
    <div className="mt-4 flex items-center justify-center mx-2 md:mx-0">
      <div className="max-w-6xl relative md:w-full">
        <div className="flex justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold my-2">#{ticket.id}</h1>
            <div className="space-x-1">
              <Badge>MODERATE</Badge>
              <Badge>RESOLVED</Badge>
            </div>
            <h3>Requestor: Daniel Rey</h3>
            <h3>Department: IT</h3>
            <p className="text-sm">Champion: Bry Bautista</p>
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
        <RightSheet />
        <BottomSheet />
        {/* <div className="fixed bottom-8 right-8 text-2xl flex bg-stone-900 rounded-full w-16 h-16 items-center justify-center text-white hover:cursor-pointer">
          <div className="relative">
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TicketPage;
