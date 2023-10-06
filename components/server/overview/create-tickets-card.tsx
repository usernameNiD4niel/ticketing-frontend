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
    <div className="w-full md:max-w-sm flex h-[90px] md:h-[130px] border-s-8 border-s-[#1369BB] items-center justify-between p-4 bg-blue-400/20 hover:bg-blue-400/30 cursor-pointer transition-background duration-300 ease-in-out">
      <h4 className="font-bold">{cardLabel}</h4>
      <p className="font-bold md:text-4xl">{cardNumber}</p>
    </div>
  );
};

export default CreateTicketsCard;
