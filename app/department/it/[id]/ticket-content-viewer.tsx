import { FeedTicketProps } from "@/constants/types";
import React, { FC } from "react";
import TicketContent from "./ticket-content";

type TicketContentViewerProps = {
  ticket: FeedTicketProps;
  id: string;
};

const TicketContentViewer: FC<TicketContentViewerProps> = ({ ticket, id }) => {
  return (
    <React.Fragment>
      {ticket ? (
        <TicketContent id={id} ticket={ticket} />
      ) : (
        <div>No data found</div>
      )}
    </React.Fragment>
  );
};

export default TicketContentViewer;
