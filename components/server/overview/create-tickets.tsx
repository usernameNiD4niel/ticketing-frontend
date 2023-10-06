import React from "react";
import CreateTicketsCard from "./create-tickets-card";
import { getCookies } from "next-client-cookies/server";

const getTodayTickets = async (token: string) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-tickets/counts/today`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((d) => d.json())
    .catch((error) => error);

  return data.count;
};

const getThisWeekTickets = async (token: string) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-tickets/counts/this-week`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((d) => d.json())
    .catch((error) => error);

  return data.count;
};

const getThisMonthTickets = async (token: string) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-tickets/counts/this-month`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((d) => d.json())
    .catch((error) => error);

  return data.count;
};

const CreateTickets = async () => {
  const token = getCookies().get("token");

  const todayCount = getTodayTickets(token!);
  const thisWeekCount = getThisWeekTickets(token!);
  const thisMonthCount = getThisMonthTickets(token!);

  const [today, week, month] = await Promise.all([
    todayCount,
    thisWeekCount,
    thisMonthCount,
  ]);

  return (
    <div className="w-full px-2">
      <h2 className="font-bold text-lg">Created Tickets</h2>
      <div className="flex gap-4 mt-2 flex-col md:flex-row">
        <CreateTicketsCard cardLabel="TODAY" cardNumber={today} />
        <CreateTicketsCard cardLabel="THIS WEEK" cardNumber={week} />
        <CreateTicketsCard cardLabel="THIS MONTH" cardNumber={month} />
      </div>
    </div>
  );
};

export default CreateTickets;
