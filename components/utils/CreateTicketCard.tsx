import React, { FC } from "react";

type CreateTicketCardProps = {
  title: string;
  description: string;
};

const CreateTicketCard: FC<CreateTicketCardProps> = ({
  description,
  title,
}) => {
  return (
    <div className="w-[300px] bg-gradient-to-r from-[#0B64B9]/50 p-3 border-s-4 border-s-[#0B64B9] space-y-2">
      <h1 className="text-sm font-bold">{title}</h1>
      <p className="text-sm font-extralight">{description}</p>
    </div>
  );
};

export default CreateTicketCard;
