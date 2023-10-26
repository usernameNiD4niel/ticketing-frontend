import React, { FC } from "react";

interface CardProps {
  position: string;
  applicant: string;
  creator: string;
  cvAttached: string | null;
  createdOn: string;
}

const Card: FC<CardProps> = ({
  applicant,
  createdOn,
  creator,
  cvAttached,
  position,
}) => {
  return (
    <div className="rounded-lg bg-white w-full py-4 px-6 hover:cursor-pointer dark:bg-[#2C2C2C]/20">
      <h1 className="font-bold my-2 text-xl">{position}</h1>
      <p className="font-bold">{applicant}</p>
      <p className="text-sm">Creator - {creator}</p>
      <p className="text-sm">CV {cvAttached ?? "Unavailable"}</p>
      <div className="py-2 w-full flex justify-end items-center">
        <p className="text-sm font-light">{createdOn}</p>
      </div>
    </div>
  );
};

export default Card;
