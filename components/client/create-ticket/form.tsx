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
}

export default function CreateTicketForm({
  locations,
  accessLevel,
  users,
  ticket_types,
}: CreateTicketFormProps) {
  const { toast } = useToast();
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const router = useRouter();

  const defaultContact = localStorage.getItem("contact")?.toString() || "";
  const defaultRequestor = localStorage.getItem("requestor")?.toString() || "";

  const [name, setName] = useState(defaultRequestor);

  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    if (accessLevel !== "requestor" && accessLevel !== "unset") {
      setName(defaultRequestor);
    }
  }, []);

  // Server action, posting a ticket to a server
  const formActionSubmit = async (formData: FormData) => {
    if (accessLevel !== "requestor" && accessLevel !== "unset") {
      if (!name) {
        setIsLoadingButton(false);
        toast({
          title: "Validation Failed",
          description: "Please try to re-login and try again",
          duration: 3000,
        });
        return;
      }
    }

    const location = localStorage.getItem("location")?.toString();

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
      localStorage.setItem(
        "contact",
        formData.get("contact")?.toString() || ""
      );

      if (accessLevel !== "requestor" && accessLevel !== "unset") {
        localStorage.setItem("requestor", name || "");
      }

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
      className="w-full md:max-w-2xl space-y-4 flex flex-col px-4"
      action={formActionSubmit}
      onSubmit={handleFormSubmit}
    >
      <h1 className="text-2xl font-bold">Create trouble ticket</h1>

      {accessLevel === "catalyst" ||
        (accessLevel === "supreme" && (
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
                placeholder="Select ticket type"
                isRequired
                width="w-full"
                key={"CreateTicketForm"}
              />
            </Label>
          </>
        ))}

      <Label className="flex flex-col gap-y-2">
        <span className="text-sm">Subject</span>
        <Input
          placeholder="What's your problem all about?"
          required
          name="subject"
        />
      </Label>

      <Label className="flex flex-col gap-y-2">
        <span>Description</span>
        <Textarea
          placeholder="Explain what, when, how happen"
          required
          name="description"
        />
      </Label>

      <Label className="flex flex-col gap-y-2">
        <span className="text-sm">Contact</span>
        <Input
          placeholder="Enter your phone number"
          name="contact"
          max={"11"}
          defaultValue={defaultContact}
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
        <CreateTicketCombo items={locations} name="location" />
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
          <Button type="submit" className="w-full md:w-44">
            Create
          </Button>
        )}
      </div>
    </form>
  );
}
