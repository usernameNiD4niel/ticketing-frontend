import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FeedTicketProps } from "@/constants/types";
import { FC } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import DisplayForm from "./DisplayForm";
import { getChampions } from "@/endpoints";
import { cookies } from "next/headers";
import { Toaster } from "../ui/toaster";

type EditCardProps = {
  ticketNumber: string;
  ticket: FeedTicketProps | null;
  isTicketOwner: boolean;
};

const EditCard: FC<EditCardProps> = async ({
  ticketNumber,
  ticket,
  isTicketOwner,
}) => {
  const token = cookies().get("token")?.value;

  const champions = await getChampions(token!);

  return (
    <div className="absolute top-[80px] py-4 mb-2 right-0 text-2xl flex bg-stone-900 text-stone-50 hover:bg-stone-900/90 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-50/90 rounded-full w-28 h-12 items-center justify-center hover:cursor-pointer">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className="text-center flex items-center justify-center rounded-full w-12 h-12"
            variant="noVariant"
          >
            <span className="text-xl">
              <AiOutlineEdit />
            </span>
            Edit
          </Button>
        </AlertDialogTrigger>
        <div className="overflow-y-auto">
          <AlertDialogContent className="overflow-y-auto">
            <AlertDialogHeader>
              <AlertDialogTitle>Edit Ticket {ticketNumber}</AlertDialogTitle>
              <AlertDialogDescription>
                This will be publicly edit the ticket information.
              </AlertDialogDescription>
              <DisplayForm
                ticket={ticket}
                isTicketOwner={isTicketOwner}
                champions={champions}
              />
              <Toaster />
            </AlertDialogHeader>
          </AlertDialogContent>
        </div>
      </AlertDialog>
    </div>
  );
};

export default EditCard;
