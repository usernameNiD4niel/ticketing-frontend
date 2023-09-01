"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { AiOutlineArrowRight } from "react-icons/ai";

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
  const router = useRouter();

  const handleCardAction = () => {
    router.push(`/department/${url}`);
  };

  return (
    <Card
      className="w-full md:max-w-[350px] group hover:cursor-pointer"
      onClick={handleCardAction}
    >
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
      {/* <CardFooter className="flex justify-between ">
        <Button className="w-full flex gap-x-2">
          View <AiOutlineArrowRight />
        </Button>
      </CardFooter> */}
    </Card>
  );
};
