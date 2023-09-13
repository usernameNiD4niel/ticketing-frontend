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
import { FC } from "react";
import { LoadingButton } from "./LoadingButton";

type AlertDialogProps = {
  showAlertDialog: boolean;
  isLoadingButton: boolean;
  handleResetContinue: React.MouseEventHandler<HTMLButtonElement>;
  handleResetPassword: React.MouseEventHandler<HTMLButtonElement>;
};

export const AlertDialogDemo: FC<AlertDialogProps> = ({
  showAlertDialog,
  isLoadingButton,
  handleResetContinue,
  handleResetPassword,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {isLoadingButton ? (
          <LoadingButton isFullWidth={true} />
        ) : (
          <Button variant="default" type="button" onClick={handleResetPassword}>
            Reset Password
          </Button>
        )}
      </AlertDialogTrigger>
      {showAlertDialog && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleResetContinue}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
};
