import { UserProps } from "@/constants/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface RoleCardProps {
  user: UserProps;
  selectedUserIds: number[];
  setSelectedUserIds: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function RoleCard({
  user,
  selectedUserIds,
  setSelectedUserIds,
}: RoleCardProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleCardSelection = () => {
    if (isClicked) {
      // means the user is deselected the selected card
      const cleanedIds = selectedUserIds.filter((id) => id !== user.id);
      setSelectedUserIds(cleanedIds);
    } else {
      setSelectedUserIds((prevSelected) => [...prevSelected, user.id]);
    }

    setIsClicked((prevState) => !prevState);
  };

  return (
    <div
      onClick={handleCardSelection}
      className={cn(
        "rounded-md p-5 space-y-3 max-w-md min-w-[300px] hover:cursor-pointer w-full md:w-fit",
        isClicked
          ? "border-4 border-[#0B64B9] text-[#0B64B9] dark:border-[#0B64B9]/50 dark:text-primary dark:bg-[#0B64B9]"
          : "border-[1px] text-primary border-primary"
      )}
    >
      <h3 className="font-bold">{user.name}</h3>
      <p className="md:text-sm text-xs">Account Creation: {user.created_at}</p>
      <p className="md:text-sm text-xs">Department: {user.department}</p>
      <div className="flex items-center justify-end">
        <p className="text-sm">{user.created_time}</p>
      </div>
    </div>
  );
}
