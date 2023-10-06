import React from "react";
import CreateTicketsCard from "./create-tickets-card";

const CreateTickets = () => {
  return (
    <div className="w-full">
      <h2>Created Tickets</h2>
      <div>
        <CreateTicketsCard cardLabel="Today" cardNumber={6} />
        <CreateTicketsCard cardLabel="This Week" cardNumber={14} />
        <CreateTicketsCard cardLabel="This Month" cardNumber={22} />
      </div>
    </div>
  );
};

export default CreateTickets;
