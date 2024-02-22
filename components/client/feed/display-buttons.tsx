"use client";
import updateTicketStatusAction from "@/app/actions/update-ticket-status-action";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { IoClose, IoFolderOpenOutline } from "react-icons/io5";
import { TbMessageCancel } from "react-icons/tb";
import ConfirmationBox from "./ConfirmationBox";
import { useState } from "react";
import { LoadingButton } from "@/components/utils/LoadingButton";

interface DispalyButtonsProps {
  status: string;
  id: number;
  isNoChampion: boolean;
  hasClosedDate: boolean;
}

export default function DispalyButtons({
  status,
  id,
  isNoChampion,
  hasClosedDate,
}: DispalyButtonsProps) {
  const router = useRouter();
  const role = Cookies.get("it_access_level")?.toLowerCase();

  const [loading, setLoading] = useState(false);

  function displayFeedback(message: string, success: boolean) {
    if (success) {
      toast({
        title: "Update Success",
        description: message,
      });
    } else {
      toast({
        title: "Update Failed",
        description: message,
      });
    }
  }

  async function handleButtonClick(toStatus: string) {
    setLoading(true);
    const { message, success } = await updateTicketStatusAction(toStatus, id);
    displayFeedback(message, success);
    
    if (success && role !== "requestor") {
      router.back();
    }

    setLoading(false);
  }
  

  function content() {
    if (status === "open") {
      return (
        <>
          {!hasClosedDate && (
            <ConfirmationBox
              buttonText="Cancel Ticket"
              Icon={TbMessageCancel}
              description="If you proceed, the ticket you created will be treated like it wont exists. Are you still going to cancel the ticket?"
              handleButtonClick={() => handleButtonClick("cancelled")}
              title="Are you sure you want to cancel the ticket?"
            />
          )}
          {isNoChampion && (
            <ConfirmationBox
              buttonText="Close Ticket"
              Icon={IoClose}
              description="If you proceed, the ticket you created will be be closed and no one else could able to comment to it. Are you still going to close the ticket?"
              handleButtonClick={() => handleButtonClick("closed")}
              title="Are you sure you want to close the ticket?"
            />
          )}
        </>
      );
    }
    return (
      <Button
        variant={"noVariant"}
        onClick={() => handleButtonClick("open")}
        className="text-center flex items-center justify-center gap-1 p-6 rounded-full hover:cursor-pointer bg-stone-900 text-stone-50 hover:bg-stone-900/90 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-50/90"
      >
        <span className="text-xl">
          <IoFolderOpenOutline />
        </span>
        Open Ticket
      </Button>
    );
  }

  return (
    <>
      <div className="w-full flex flex-col gap-2 py-3">{loading ? <LoadingButton isFullWidth={false} /> : content()}</div>
    </>
  );
}
