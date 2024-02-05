"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { IoArrowBackOutline } from "react-icons/io5";

export default function RedirectBack() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant={"link"}
      className="space-x-1"
    >
      <span className="text-xl">
        <IoArrowBackOutline />
      </span>{" "}
      <span className="text-lg">Back</span>
    </Button>
  );
}
