import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { FC } from "react";
import { cookies } from "next/headers";
import { AiFillEdit } from "react-icons/ai";
import { getHRChampions } from "@/endpoints";
import { StatusAndAssignTo } from "@/constants/hr/types";
import HelperBody from "./helper-body";

interface EditDialogProps {
  statusAndAssignTo: StatusAndAssignTo;
  id: string;
}

const EditDialog: FC<EditDialogProps> = async ({ statusAndAssignTo, id }) => {
  const token = cookies().get("token")?.value;

  const champions = await getHRChampions(token!);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#879FFF] hover:bg-[#879FFF]/80 gap-x-2">
          <span className="text-base">
            <AiFillEdit />
          </span>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Requested Manpower</DialogTitle>
          <DialogDescription>
            When clicking the submit button make sure that the data you entered
            is correct and right so that the data to our server receives the
            expected data.
          </DialogDescription>
        </DialogHeader>
        <div className="pt-2 w-full space-y-2">
          <HelperBody
            champions={champions}
            statusAndAssignTo={statusAndAssignTo}
            id={id}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
