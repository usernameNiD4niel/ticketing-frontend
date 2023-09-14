import { FC } from "react";

type CardACcountProps = {
  recentActivityTitle: string;
  recentActivityDescription: string;
};

const CardAccount: FC<CardACcountProps> = ({
  recentActivityDescription,
  recentActivityTitle,
}) => {
  return (
    <div className="p-3 border-primary border-opacity-10 border-[1px] rounded-md w-full md:w-[300px] h-[120px]">
      <h3 className="font-bold text-sm">{recentActivityTitle}</h3>
      <p className="text-sm">{recentActivityDescription}</p>
    </div>
  );
};

export default CardAccount;
