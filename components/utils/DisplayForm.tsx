"use client";
import React, { FC, useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import CustomSelect from "./CustomSelect";
import { FeedTicketProps } from "@/constants/types";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth";
import { Button } from "../ui/button";
import { LoadingButton } from "./LoadingButton";
import { AlertDialogAction, AlertDialogCancel } from "../ui/alert-dialog";

type DisplayFormProps = {
  ticket: FeedTicketProps | null;
  isTicketOwner: boolean;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
};

const DisplayForm: FC<DisplayFormProps> = ({
  ticket,
  isTicketOwner,
  setRefetch,
}) => {
  const [priority, setPriority] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [status, setStatus] = useState("");
  const [champions, setChampions] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const token = Cookies.get("token");

  const {
    getAllChampions,
    getSpecificTicketStatus,
    getPriority,
    getSpecificAsssignTo,
    updateSpecifiedTicketField,
  } = useAuth();

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
    };

    const id = ticket?.id;

    if (!id) {
      router.refresh();
      return;
    }

    const getStatus = async () => {
      const status_ = await getSpecificTicketStatus({
        id,
        setStatus,
        setError,
        token,
      });
      if (typeof status_ === "string") {
        setStatus(status_);
      }
    };

    const getPriorityFetcher = async () => {
      const priority_ = await getPriority({
        id,
        setPriority,
        setError,
        token,
      });
      if (typeof priority_ === "string") {
        setPriority(priority_);
      }
    };

    const getAssignedTo = async () => {
      const assignedTo_ = await getSpecificAsssignTo({
        id,
        setAssignTo,
        setError,
        token,
      });
      if (typeof assignedTo_ === "string") {
        setAssignTo(assignedTo_);
      }
    };

    getAssignedTo();
    getChampions();
    getStatus();
    getPriorityFetcher();
  }, []);

  const handleUpdateTicket = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Clicked!");

    const id = ticket?.id;
    if (id) {
      setIsLoading(true);
      if (isTicketOwner) {
        updateSpecifiedTicketField({
          token,
          id,
          setError,
          setIsLoading,
          status,
        });
      } else {
        updateSpecifiedTicketField({
          token,
          id,
          setError,
          setIsLoading,
          status,
          assigned_to: assignTo,
          priority,
        });
      }
      setRefetch((prev) => !prev);
    }
    console.log("End clicked!");
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
      {status ? (
        <CustomSelect
          label="Status"
          placeHolder="Status"
          selectItems={["OPEN", "CLOSE", "RESOLVED", "EXPIRED", "RE-OPENED"]}
          selectedState={status.toUpperCase()}
          isFullWidth={true}
          setSelectedState={setStatus}
        />
      ) : (
        <div>Getting status...</div>
      )}
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
      {priority ? (
        <CustomSelect
          label="Priority"
          placeHolder="Priority"
          selectItems={["LOW", "MEDIUM", "HIGH"]}
          selectedState={priority.toUpperCase()}
          isFullWidth={true}
          setSelectedState={setPriority}
        />
      ) : (
        <div>Getting priority...</div>
      )}
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

// ! Fetch all of the champion and display it in select assign to

export default DisplayForm;
