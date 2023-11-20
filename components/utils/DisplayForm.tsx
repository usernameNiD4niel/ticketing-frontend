"use client";
import React, { FC, useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import CustomSelect from "./CustomSelect";
import { FeedTicketProps } from "@/constants/types";
import { LoadingButton } from "./LoadingButton";
import { AlertDialogAction, AlertDialogCancel } from "../ui/alert-dialog";
import useCounterStore from "@/hooks/states/useCounterStore";
import { updateActivities } from "@/app/actions";
import { useToast } from "../ui/use-toast";

type DisplayFormProps = {
  ticket: FeedTicketProps | null;
  isTicketOwner: boolean;
  champions: string[];
};

const DisplayForm: FC<DisplayFormProps> = ({
  ticket,
  isTicketOwner,
  champions,
}) => {
  const updateAction = updateActivities.bind(null, ticket!.id.toString());

  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  // ! just revalidate this
  const [unhandledTicketsCount, setUnhandledTicketsCount] = useCounterStore(
    (state) => [state.unhandledTicketsCount, state.setUnhandledTicketsCount]
  );

  const handleSubmitServerAction = async (formData: FormData) => {
    const message = await updateAction(formData);

    console.log(`this is the messsage ::: ${message}`);

    if (message) {
      console.log(`this is the messsage ::: ${message}`);
      toast({
        title: "Update success",
        description: message,
        duration: 3000,
      });
    } else {
      toast({
        title: "Update failed",
        description: "Cannot update the ticket, please try again",
        duration: 3000,
      });
    }

    setIsLoading(false);
  };

  const handleFormSubmit = () => {
    setIsLoading(true);
  };

  return (
    <form
      className="flex flex-col text-start gap-y-4 py-4"
      action={handleSubmitServerAction}
      onSubmit={handleFormSubmit}
    >
      <Label className="space-y-2">
        <span>Subject</span>
        <Input value={ticket?.subject} disabled name="subject" />
      </Label>
      <Label className="space-y-2">
        <span>Description</span>
        <Input value={ticket?.description} disabled name="description" />
      </Label>
      {!isTicketOwner && (
        <HighProfileInmate
          champions={champions}
          assignTo={ticket?.assigned_to ?? "Choose here"}
          priority={ticket?.priority ?? "Set priority here"}
        />
      )}
      <CustomSelect
        label="Status"
        selectItems={["OPEN", "CLOSE", "RESOLVED", "EXPIRED", "RE-OPENED"]}
        selectedState={ticket?.status.toUpperCase() ?? "Set status here"}
        isFullWidth={true}
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

type HighProfileInmateProps = {
  champions: string[];
  priority: string;
  assignTo: string;
};

const HighProfileInmate: FC<HighProfileInmateProps> = ({
  champions,
  assignTo,
  priority,
}) => {
  return (
    <React.Fragment>
      <CustomSelect
        label="Priority"
        selectItems={["LOW", "MEDIUM", "HIGH"]}
        selectedState={priority.toUpperCase()}
        isFullWidth={true}
      />

      {champions.length === 0 ? (
        <div>Getting champions...</div>
      ) : (
        <CustomSelect
          label="Assign To"
          selectItems={champions}
          selectedState={assignTo}
          isFullWidth={true}
        />
      )}
    </React.Fragment>
  );
};

export default DisplayForm;
