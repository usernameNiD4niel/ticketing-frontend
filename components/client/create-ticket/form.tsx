"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import React, { useState } from "react";
import { LoadingButton } from "@/components/utils/LoadingButton";
import { postTicket } from "@/app/actions";
import { useRouter } from "next/navigation";
import CreateTicketCombo from "@/components/utils/CreateTicketCombo";

interface CreateTicketFormProps {
  locations: string[];
  accessLevel: string;
}

export default function CreateTicketForm({
  locations,
  accessLevel,
}: CreateTicketFormProps) {
  const { toast } = useToast();
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const router = useRouter();

  const [locationError, setLocationError] = useState("");

  const defaultContact = localStorage.getItem("contact")?.toString() || "";

  // Server action, posting a ticket to a server
  const formActionSubmit = async (formData: FormData) => {
    const location = localStorage.getItem("location")?.toString();

    if (!location) {
      setIsLoadingButton(false);
      setLocationError("You must provide a location");
      return;
    }

    formData.append("location", location);

    const { success, message, id } = await postTicket(formData);

    if (success) {
      localStorage.setItem(
        "contact",
        formData.get("contact")?.toString() || ""
      );

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

      {accessLevel !== "requestor" && accessLevel !== "unset" && (
        <Label className="flex flex-col gap-y-2">
          <span className="text-sm">Requestor</span>
          <Input
            placeholder="Enter your temporary name"
            required
            name="requestor"
          />
        </Label>
      )}

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
