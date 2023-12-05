"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";

interface DialogBoxAlertProps {
  isInTheMenu: boolean;
}

const DialogBoxAlert = ({ isInTheMenu }: DialogBoxAlertProps) => {
  function handleLogout() {
    Cookies.remove("email");
    Cookies.remove("token");
    Cookies.remove("it_access_level");
    Cookies.remove("hr_access_level");
    Cookies.remove("name");
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {isInTheMenu ? (
          <Button
            variant={"destructive"}
            className="w-full text-xl flex py-3 px-3 space-x-2 text-white"
          >
            <span>
              <FiLogOut />
            </span>
            <span className="text-sm">Logout</span>
          </Button>
        ) : (
          <Button
            className=" rounded-full space-x-2 py-2"
            variant="destructive"
          >
            <FiLogOut /> <span>Logout</span>
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you really want to logout?</AlertDialogTitle>
          <AlertDialogDescription>
            If you want to logout click continue and you will be redirected to
            the login page.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <Link href="/login" onClick={handleLogout} as={"/login"}>
            <Button className="w-full md:w-fit">Yes</Button>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogBoxAlert;
