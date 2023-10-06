import { cn } from "@/lib/utils";
import React, { FC } from "react";

type TicketsStatusCardProps = {
  ticketLabel: string;
  ticketNumber: number;
  className: string;
};

const TicketsStatusCard: FC<TicketsStatusCardProps> = ({
  ticketLabel,
  ticketNumber,
  className,
}) => {
  return (
    <div
      className={cn(
        "font-bold w-full flex h-[70px] border-s-8 items-center justify-between p-4 cursor-pointer transition-background duration-300 ease-in-out",
        className
      )}
    >
      <h3>{ticketLabel}</h3>
      <p>{ticketNumber}</p>
    </div>
  );
};

export default TicketsStatusCard;
