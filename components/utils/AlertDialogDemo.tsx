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
import { useMemo, useState } from "react";
import { postUpdatePassword } from "@/endpoints";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

export const AlertDialogDemo = () => {
  const [error, setError] = useState("");
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const router = useRouter();

  const { toast } = useToast();

  const handleResettingPassword = () => {
    const newPassword = localStorage.getItem("newPassword");
    const confirmPassword = localStorage.getItem("confirmPassword");

    if (!newPassword) {
      setError("New Password field is required");
      return;
    }

    if (!confirmPassword) {
      setError("Confirm Password field is required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password doesn't match");
      return;
    }

    // TODO: the user enters a valid password and confirm password
    setError("");
    setShowAlertDialog(true);
  };

  const handleChangingPassword = async () => {
    // TODO: update the users password
    const newPassword = localStorage.getItem("newPassword")!;
    const email = localStorage.getItem("email")!;

    const { message, success } = await postUpdatePassword({
      email,
      newPassword,
    });

    console.log(`message ::: ${message}`);
    console.log(`${email} ::: ${newPassword}`);

    if (success) {
      toast({
        title: "Update Success",
        description: message,
      });
      localStorage.clear();
      router.refresh();
    } else {
      toast({
        title: "Update Failed",
        description: message,
      });
    }
  };

  return (
    <>
      {error && error.length > 0 && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="default"
            type="button"
            onClick={handleResettingPassword}
          >
            Reset Password
          </Button>
        </AlertDialogTrigger>
        {showAlertDialog && (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                By clicking continue, you must not forget your new password and
                you should use that when logging in here.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleChangingPassword}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        )}
      </AlertDialog>
    </>
  );
};
