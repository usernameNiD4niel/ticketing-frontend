"use client";
import Cookies from "js-cookie";
import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import AddApplication from "./add-application";
import { ApplicationTypes } from "@/constants/hr/types";

interface ContentProps {
  id: number;
}

const fetchApplication = async (id: number) => {
  const token = Cookies.get("token");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/applications/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    const application: ApplicationTypes = data.application;
    return application;
  }

  throw new Error("Cannot get the specific application");
};

const Content: FC<ContentProps> = ({ id }) => {
  const [application, setApplication] = useState<ApplicationTypes | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getApplication = async (id: number) => {
    const data = await fetchApplication(id);
    setApplication(data);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getApplication(id);
  }, [id]);

  if (isLoading) {
    return <div>Loading please wait...</div>;
  }

  return (
    <>
      <div className="w-full flex justify-end items-center">
        <AddApplication application={application} />
      </div>
      <div className="flex justify-between mt-4">
        <div className="space-y-2">
          <Link
            className="text-primary font-bold text-2xl md:text-5xl hover:underline hover:underline-offset-1"
            href={`/hr/application/${application?.id.toString() || ""}`}
          >
            {application?.position}
          </Link>
          <p className="font-bold md:text-2xl text-[#879FFF]">
            {application?.applicant}
          </p>
          <ul className="space-y-2">
            <li className="text-sm">
              <span className="font-bold">Creator</span>{" "}
              <span>{application?.creator}</span>
            </li>
            <li className="text-xs md:text-sm flex items-center gap-x-2">
              <span className="font-bold">CV / Resume</span>{" "}
              {application?.cv_resume ? (
                <Link
                  href={application.cv_resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#879FFF] font-bold underline underline-offset-1"
                >
                  View
                </Link>
              ) : (
                <div>No CV attached</div>
              )}
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-xs md:text-sm text-end w-max">
            Created at: {application?.created_at}
          </p>
          <p className="text-xs md:text-sm text-end w-max">
            Updated at: {application?.updated_at}
          </p>
        </div>
      </div>
      <div className="mt-12">
        {application?.notes && <h3 className="font-bold text-sm">Note</h3>}
        <p className="text-justify text-xs md:text-sm">
          {application?.notes ? (
            application.notes
          ) : (
            <span className="text-xs md:text-sm w-full flex items-center justify-center gap-1 h-[300px]">
              This application doesn&apos;t have a note.
            </span>
          )}
        </p>
      </div>
    </>
  );
};

export default Content;
