"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { AvailableTabs } from "@/constants/enums";
import React, { useRef, useState } from "react";
import { LoadingButton } from "@/components/utils/LoadingButton";
import TabMutator from "@/components/helper/tab-mutator";
import { postTicket } from "@/app/actions";
import { useRouter } from "next/navigation";

const CreateTicket = () => {
  const { toast } = useToast();
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const router = useRouter();

  // Server action, posting a ticket to a server
  const formActionSubmit = async (formData: FormData) => {
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
    <div className="w-full flex justify-center my-12 md:my-16 items-center h-[70vh]">
      <TabMutator availableTab={AvailableTabs["Create Ticket"]} />
      <form
        className="w-full md:max-w-2xl space-y-4 flex flex-col px-4"
        action={formActionSubmit}
        onSubmit={handleFormSubmit}
      >
        <h1 className="text-2xl font-bold">Create trouble ticket</h1>
        <Label className="flex flex-col gap-y-2">
          <span className="text-base">Subject</span>
          <Input
            placeholder="What's your problem all about?"
            required
            name="subject"
          />
        </Label>
        <Label className="flex flex-col gap-y-3">
          <span>Description</span>
          <Textarea
            placeholder="Explain what, when, how happen"
            required
            name="description"
          />
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
    </div>
  );
};

export default CreateTicket;
