"use client";
import React, { FC, useState } from "react";
import Content from "./Content";
import ApplicationList from "./application-list";
import { ApplicationTypes } from "@/constants/hr/types";

interface BodyProps {
  application: ApplicationTypes[];
}

const Body: FC<BodyProps> = ({ application }) => {
  const [id, setId] = useState(application[0].id);

  return (
    <>
      <ApplicationList applications={application} setId={setId} id={id} />
      <div className="hidden lg:flex flex-col w-full h-[85vh] py-6 px-12 rounded-lg border-2 overflow-y-auto bg-white text-[#879FFF] border-[#879FFF]">
        <Content id={id} />
      </div>
    </>
  );
};

export default Body;
