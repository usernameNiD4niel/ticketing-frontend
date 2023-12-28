"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MdArrowBack } from "react-icons/md";
export default function BreadCrumbs() {
  const router = useRouter();

  function handleNavigation() {
    router.back();
  }

  return (
    <Button
      variant={"link"}
      onClick={handleNavigation}
      className="space-x-2 text-lg"
    >
      <MdArrowBack /> <span className="text-sm">Back</span>
    </Button>
  );
}
