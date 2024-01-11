"use client";
import React, { FC, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import CustomSelect from "./CustomSelect";
import { FeedTicketProps } from "@/constants/types";
import { LoadingButton } from "./LoadingButton";
import { AlertDialogAction, AlertDialogCancel } from "../ui/alert-dialog";
import { updateActivities } from "@/app/actions";
import { useToast } from "../ui/use-toast";
import Cookies from "js-cookie";
import SelectCustom from "./SelectCustom";

type DisplayFormProps = {
  ticket: FeedTicketProps | null;
  isTicketOwner: boolean;
  champions: string[];
  ticket_type: string[];
  isCatalyst: boolean;
};

const DisplayForm: FC<DisplayFormProps> = ({
  ticket,
  isTicketOwner,
  champions,
  ticket_type,
  isCatalyst,
}) => {
  const updateAction = updateActivities.bind(null, ticket!.id.toString());

  const [isLoading, setIsLoading] = useState(false);

  const selectableItems = ["CLOSED", "OPEN", "CANCELLED"];

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
        selectItems={selectableItems} // we remove the open here because we added it manually inside
        selectedState={ticket?.status.toUpperCase() ?? "Set status here"}
        isFullWidth={true}
      />

      {ticket && isCatalyst && (
        <Label className="space-y-2">
          <span>Ticket Type</span>
          <SelectCustom
            items={ticket_type}
            name="ticket_type"
            placeholder="Select a ticket type"
            defaultValue={ticket.ticket_type?.trim() ?? ""}
            isRequired={false}
            width="w-full"
            key={"UtilsDisplayFormLabelSelectCustomTicketType"}
          />
          {/* 
          <SelectCustom
              items={ticket_types}
              name="ticket_type"
              placeholder="Select ticket type"
              isRequired
              width="w-full"
              key={"CreateTicketForm"}
            /> */}
        </Label>
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
  champions: string[];
  priority: string;
  assignTo: string;
};

const HighProfileInmate: FC<HighProfileInmateProps> = ({
  champions,
  assignTo,
  priority,
}) => {
  const name = Cookies.get("name");

  const role = Cookies.get("it_access_level")?.toLowerCase();

  let champs =
    role === "champion"
      ? [name!]
      : role === "catalyst"
      ? [...champions, name!]
      : champions;

  return (
    <React.Fragment>
      <CustomSelect
        label="Priority"
        selectItems={["LOW", "MEDIUM", "HIGH"]}
        selectedState={
          priority.toUpperCase() === "UNSET" ? "LOW" : priority.toUpperCase()
        }
        isFullWidth={true}
      />

      {champions.length === 0 ? (
        <div>Getting champions...</div>
      ) : (
        <CustomSelect
          label="Assign To"
          selectItems={champs}
          selectedState={assignTo}
          isFullWidth={true}
        />
      )}
    </React.Fragment>
  );
};

export default DisplayForm;
