import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import React, { FC } from "react";

interface ContentEquipmentProps {
  laptop: boolean;
  access_card: boolean;
  table_drawer: boolean;
}

const ContentEquipment: FC<ContentEquipmentProps> = ({
  access_card,
  laptop,
  table_drawer,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <Label className="flex items-center gap-x-2 text-xs md:text-sm">
        <Checkbox checked={laptop} />
        <span>Laptop</span>
      </Label>
      <Label className="flex items-center gap-x-2 text-xs md:text-sm">
        <Checkbox checked={access_card} />
        <span>Access Card</span>
      </Label>
      <Label className="flex items-center gap-x-2 text-xs md:text-sm">
        <Checkbox checked={table_drawer} />
        <span>Table/Drawer</span>
      </Label>
    </div>
  );
};

export default ContentEquipment;
