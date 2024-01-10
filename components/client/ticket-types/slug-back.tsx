"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MdArrowBack } from "react-icons/md";

export default function SlugBack() {
  const router = useRouter();

  function handleRedirect() {
    router.back();
  }

  return (
    <Button
      variant={"link"}
      className="space-x-1 text-base"
      onClick={handleRedirect}
    >
      <span className="text-lg">
        <MdArrowBack />
      </span>{" "}
      <span>Back</span>
    </Button>
  );
}
