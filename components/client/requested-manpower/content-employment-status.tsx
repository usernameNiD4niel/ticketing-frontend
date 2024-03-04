import React, { FC } from "react";
import EmploymentStatusCheckbox from "./employment-status-checkbox";
import { cn } from "@/lib/utils";
import HighlightedText from "@/components/server/hr/helper/highlighted-text";

interface ContentEmploymentStatusProps {
  employment_status: string;
  project_duration_from?: string;
  project_duration_to?: string;
  justification?: string;
}

const ContentEmploymentStatus: FC<ContentEmploymentStatusProps> = ({
  employment_status,
  justification,
  project_duration_from,
  project_duration_to,
}) => {
  return (
    <>
      <h1 className="font-bold mb-2">EMPLOYMENT STATUS</h1>
      <div className="flex justify-between">
        <div className="space-y-3">
          <EmploymentStatusCheckbox active_status={employment_status} />
          {employment_status.toUpperCase() === "PROJECT BASED" && (
            <div className="ml-2  space-y-2">
              <p className="space-x-2">
                <span>FROM</span>
                <HighlightedText text={project_duration_from!} />
              </p>
              <p className="space-x-2">
                <span>TO</span>
                <HighlightedText text={project_duration_to!} />
              </p>
            </div>
          )}
        </div>
        <div
          className={cn(
            "max-w-sm",
            justification === "None" && "flex gap-1 items-center"
          )}
        >
          <p className="">JUSTIFICATION</p>
          <div className="w-full bg-[#879FFF] p-1 text-justify">
            <HighlightedText text={justification ?? "None"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentEmploymentStatus;
