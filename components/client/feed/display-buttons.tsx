"use client";
import { Button } from "@/components/ui/button";
import { IoClose, IoFolderOpenOutline } from "react-icons/io5";
import { TbMessageCancel } from "react-icons/tb";

interface DispalyButtonsProps {
  status: string;
}

export default function DispalyButtons({ status }: DispalyButtonsProps) {
  function handleOpenClick() {
    console.log("the ticket is now open");
  }

  function handleCloseClick() {
    console.log("The ticket is now closed");
  }

  function handleCancelClick() {
    console.log("The ticket is now cancelled");
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
        Open
      </Button>
    );
  }

  return <div className="w-full flex flex-col gap-2 py-3">{content()}</div>;
}
