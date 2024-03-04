"use client";
import { cn } from "@/lib/utils";
import React, { FC, useState } from "react";

interface CardProps {
  name: string;
  department: string;
  creation_date: string;
  id: string;
  ids: string[];
  setIds: React.Dispatch<React.SetStateAction<string[]>>;
}

const Card: FC<CardProps> = ({
  creation_date,
  department,
  name,
  ids,
  setIds,
  id,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleCardSelection = () => {
    if (isSelected) {
      // Remove the selected item from the ids
      const newIds = ids.filter((_id) => _id !== id);
      setIds(newIds);
    } else {
      setIds((prevId) => [...prevId, id]);
    }

    setIsSelected((prev) => !prev);
  };
  return (
    <div
      className={cn(
        "flex flex-col justify-between rounded-md hover:border-2 w-full md:max-w-sm border-[#879FFF] hover:cursor-pointer px-5 pt-8 pb-4 gap-y-6",
        isSelected ? "bg-[#879FFF] text-white" : "bg-white"
      )}
      onClick={handleCardSelection}
    >
      <div>
        <h2 className="md:text-xl font-medium">{name}</h2>
        <p className="text-sm md:text-base">Department: {department}</p>
      </div>
      <p className="text-xs md:text-sm text-end md:pt-2">{creation_date}</p>
    </div>
  );
};

export default Card;
