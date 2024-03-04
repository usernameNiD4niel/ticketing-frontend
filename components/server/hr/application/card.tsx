import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { FC } from "react";

interface CardProps {
  position: string;
  applicant: string;
  creator: string;
  cvAttached: string | null;
  createdOn: string;
  setId: React.Dispatch<React.SetStateAction<number>>;
  id: number;
  index: number;
  signals: number[];
  setSignals: React.Dispatch<React.SetStateAction<number[]>>;
}

const Card: FC<CardProps> = ({
  applicant,
  createdOn,
  creator,
  cvAttached,
  index,
  position,
  setId,
  setSignals,
  signals,
  id,
}) => {
  const handleClickApplication = () => {
    const active = 1;
    const data = [];
    for (let i = 0; i < signals.length; ++i) {
      if (index === i) {
        data.push(active);
      } else {
        data.push(0);
      }
    }
    setSignals(data);
    setId(id);
  };

  return (
    <>
      <Link
        href={`/hr/application/${id}`}
        className={
          "rounded-lg w-full py-4 px-6 hover:cursor-pointer md:hidden hover:text-white hover:bg-[#879FFF] bg-white text-black"
        }
      >
        <h1 className="font-bold my-2 text-xl">{position}</h1>

        <p className="font-bold">{applicant}</p>
        <p className="text-sm">Creator - {creator}</p>
        <p className="text-sm">CV {cvAttached ?? "Unavailable"}</p>
        <div className="py-2 w-full flex justify-end items-center">
          <p className="text-sm font-light">{createdOn}</p>
        </div>
      </Link>
      <div
        className={cn(
          "rounded-lg w-full py-4 px-6 hover:cursor-pointer hidden md:flex flex-col",
          signals[index] === 1
            ? "text-white bg-[#879FFF]"
            : "bg-white text-black"
        )}
        onClick={handleClickApplication}
      >
        <h1 className="font-bold my-2 text-xl">{position}</h1>

        <p className="font-bold">{applicant}</p>
        <p className="text-sm">Creator - {creator}</p>
        <p className="text-sm">CV {cvAttached ?? "Unavailable"}</p>
        <div className="py-2 w-full flex justify-end items-center">
          <p className="text-sm font-light">{createdOn}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
