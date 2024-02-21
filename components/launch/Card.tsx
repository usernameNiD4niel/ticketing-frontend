"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import AbsoluteRedirect from "./AbsoluteRedirect";
import { useSearchParams } from "next/navigation";
import { toast } from "../ui/use-toast";
import { SiGoogledocs } from "react-icons/si";

type CardProps = {
  cardTitle: string;
  catalyst: string;
  url: string;
  manualUrl?: string;
};

export const CardLaunch: React.FC<CardProps> = ({
  cardTitle,
  catalyst,
  url,
  manualUrl
}) => {
  const searchParams = useSearchParams();
  const is_disabled = searchParams.get("disable")
    ? Boolean(searchParams.get("disable"))
    : false;
  const module_ = searchParams.get("module");

  function handleClickEvents() {
    if (is_disabled) {
      toast({
        title: "Unable to enter",
        description: "You have been disabled to enter " + module_ + " module",
        duration: 6000,
      });
    }
  }

  return (
    <Card className="w-full md:max-w-[350px] group cursor-pointer flex justify-between items-center">

      {url === "hr/dashboard" ? (
        <AbsoluteRedirect cardTitle={cardTitle} catalyst={catalyst} />
      ) : (
        <Link href={`/department/${url}`} onClick={handleClickEvents} className="w-full">
          <CardHeader>
            <CardTitle className="flex justify-between items-center text-base group-hover:text-[#0B64B9] transition-colors ease-in-out duration-150">
              {cardTitle}
            </CardTitle>
            <CardDescription className="group-hover:text-[#0B64B9] transition-colors ease-in-out duration-150">
              {catalyst}
            </CardDescription>
          </CardHeader>
        </Link>
      )}

      <Link
        href={manualUrl ?? "#"}
        target="_blank"
        className="bg-stone-100 text-stone-900 p-3 rounded-md hover:bg-stone-100/80 dark:bg-stone-800 dark:text-stone-50 dark:hover:bg-stone-800/80 me-4">
        <SiGoogledocs />
      </Link>
    </Card>
  );
};
