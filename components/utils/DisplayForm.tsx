"use client";
import React, { FC, useState } from "react";
import { FeedTicketProps } from "@/constants/types";
import { LoadingButton } from "./LoadingButton";
import { AlertDialogAction, AlertDialogCancel } from "../ui/alert-dialog";
import { updateActivities } from "@/app/actions";
import { useToast } from "../ui/use-toast";
import TicketTypeFields from "../client/feed/ticket-type-fields";
import HighProfileInmate from "../client/feed/high-profile-inmate";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  const handleSubmitServerAction = async (formData: FormData) => {
    const assign_to = formData.get("assign_to")?.toString();
    const ticket_type = formData.get("ticket_type")?.toString();

    if (assign_to && assign_to === "CHOOSE HERE") {
      toast({
        title: "Update failed",
        description: "Assigned to is required",
        duration: 3000,
      });
      setIsLoading(false);
      return;
    }

    if (ticket_type && ticket_type === "SELECT A TYPE") {
      toast({
        title: "Update failed",
        description: "Ticket type is required",
        duration: 3000,
      });
      setIsLoading(false);
      return;
    }

    if (isChampion) {
      const name = Cookies.get("name")!.toString();

      formData.set("assign_to", name);
    } else if (
      ticket?.assigned_to &&
      assign_to?.toLowerCase() === ticket?.assigned_to.toLowerCase()
    ) {
      formData.set("assign_to", "");
    }

    if (
      ticket?.ticket_type?.toLowerCase() ===
      formData.get("ticket_type")?.toString().toLowerCase()
    ) {
      formData.set("ticket_type", "");
    }

    const message = await updateAction(formData);

    if (message) {
      if (isChampion) {
        router.back();
      }
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
        assignTo={ticket?.assigned_to ?? ""}
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
