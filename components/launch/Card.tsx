import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import AbsoluteRedirect from "./AbsoluteRedirect";

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
  return (
    <Card
      className="w-full md:max-w-[350px] group hover:cursor-pointer"
      // onClick={handleCardAction}
    >
      {url === "hr/dashboard" ? (
        <AbsoluteRedirect cardTitle={cardTitle} catalyst={catalyst} />
      ) : (
        <Link href={`/department/${url}`}>
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
