"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";

const Back = () => {
  const router = useRouter();
  return (
    <Button
      variant={"link"}
      className="flex items-center font-medium gap-x-1 md:gap-x-2 text-xs md:text-sm p-0"
      onClick={() => router.back()}
    >
      <span className="text-lg md:text-2xl">
        <IoMdArrowBack />
      </span>{" "}
      BACK
    </Button>
  );
};

export default Back;
