import { FeedTicketProps } from "@/constants/types";
import React, { FC } from "react";
import TicketContent from "./ticket-content";

type TicketContentViewerProps = {
  ticket: FeedTicketProps;
  count: number;
  id: string;
};

const TicketContentViewer: FC<TicketContentViewerProps> = ({
  count,
  ticket,
  id,
}) => {
  return (
    <React.Fragment>
      {ticket ? (
        <TicketContent id={id} ticket={ticket} count={count} />
      ) : (
        <div>No data found</div>
      )}
    </React.Fragment>
  );
};

export default TicketContentViewer;
