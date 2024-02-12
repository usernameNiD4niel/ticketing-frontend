"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import AbsoluteRedirect from "./AbsoluteRedirect";
import { useSearchParams } from "next/navigation";
import { toast } from "../ui/use-toast";

type CardProps = {
  cardTitle: string;
  catalyst: string;
  url: string;
};

export const CardLaunch: React.FC<CardProps> = ({
  cardTitle,
  catalyst,
  url,
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
    <Card className="w-full md:max-w-[350px] group cursor-pointer">
      {url === "hr/dashboard" ? (
        <AbsoluteRedirect cardTitle={cardTitle} catalyst={catalyst} />
      ) : (
        <Link href={`/department/${url}`} onClick={handleClickEvents}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center text-base group-hover:text-[#0B64B9] transition-colors ease-in-out duration-150">
              {cardTitle}{" "}
              <span className="text-lg group-hover:scale-125">
                <AiOutlineArrowRight />
              </span>
            </CardTitle>
            <CardDescription className="group-hover:text-[#0B64B9] transition-colors ease-in-out duration-150">
              {catalyst}
            </CardDescription>
          </CardHeader>
        </Link>
      )}
    </Card>
  );
};
