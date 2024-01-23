import { FC } from "react";

type CardACcountProps = {
  recentActivityTitle: string;
  recentActivityDescription: string;
  date: string;
};

const CardAccount: FC<CardACcountProps> = ({
  recentActivityDescription,
  recentActivityTitle,
  date,
}) => {
  return (
    <div className="p-3 border-primary border-opacity-10 border-[1px] rounded-md w-full hover:cursor-pointer md:w-[300px] h-[150px] flex flex-col justify-between items-center">
      <div className="w-full">
        <h3 className="font-bold text-sm">{recentActivityTitle}</h3>
        <hr className="my-3" />
        <p className="text-xs">{recentActivityDescription}</p>
      </div>
      <div className="w-full flex justify-end items-center">
        <p className="text-xs text-gray-600">{date}</p>
      </div>
    </div>
  );
};

export default CardAccount;
