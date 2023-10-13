"use client";
import React, { FC, useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import CustomSelect from "./CustomSelect";
import { FeedTicketProps } from "@/constants/types";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth";
import { LoadingButton } from "./LoadingButton";
import { AlertDialogAction, AlertDialogCancel } from "../ui/alert-dialog";
import useCounterStore from "@/hooks/states/useCounterStore";

type DisplayFormProps = {
  ticket: FeedTicketProps | null;
  isTicketOwner: boolean;
};

const DisplayForm: FC<DisplayFormProps> = ({ ticket, isTicketOwner }) => {
  const [priority, setPriority] = useState(ticket!.priority);
  const [assignTo, setAssignTo] = useState(ticket!.assigned_to);
  const [status, setStatus] = useState(ticket!.status);
  const [champions, setChampions] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const priority_ = ticket?.priority;
  const assigned_to_ = ticket?.assigned_to;
  const status_ = ticket?.status;

  const router = useRouter();

  const token = Cookies.get("token");

  const [unhandledTicketsCount, setUnhandledTicketsCount] = useCounterStore(
    (state) => [state.unhandledTicketsCount, state.setUnhandledTicketsCount]
  );

  const { getAllChampions, updateSpecifiedTicketField } = useAuth();

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    const getChampions = async () => {
      const champions_ = await getAllChampions({
        setChampions,
        setError,
        token,
      });
      if (Array.isArray(champions_)) {
        setChampions(champions_);
      }

      setIsLoading(false);
    };

    getChampions();
  }, []);

  const handleUpdateTicket = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const request: Response = {
      status: status || "",
      assigned_to: assignTo || "",
      priority: priority || "",
    };

    const id = ticket?.id;
    if (id) {
      setIsLoading(true);
      if (isTicketOwner) {
        if (status === status_) {
          setIsLoading(false);
          return;
        }

        updateSpecifiedTicketField({
          token,
          id,
          setError,
          setIsLoading,
          status,
        });

        setUnhandledTicketsCount(unhandledTicketsCount - 1);
      } else {
        if (
          status_ === status &&
          assigned_to_ === assignTo &&
          priority_ === priority
        ) {
          setIsLoading(false);
          return;
        }

        updateSpecifiedTicketField({
          token,
          id,
          setError,
          setIsLoading,
          request,
        });

        if (status_ !== status) {
          setUnhandledTicketsCount(unhandledTicketsCount - 1);
        }
      }
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <form
      className="flex flex-col text-start gap-y-4 py-4"
      onSubmit={handleUpdateTicket}
    >
      <Label className="space-y-2">
        <span>Subject</span>
        <Input value={ticket?.subject} disabled />
      </Label>
      <Label className="space-y-2">
        <span>Description</span>
        <Input value={ticket?.description} disabled />
      </Label>
      {!isTicketOwner && (
        <HighProfileInmate
          assignTo={assignTo}
          champions={champions}
          priority={priority}
          setAssignTo={setAssignTo}
          setPriority={setPriority}
        />
      )}
      <CustomSelect
        label="Status"
        placeHolder="Status"
        selectItems={["OPEN", "CLOSE", "RESOLVED", "EXPIRED", "RE-OPENED"]}
        selectedState={ticket!.status.toUpperCase()}
        isFullWidth={true}
        setSelectedState={setStatus}
      />

      <div className="w-full flex justify-end items-center gap-x-3 mt-3">
        <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
        {isLoading ? (
          <LoadingButton isFullWidth={false} />
        ) : (
          <AlertDialogAction type="submit">Update</AlertDialogAction>
        )}
      </div>
    </form>
  );
};

type Response = {
  status?: string;
  assigned_to?: string;
  priority?: string;
};

type HighProfileInmateProps = {
  priority: string;
  setPriority: React.Dispatch<React.SetStateAction<string>>;

  champions: string[];
  assignTo: string;
  setAssignTo: React.Dispatch<React.SetStateAction<string>>;
};

const HighProfileInmate: FC<HighProfileInmateProps> = ({
  assignTo,
  champions,
  priority,
  setAssignTo,
  setPriority,
}) => {
  return (
    <React.Fragment>
      <CustomSelect
        label="Priority"
        placeHolder="Priority"
        selectItems={["LOW", "MEDIUM", "HIGH"]}
        selectedState={priority.toUpperCase()}
        isFullWidth={true}
        setSelectedState={setPriority}
      />

      {champions.length === 0 ? (
        <div>Getting champions...</div>
      ) : (
        <CustomSelect
          label="Assign To"
          placeHolder="Choose champion for this ticket"
          selectItems={champions}
          selectedState={assignTo}
          setSelectedState={setAssignTo}
          isFullWidth={true}
        />
      )}
    </React.Fragment>
  );
};

export default DisplayForm;
