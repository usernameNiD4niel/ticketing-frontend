import { FeedTicketProps } from "@/constants/types";
import React, { FC } from "react";
import TicketContent from "./ticket-content";

type TicketContentViewerProps = {
  ticket: FeedTicketProps;
};

const TicketContentViewer: FC<TicketContentViewerProps> = ({ ticket }) => {
  return (
    <React.Fragment>
      {ticket ? <TicketContent ticket={ticket} /> : <div>No data found</div>}
    </React.Fragment>
  );
};

export default TicketContentViewer;
