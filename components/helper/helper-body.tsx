"use client";
import React, { FC, useState } from "react";
import AssignDialogDropdown from "./assign-dialog-dropdown";
import StatusDialogDropdown from "./status-dialog-dropdown";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { updateStatusAndAssignTo } from "@/endpoints/requested-manpower";
import { ChampionsResponse, StatusAndAssignTo } from "@/constants/hr/types";

interface HelperBodyProps {
  champions: ChampionsResponse[];
  statusAndAssignTo: StatusAndAssignTo;
  id: string;
}

const HelperBody: FC<HelperBodyProps> = ({
  champions,
  id,
  statusAndAssignTo,
}) => {
  const duplicateStatus = statusAndAssignTo.status;
  const duplicateAssignTo = statusAndAssignTo.assign_to;
  const [selected, setSelected] = useState(duplicateStatus);
  const [selectedAssigned, setSelectedAssigned] = useState(
    duplicateAssignTo ? duplicateAssignTo : "Choose champion"
  ); // Current champion assigned or null (means no champion assign yet)

  const { toast } = useToast();
  const router = useRouter();

  const getAssigned = () => {
    if (
      selectedAssigned === "Choose champion" ||
      selectedAssigned === duplicateAssignTo
    ) {
      return null;
    }

    return selectedAssigned;
  };

  const getStatus = () => {
    if (selected === duplicateStatus) {
      return null;
    }
    return selected;
  };

  const handleSubmit = async () => {
    const token = Cookies.get("token");
    const data: StatusAndAssignTo = {
      assign_to: getAssigned(),
      status: getStatus(),
    };

    const message = await updateStatusAndAssignTo(token!, id, data);

    if (message) {
      toast({
        title: "Update Success",
        description: message,
        duration: 3000,
      });
      router.refresh();
    } else {
      toast({
        title: "Update Failed",
        description: "Cannot update the status and assign to, please try again",
        duration: 3000,
      });
    }
  };

  return (
    <>
      <AssignDialogDropdown
        item={champions}
        setItem={setSelectedAssigned}
        selectedAssigned={selectedAssigned}
      />
      <StatusDialogDropdown item={selected} setItem={setSelected} />
      <DialogFooter className="flex gap-2 items-center pt-4 w-full">
        <DialogClose asChild>
          <Button variant={"ghost"} className="w-full md:w-auto">
            Cancel
          </Button>
        </DialogClose>
        <DialogClose
          asChild
          disabled={
            duplicateStatus === selected &&
            duplicateAssignTo === selectedAssigned
          }
        >
          <Button
            onClick={handleSubmit}
            className="w-full md:w-auto"
            disabled={
              duplicateStatus === selected &&
              duplicateAssignTo === selectedAssigned
            }
          >
            Submit
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};

export default HelperBody;
