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
import { getChampions, getCreateTicketType } from "@/endpoints";
import { cookies } from "next/headers";
import { Toaster } from "../ui/toaster";

type EditCardProps = {
  ticketNumber: string;
  ticket: FeedTicketProps | null;
};

const EditCard: FC<EditCardProps> = async ({ ticketNumber, ticket }) => {
  const token = cookies().get("token")?.value;
  const isChampion =
    cookies().get("it_access_level")?.value.toLowerCase() === "champion"
      ? true
      : false;

  const champions = await getChampions(token!);
  const ticket_type = await getCreateTicketType(token!);

  return (
    <div className="absolute top-[135px] py-4 mb-2 right-0 text-2xl flex rounded-full  items-center justify-center">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className="text-center flex items-center justify-center gap-1 p-6 rounded-full hover:cursor-pointer bg-stone-900 text-stone-50 hover:bg-stone-900/90 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-50/90"
            variant="noVariant"
          >
            <span className="text-xl">
              <AiOutlineEdit />
            </span>
            <span>Assign Ticket</span>
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
                isChampion={isChampion}
                champions={champions}
                ticket_type={ticket_type}
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
