"use client";
import PendingRoleAssign from "@/components/utils/PendingRoleAssign";
import { AvailableTabs } from "@/constants/enums";
import useNavigationStore from "@/hooks/states/useNavigationStore";
import { cn } from "@/lib/utils";
import React, { FC, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/navigation";

type UserProps = {
  id?: number;
  name?: string;
  email: string;
  created_at?: string;
  department?: string;
  created_time: string;
};

const PendingRole = () => {
  const [clickCounter, setClickCounter] = useState(0);
  const setActiveTab = useNavigationStore((state) => state.setActiveTab);
  const [activeCards, setActiveCards] = useState<string[]>([]);

  const { getPendingRoles } = useAuth();
  const [backendError, setBackendError] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [users, setUsers] = useState<UserProps[]>([]);

  const [signalForRefetch, setSignalForRefetch] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const role = Cookies.get("it_access_level");

    if (
      role?.toUpperCase() === "REQUESTOR" ||
      role?.toUpperCase() === "UNSET"
    ) {
      router.back();
    }

    setActiveTab(AvailableTabs["Departments Role"]);

    const token = Cookies.get("token");
    setIsFetching(false);

    const getRoles = async () => {
      const data: UserProps[] = await getPendingRoles({
        setBackendError,
        setIsFetching,
        token,
      });

      setUsers(data);
    };

    getRoles();
  }, [signalForRefetch]);

  if (isFetching) {
    return (
      <div className="w-full flex items-center justify-center h-[90vh]">
        <h2 className="text-sm">Getting department roles</h2>
      </div>
    );
  }

  if (backendError) {
    return (
      <div className="w-full flex items-center justify-center h-[90vh]">
        <h2 className="text-sm">Error {backendError}</h2>
      </div>
    );
  }

  if (!users) {
    return (
      <div className="w-full flex items-center justify-center h-[90vh]">
        <h2 className="text-sm">
          You&apos;re doing great! Continue handling all tickets well😉
        </h2>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="w-full flex items-center justify-center h-[90vh]">
        <h2 className="text-sm">
          You&apos;re doing great! Continue handling your department well😉
        </h2>
      </div>
    );
  }

  return (
    <div className="flex gap-3 flex-wrap items-center justify-center md:justify-start">
      {users.map((data) => (
        <PendingRoleCard
          data={data}
          activeCards={activeCards}
          setClickCounter={setClickCounter}
          setActiveCards={setActiveCards}
          key={data.id}
        />
      ))}

      {clickCounter > 0 && (
        // <Button className="fixed bottom-5 right-3 md:right-10">Create</Button>
        <PendingRoleAssign
          activeCards={activeCards}
          setSignalForRefetch={setSignalForRefetch}
        />
      )}
    </div>
  );
};

type PendingRoleCardProps = {
  setActiveCards: React.Dispatch<React.SetStateAction<string[]>>;
  setClickCounter: React.Dispatch<React.SetStateAction<number>>;
  activeCards: string[];
  data: UserProps;
};

const PendingRoleCard: FC<PendingRoleCardProps> = ({
  setActiveCards,
  setClickCounter,
  activeCards,
  data,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const { email, created_at, department, created_time, name } = data;

  useEffect(() => {
    if (isClicked) {
      setClickCounter((prev) => prev + 1);
    } else {
      setClickCounter((prev) => {
        if (prev <= 0) {
          return 0;
        }
        return prev - 1;
      });
    }
  }, [isClicked]);

  const handleCardSelection = () => {
    setIsClicked((prev) => !prev);

    const cleanedData = activeCards.filter(
      (activeCard) => activeCard !== email
    );

    //? If this is true means the cleaned data has an item same as active cards which means also that we need to add the email to the array
    //? else we won't do anything since the filter is eleminates the unselected item
    if (cleanedData.length === activeCards.length) {
      cleanedData.push(email);
    }
    setActiveCards(cleanedData);
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
      <h3 className="font-bold">{name}</h3>
      <p className="md:text-sm text-xs">Account Creation: {created_at}</p>
      <p className="md:text-sm text-xs">Department: {department}</p>
      <div className="flex items-center justify-end">
        <p className="text-sm">{created_time}</p>
      </div>
    </div>
  );
};

export default PendingRole;
