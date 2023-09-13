"use client";
import { FeedTicketProps } from "@/constants/types";
import Link from "next/link";
import React, { FC, useEffect } from "react";

type TroubleCardProps = {
  classColor: string;
  ticket: FeedTicketProps;
};

const TroubleCard: FC<TroubleCardProps> = ({ classColor, ticket }) => {
  const handleClickLink = () => {
    localStorage.setItem("TICKET", JSON.stringify(ticket));
  };

  return (
    <Link
      href={`/department/it/${ticket.id}`}
      onClick={handleClickLink}
      className={`${classColor} rounded-md md:max-w-[300px] w-full px-4 py-6 space-y-2 hover:cursor-pointer md:hover:scale-105 transition-scale duration-300 ease-in-out`}
    >
      <div className="flex justify-end items-center">
        <p className="text-xs md:text-sm font-light">{ticket.status}</p>
      </div>
      <div>
        <h2 className="text-3xl font-bold text-[#312F2F] dark:text-white">
          #{ticket.id}
        </h2>
        <p>{ticket.subject}</p>
      </div>
      <p className="font-thin text-xs md:text-sm">
        Posted Date: <span className="italic">{ticket.created_at}</span>
      </p>
    </Link>
  );
};

export default TroubleCard;
