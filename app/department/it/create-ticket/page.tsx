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
import useCounterStore from "@/hooks/states/useCounterStore";

const CreateTicket = () => {
  const [setActiveTab] = useNavigationStore((state) => [state.setActiveTab]);

  const { createTicket } = useAuth();

  //   Field Reference
  const subjectRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const name = Cookies.get("name");
  const role = Cookies.get("role");

  //   State fields error
  const [subjectError, setSubjectError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [backendError, setBackendError] = useState("");

  //   Signal
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  //   Create Toast
  const { toast } = useToast();

  const [setUnhandledTicketsCount, unhandledTicketsCount] = useCounterStore(
    (state) => [state.setUnhandledTicketsCount, state.unhandledTicketsCount]
  );
  const router = useRouter();

  useEffect(() => {
    setActiveTab(AvailableTabs["Create Ticket"]);
    if (!name) {
      router.push("/login");
      return;
    }

    if (
      role?.toUpperCase() === "CHAMPION" ||
      role?.toUpperCase() === "CATALYST"
    ) {
      toast({
        title: "Navigation Error",
        description: '"Champion" and "Catalyst" are not allowed in here',
        duration: 3000,
      });
      router.back();
      return;
    }
  }, []);

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
      name,
      subject,
      description,
      priority: "unset",
      status: "open",
    });
  };

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
    setUnhandledTicketsCount(unhandledTicketsCount + 1);
  };

  return (
    <div className="w-full flex justify-center my-12 md:my-16 items-center h-[70vh]">
      <form
        className="w-full md:max-w-2xl space-y-4 flex flex-col px-4"
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
