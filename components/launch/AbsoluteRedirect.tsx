"use client";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

interface AbsoluteRedirectProps {
  cardTitle: string;
  catalyst: string;
}

const AbsoluteRedirect: FC<AbsoluteRedirectProps> = ({
  cardTitle,
  catalyst,
}) => {
  const router = useRouter();

  const handleRedirection = () => {
    router.push("http://10.10.1.120:3001/hr/dashboard");
  };

  return (
    <CardHeader onClick={handleRedirection}>
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
  );
};

export default AbsoluteRedirect;
