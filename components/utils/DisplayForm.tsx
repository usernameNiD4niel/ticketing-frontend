"use client";
import React, { FC, useState } from "react";
import { FeedTicketProps } from "@/constants/types";
import { LoadingButton } from "./LoadingButton";
import { AlertDialogAction, AlertDialogCancel } from "../ui/alert-dialog";
import { updateActivities } from "@/app/actions";
import { useToast } from "../ui/use-toast";
import TicketTypeFields from "../client/feed/ticket-type-fields";
import HighProfileInmate from "../client/feed/high-profile-inmate";

type DisplayFormProps = {
  ticket: FeedTicketProps | null;
  isChampion: boolean;
  champions: string[];
  ticket_type: string[];
};

const DisplayForm: FC<DisplayFormProps> = ({
  ticket,
  isChampion,
  champions,
  ticket_type,
}) => {
  const updateAction = updateActivities.bind(null, ticket!.id.toString());

  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  console.log(JSON.stringify(ticket_type, null, 2));

  const handleSubmitServerAction = async (formData: FormData) => {
    const message = await updateAction(formData);

    if (message) {
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
      <HighProfileInmate
        assignTo={ticket?.assigned_to ?? "Choose here"}
        champions={champions}
        isChampion={isChampion}
      />
      <TicketTypeFields
        default_tt={ticket?.ticket_type || ""}
        ticket_type={ticket_type}
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

export default DisplayForm;
