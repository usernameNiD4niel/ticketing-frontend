import React, { FC } from "react";

type TroubleCardProps = {
  title: string;
  description: string;
  postedDate: string;
  classColor: string;
  status: string;
};

const TroubleCard: FC<TroubleCardProps> = ({
  classColor,
  description,
  postedDate,
  title,
  status,
}) => {
  return (
    //! BLUEWISH: bg-[#C3F2FC] dark:bg-[#485A5E]
    //! REDISH: bg-[#FCC3C3] dark:bg-[#594545]
    //! YELLOWISH: bg-[#FBFCC3] dark:bg-[#5E5F48]
    <div
      className={`${classColor} rounded-md md:max-w-[300px] w-full px-4 py-6 space-y-2 hover:cursor-pointer hover:scale-105 transition duration-300 ease-in-out`}
    >
      <div className="flex justify-end items-center">
        <p className="text-xs md:text-sm font-light">{status}</p>
      </div>
      <div>
        <h2 className="text-3xl font-bold text-[#312F2F] dark:text-white">
          {title}
        </h2>
        <p>{description}</p>
      </div>
      <p className="font-thin text-xs md:text-sm">
        Posted Date: <span className="italic">{postedDate}</span>
      </p>
    </div>
  );
};

export default TroubleCard;
