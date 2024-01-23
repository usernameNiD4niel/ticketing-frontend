"use client";
import updateTicketStatusAction from "@/app/actions/update-ticket-status-action";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { IoClose, IoFolderOpenOutline } from "react-icons/io5";
import { TbMessageCancel } from "react-icons/tb";

interface DispalyButtonsProps {
  status: string;
  id: number;
  isNoChampion: boolean;
}

export default function DispalyButtons({
  status,
  id,
  isNoChampion,
}: DispalyButtonsProps) {
  const router = useRouter();
  const role = Cookies.get("it_access_level")?.toLowerCase();

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

  async function handleOpenClick() {
    const { message, success } = await updateTicketStatusAction("open", id);
    displayFeedback(message, success);
  }

  async function handleCloseClick() {
    const { message, success } = await updateTicketStatusAction("closed", id);
    displayFeedback(message, success);
    if (success && role !== "requestor") {
      router.back();
    }
  }

  async function handleCancelClick() {
    const { message, success } = await updateTicketStatusAction(
      "cancelled",
      id
    );
    displayFeedback(message, success);
    if (success && role !== "requestor") {
      router.back();
    }
  }

  function content() {
    if (status === "open") {
      return (
        <>
          <Button
            variant={"noVariant"}
            onClick={handleCancelClick}
            className="text-center flex items-center justify-center gap-1 p-6 rounded-full hover:cursor-pointer bg-stone-900 text-stone-50 hover:bg-stone-900/90 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-50/90"
          >
            <span className="text-xl">
              <TbMessageCancel />
            </span>
            Cancel Ticket
          </Button>
          {isNoChampion && (
            <Button
              onClick={handleCloseClick}
              variant={"noVariant"}
              className="text-center flex items-center justify-center gap-1 p-6 rounded-full hover:cursor-pointer bg-stone-900 text-stone-50 hover:bg-stone-900/90 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-50/90"
            >
              <span className="text-xl">
                <IoClose />
              </span>
              Close Ticket
            </Button>
          )}
        </>
      );
    }
    return (
      <Button
        variant={"noVariant"}
        onClick={handleOpenClick}
        className="text-center flex items-center justify-center gap-1 p-6 rounded-full hover:cursor-pointer bg-stone-900 text-stone-50 hover:bg-stone-900/90 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-50/90"
      >
        <span className="text-xl">
          <IoFolderOpenOutline />
        </span>
        Open Ticket
      </Button>
    );
  }

  return <div className="w-full flex flex-col gap-2 py-3">{content()}</div>;
}
