"use client";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/utils/LoadingButton";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignOut = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const handleLogout = () => {
    setIsLoggingOut(true);
    Cookies.remove("email");
    Cookies.remove("token");
    Cookies.remove("it_access_level");
    Cookies.remove("hr_access_level");
    Cookies.remove("name");
    localStorage.clear();
    router.push("/login");
  };

  return isLoggingOut ? (
    <LoadingButton isFullWidth={true} />
  ) : (
    <Button
      variant={"ghost"}
      className="w-full text-xs md:text-sm text-start"
      onClick={handleLogout}
    >
      Sign Out
    </Button>
  );
};

export default SignOut;
