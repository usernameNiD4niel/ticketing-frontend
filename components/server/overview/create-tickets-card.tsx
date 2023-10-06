import React, { FC } from "react";

type CreateTicketsCardProps = {
  cardLabel: string;
  cardNumber: number;
};

const CreateTicketsCard: FC<CreateTicketsCardProps> = ({
  cardLabel,
  cardNumber,
}) => {
  return (
    <div className="w-full md:max-w-[200px] flex items-center justify-between p-4 rounded-lg">
      <h4 className="text-sm">{cardLabel}</h4>
      <p className="font-bold">{cardNumber}</p>
    </div>
  );
};

export default CreateTicketsCard;
