import { FC } from "react";
import { Activity } from "@/constants/types";

type RightSheetProps = {
  activities: Activity[];
};

const RightSheet: FC<RightSheetProps> = ({ activities }) => {
  const DisplayContent = () => {
    if (activities && activities.length > 0) {
      return activities
        .slice(0)
        .reverse()
        .map((activity) => (
          <NotificationCard
            key={activity.id}
            description={activity.details}
            created_at={activity.created_at}
            created_time={activity.created_time}
          />
        ));
    } else {
      return (
        <div className="h-40 w-full flex items-center justify-center">
          <h2 className="text-sm">
            This ticket hasn&apos;t omit any activities yet
          </h2>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col">
      <h3 className="font-bold">Ticket Events</h3>
      <div className="text-justify text-sm">
        Changes to ticket will appear here
      </div>
      <div className="flex flex-col gap-y-2 my-4">
        <DisplayContent />
      </div>
    </div>
  );
};

type NotificationCardProps = {
  description: string;
  created_at: string;
  created_time: string;
};

const NotificationCard: FC<NotificationCardProps> = ({
  description,
  created_at,
  created_time,
}) => {
  return (
    <div className="w-full hover:cursor-pointer hover:border-s-2 hover:border-s-[#0B64B9] p-3 hover:text-[#0B64B9] group">
      <p className="text-xs">{description}</p>
      <p className="text-xs text-gray-400 group-hover:text-[#0B64B9]">
        {created_at} | {created_time}
      </p>
    </div>
  );
};

export default RightSheet;
