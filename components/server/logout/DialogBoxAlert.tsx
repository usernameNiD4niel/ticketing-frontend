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
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

interface DialogBoxAlertProps {
  isInTheMenu: boolean;
}

const DialogBoxAlert = ({ isInTheMenu }: DialogBoxAlertProps) => {
  const router = useRouter();

  function handleLogout() {
    Cookies.remove("email");
    Cookies.remove("token");
    Cookies.remove("it_access_level");
    Cookies.remove("hr_access_level");
    Cookies.remove("name");
    router.push("/login");
  }

  return (
    <AlertDialog>
      {isInTheMenu ? (
        <AlertDialogTrigger
          className={cn(
            "w-full text-xl flex py-3 px-3 space-x-2 text-white justify-center",
            "bg-red-500 text-stone-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-stone-50 dark:hover:bg-red-900/90 rounded-md"
          )}
        >
          <span>
            <FiLogOut />
          </span>
          <span className="text-sm">Logout</span>
          {/* {isInTheMenu ? (
          <Button variant={"destructive"}>
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
        )
        } */}
        </AlertDialogTrigger>
      ) : (
        <AlertDialogTrigger
          className={cn(
            "flex rounded-full p-3 items-center justify-center gap-2 text-sm",
            "bg-red-500 text-stone-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-stone-50 dark:hover:bg-red-900/90"
          )}
        >
          <FiLogOut /> <span>Logout</span>
        </AlertDialogTrigger>
      )}
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
          <Button onClick={handleLogout}>Yes</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogBoxAlert;
