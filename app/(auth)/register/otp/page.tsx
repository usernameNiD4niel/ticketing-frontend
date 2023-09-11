"use client";
import React, { useEffect, useState } from "react";
import CardOtp from "@/components/otp/CardOtp";
import useRegisterStore from "@/hooks/states/useRegisterStore";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Otp = () => {
  const [reset, userData] = useRegisterStore((state) => [
    state.reset,
    state.userData,
  ]);
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      router.push("/");
    } else if (!userData.name) {
      router.push("/register");
    }

    setIsHydrating(false);

    const { otp, email, department } = userData;
    setOtp(otp);
    console.log(otp, " this is otp");
    console.log(email, " this is email");
    console.log(department, " this is department");
  }, []);

  if (isHydrating) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <CardOtp emailOtp={otp} reset={reset} userData={userData} />
    </div>
  );
};

export default Otp;
