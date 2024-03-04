import HighlightedText from "@/components/server/hr/helper/highlighted-text";
import React, { FC } from "react";

interface ContentHeaderProps {
  created_at: string;
  updated_at: string;
  assigned_to: string;
}

const ContentHeader: FC<ContentHeaderProps> = ({
  created_at,
  updated_at,
  assigned_to,
}) => {
  return (
    <>
      <div className="space-y-1">
        <h1 className="font-bold text-base md:text-2xl">
          MANPOWER REQUISITION FORM
        </h1>
        <p className="text-sm md:text-base">
          29 Pilar Street, Addition Hills, San Juan, Metro Manila 1500
        </p>
        <p className="text-sm md:text-base">Tel. 8633-3839</p>
        <p className="text-sm md:text-base">
          Assign to <HighlightedText text={assigned_to} />
        </p>
      </div>
      <div className="min-w-max">
        <p className="text-xs md:text-sm text-end">Created {created_at}</p>
        <p className="text-xs md:text-sm text-end">Update {updated_at}</p>
      </div>
    </>
  );
};

export default ContentHeader;
