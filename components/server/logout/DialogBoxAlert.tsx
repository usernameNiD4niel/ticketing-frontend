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
import Link from "next/link";
import { FC } from "react";
import { FiLogOut } from "react-icons/fi";

type DialogBoxAlertProps = {
  onclick: () => void;
};

const DialogBoxAlert: FC<DialogBoxAlertProps> = ({ onclick }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className=" w-12 h-12 rounded-full text-2xl"
          variant="destructive"
        >
          <FiLogOut />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you really want to logout?</AlertDialogTitle>
          <AlertDialogDescription>
            If you want to logout just click continue and and you will be
            redirected to the login page. Thank you😪
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Link href="/login" className="w-full" onClick={onclick}>
            <AlertDialogAction className="w-full">Continue</AlertDialogAction>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogBoxAlert;
