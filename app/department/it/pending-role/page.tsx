"use client";
import PendingRoleAssign from "@/components/utils/PendingRoleAssign";
import { AvailableTabs } from "@/constants/enums";
import useNavigationStore from "@/hooks/states/useNavigationStore";
import { cn } from "@/lib/utils";
import React, { FC, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useAuth } from "@/hooks/auth";

type UserProps = {
  id?: number;
  name?: string;
  email: string;
  accountCreated?: string;
};

const PendingRole = () => {
  const [selectedCard, setSelectedCard] = useState<UserProps[]>([]);
  const [clickCounter, setClickCounter] = useState(0);
  const setActiveTab = useNavigationStore((state) => state.setActiveTab);
  useEffect(() => setActiveTab(AvailableTabs["Pending Role"]), []);

  const { getPendingRoles } = useAuth();
  const [backendError, setBackendError] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [users, setUsers] = useState<UserProps[]>([]);

  useEffect(() => {
    const token = Cookies.get("token");

    const getRoles = async () => {
      const data: UserProps[] = await getPendingRoles({
        setBackendError,
        setIsFetching,
        token,
      });

      setUsers(data);
    };

    getRoles();
  }, []);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (backendError) {
    return <div>Error {backendError}</div>;
  }

  return (
    <div className="flex gap-3 flex-wrap pb-7">
      {users.map((data) => (
        <PendingRoleCard
          accountCreated={data.accountCreated}
          email={data.email}
          name={data.name}
          setClickCounter={setClickCounter}
          setSelectedCard={setSelectedCard}
          key={data.id}
        />
      ))}

      {clickCounter > 0 && (
        // <Button className="fixed bottom-5 right-3 md:right-10">Create</Button>
        <PendingRoleAssign />
      )}
    </div>
  );
};

type PendingRoleCardProps = {
  setSelectedCard: React.Dispatch<React.SetStateAction<UserProps[]>>;
  setClickCounter: React.Dispatch<React.SetStateAction<number>>;
  name?: string;
  accountCreated?: string;
  email: string;
};

const PendingRoleCard: FC<PendingRoleCardProps> = ({
  setSelectedCard,
  setClickCounter,
  accountCreated,
  email,
  name,
}) => {
  const [isClicked, setIsClicked] = useState(false);

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
    const newArr: UserProps[] = [{ email }];
    setSelectedCard((prev) => [...prev, ...newArr]);
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
      <p className="md:text-sm text-xs">Account Creation: {accountCreated}</p>
      <p className="md:text-sm text-xs">Department: IT</p>
    </div>
  );
};

export default PendingRole;
