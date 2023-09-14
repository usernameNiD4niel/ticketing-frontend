"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { AvailableTabs } from "@/constants/enums";
import { useAuth } from "@/hooks/auth";
import useNavigationStore from "@/hooks/states/useNavigationStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { LoadingButton } from "@/components/utils/LoadingButton";
import CreateTicketCard from "@/components/utils/CreateTicketCard";

const CreateTicket = () => {
  const [setActiveTab] = useNavigationStore((state) => [state.setActiveTab]);

  const { createTicket } = useAuth();

  //   Field Reference
  const subjectRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  //   State fields error
  const [subjectError, setSubjectError] = React.useState("");
  const [descriptionError, setDescriptionError] = React.useState("");
  const [backendError, setBackendError] = useState("");

  //   Signal
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  //   Create Toast
  const { toast } = useToast();

  const router = useRouter();

  const handleOnSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = subjectRef.current?.value;
    const description = descriptionRef.current?.value;

    if (!subject) {
      setSubjectError("Subject is required");
      return;
    }

    setSubjectError("");
    if (!description) {
      setDescriptionError("Description is required");
      return;
    }

    setDescriptionError("");

    const token = Cookies.get("token");

    if (!token) {
      toast({
        title: "Error",
        description: "Please login first",
        duration: 5000,
      });
      router.push("/login");
      return;
    }

    setIsLoadingButton(true);

    console.log(token);

    createTicket({
      setBackendError,
      setIsLoadingButton,
      handleResetBehavior,
      token,
      name: "Daniel doy ahhha",
      subject,
      description,
      priority: "unset",
      status: "open",
    });
  };

  useEffect(() => {
    setActiveTab(AvailableTabs["Create Ticket"]);
  }, []);

  const handleResetBehavior = () => {
    if (subjectRef.current) {
      subjectRef.current.value = "";
      subjectRef.current.focus();
    }

    if (descriptionRef.current) {
      descriptionRef.current.value = "";
    }

    setSubjectError("");
    setDescriptionError("");
  };

  return (
    <div className="w-full flex justify-center mt-16 items-center">
      <form
        className="w-full md:max-w-2xl space-y-4 flex flex-col"
        onSubmit={handleOnSubmitForm}
      >
        <h1 className="text-2xl font-bold">Create trouble ticket</h1>
        <Label className="flex flex-col gap-y-2">
          <span className="text-base">Subject</span>
          <Input
            placeholder="What's your problem all about?"
            ref={subjectRef}
          />
          {subjectError && (
            <span className="text-red-500 text-xs">{subjectError}</span>
          )}
        </Label>
        <Label className="flex flex-col gap-y-3">
          <span>Description</span>
          <Textarea
            placeholder="Explain what, when, how happen"
            ref={descriptionRef}
          />
          {descriptionError && (
            <span className="text-red-500 text-xs">{descriptionError}</span>
          )}
        </Label>
        {backendError && <p></p>}
        <div className="w-full flex justify-end items-center py-5 gap-x-4">
          <Button type="reset" variant="ghost" className="w-44">
            Reset
          </Button>
          {isLoadingButton ? (
            <LoadingButton isFullWidth={false} />
          ) : (
            <Button type="submit" className="w-44">
              Create
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateTicket;