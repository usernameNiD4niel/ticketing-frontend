"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import React, { useEffect, useState } from "react";
import { LoadingButton } from "@/components/utils/LoadingButton";
import { postTicket } from "@/app/actions";
import { useRouter } from "next/navigation";
import CreateTicketCombo from "@/components/utils/CreateTicketCombo";
import NamesCombobox from "@/components/utils/NamesCombobox";
import SelectCustom from "@/components/utils/SelectCustom";
interface CreateTicketFormProps {
  locations: string[];
  accessLevel: string;
  users: string[];
  ticket_types: string[];
  ticket_count: number;
  champions: string[];
}

export default function CreateTicketForm({
  locations,
  accessLevel,
  users,
  ticket_types,
  ticket_count,
  champions,
}: CreateTicketFormProps) {
  const { toast } = useToast();
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const router = useRouter();

  const [name, setName] = useState("");

  const [locationError, setLocationError] = useState("");
  const [location, setLocation] = useState("");

  // Server action, posting a ticket to a server
  const formActionSubmit = async (formData: FormData) => {
    if (ticket_count >= 3 && accessLevel === "requestor") {
      toast({
        title: "Validation Failed",
        description: "You reached the limit of posting ticket today",
        duration: 3000,
      });
      return;
    }

    if (accessLevel !== "requestor" && accessLevel !== "unset") {
      if (!name) {
        setIsLoadingButton(false);
        toast({
          title: "Validation Failed",
          description: "Name of the requestor is required",
          duration: 3000,
        });
        return;
      }
    }

    if (accessLevel === "catalyst" || accessLevel === "supreme") {
      const assign_to = formData.get("assign_to")?.toString();
      if (!assign_to) {
        // * Means the catalyst or supreme doesn't assign the current ticket
        toast({
          title: "Validation Error",
          description: "Assign to field is a required field",
        });
        return;
      }
    }

    if (!location) {
      setIsLoadingButton(false);
      setLocationError("You must provide a location");
      return;
    }

    formData.append("location", location);

    if (accessLevel !== "requestor" && accessLevel !== "unset") {
      formData.append("requestor", name);
    }

    const { success, message, id } = await postTicket(formData);

    if (success) {
      toast({
        title: "Ticket posting sucess",
        description: message,
        duration: 3000,
      });
      router.push(`/department/it/${id}?tabName=Create+Ticket`);
    } else {
      toast({
        title: "Ticket posting failed",
        description: "Cannot create a post, please try again",
        duration: 3000,
      });
    }
    setIsLoadingButton(false);
  };

  // Invokes first before server action
  const handleFormSubmit = () => {
    setIsLoadingButton(true);
  };

  return (
    <form
      className="flex flex-col gap-y-4 w-full"
      action={formActionSubmit}
      onSubmit={handleFormSubmit}
    >
      {(accessLevel === "catalyst" ||
        accessLevel === "supreme" ||
        accessLevel === "champion") && (
        <>
          <Label className="flex flex-col gap-y-2">
            <span className="text-sm">Requestor</span>
            <NamesCombobox setState={setName} state={name} users={users} />
          </Label>
          <Label className="flex flex-col gap-y-2">
            Ticket Type
            <SelectCustom
              items={ticket_types}
              name="ticket_type"
              isRequired
              width="w-full"
              key={"CreateTicketForm"}
              placeholder=""
            />
          </Label>
        </>
      )}

      {(accessLevel === "catalyst" || accessLevel === "supreme") && (
        <Label className="flex flex-col gap-y-2">
          Assign To
          <SelectCustom
            items={champions}
            name="assign_to"
            isRequired
            width="w-full"
            key={"CreateTicketFormAssignTo"}
            placeholder=""
          />
        </Label>
      )}

      <Label className="flex flex-col gap-y-2">
        <span className="text-sm">Subject</span>
        <Input required name="subject" />
      </Label>

      <Label className="flex flex-col gap-y-2">
        <span>Description</span>
        <Textarea required name="description" />
      </Label>

      <Label className="flex flex-col gap-y-2">
        <span className="text-sm">Contact</span>
        <Input
          name="contact"
          max={"11"}
          type="text"
          pattern="09[0-9]{9}"
          inputMode="numeric"
          maxLength={11}
          minLength={11}
          title="Pakiusap naman mag enter ka ng tamang contact number mo, maraming salamat!"
          required
        />
      </Label>

      <Label className="flex flex-col gap-y-2">
        <span className="text-sm">Location</span>
        <CreateTicketCombo
          items={locations}
          name="location"
          setValue={setLocation}
          value={location}
        />
        {locationError && locationError.length > 0 && (
          <p className="text-red-500 text-sm">{locationError}</p>
        )}
      </Label>

      <div className="w-full flex flex-col-reverse md:flex-row md:justify-end items-center py-5 gap-4">
        <Button type="reset" variant="ghost" className="w-full md:w-44">
          Reset
        </Button>
        {isLoadingButton ? (
          <div className="w-full md:w-44">
            <LoadingButton isFullWidth={true} />
          </div>
        ) : (
          <Button
            type="submit"
            className="w-full md:w-44"
            disabled={ticket_count >= 3 ? true : false}
          >
            Create
          </Button>
        )}
      </div>
    </form>
  );
}
