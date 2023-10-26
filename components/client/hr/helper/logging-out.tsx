"use client";
import Cookies from "js-cookie";
import { AlertDialogAction } from "@/components/ui/alert-dialog";
import Link from "next/link";

const LoggingOut = () => {
  const handleLoggingOut = () => {
    Cookies.remove("token");
    Cookies.remove("email");
    Cookies.remove("name");
    Cookies.remove("hr_access_level");
    Cookies.remove("it_access_level");
  };

  return (
    <AlertDialogAction onClick={handleLoggingOut}>
      <Link href={"/login"}>Continue</Link>
    </AlertDialogAction>
  );
};

export default LoggingOut;
