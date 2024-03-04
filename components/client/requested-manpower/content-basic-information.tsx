import HighlightedText from "@/components/server/hr/helper/highlighted-text";
import React, { FC } from "react";

interface ContentBasicInformationProps {
  requisitioner: string;
  position: string;
  department: string;
  no_employees_required: string;
  position_required: string;
  project_location: string;
  position_level: string;
}

const ContentBasicInformation: FC<ContentBasicInformationProps> = ({
  department,
  no_employees_required,
  position,
  position_level,
  position_required,
  project_location,
  requisitioner,
}) => {
  return (
    <>
      <h2 className="font-bold mb-2 ">BASIC INFORMATION</h2>
      <div className="flex w-full justify-between">
        <div className="space-y-3">
          <p className="space-x-1">
            <span>REQUISITIONER</span> <HighlightedText text={requisitioner} />
          </p>

          <p className="space-x-1">
            <span>POSITION</span> <HighlightedText text={position} />
          </p>
          <p className="space-x-1">
            <span>DEPARTMENT</span> <HighlightedText text={department} />
          </p>
          <p className="space-x-1">
            <span>NO EMPLOYEES REQUIRED</span>{" "}
            <HighlightedText text={no_employees_required} />
          </p>
        </div>
        <div className="space-y-3">
          <p className="space-x-1">
            <span>POSITION REQUIRED</span>{" "}
            <HighlightedText text={position_required} />
          </p>

          <p className="space-x-1">
            <span>PROJECT LOCATION</span>{" "}
            <HighlightedText text={project_location} />
          </p>
          <p className="space-x-1">
            <span>POSITION LEVEL</span>{" "}
            <HighlightedText text={position_level} />
          </p>
        </div>
      </div>
    </>
  );
};

export default ContentBasicInformation;
