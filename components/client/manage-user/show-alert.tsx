"use client";

import { updateSpecificUserStatusAction } from "@/app/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface ShowAlertProps {
  id: string;
  isDeactivated: boolean;
}

export default function ShowAlert({ id, isDeactivated }: ShowAlertProps) {
  async function handleButton() {
    const { message, success } = await updateSpecificUserStatusAction(
      id,
      isDeactivated ? "active" : "deactivate"
    );

    if (success) {
      toast({
        title: "Update Success",
        description: message,
      });
    } else {
      toast({
        title: "Failed to update",
        description: message,
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={isDeactivated ? "destructive" : "success"}
          type="button"
        >
          {isDeactivated ? "Deactivate" : "Activate"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            The user account will be{" "}
            {isDeactivated ? "Deactivated" : "Activated"}. You can still revert
            the changes you made.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleButton} type="button">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
