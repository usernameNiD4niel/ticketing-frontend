import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FC } from "react";
import { AssignedTickets } from "@/constants/types";
import FilterForm from "./filter-form";
import { CgSortAz } from "react-icons/cg";

type FilterPopoverProps = {
  setData: React.Dispatch<React.SetStateAction<AssignedTickets[]>>;
  setIsFiltering: React.Dispatch<React.SetStateAction<boolean>>;
  isClosed?: boolean;
};

const FilterPopover: FC<FilterPopoverProps> = ({
  setData,
  setIsFiltering,
  isClosed,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" type="button" className="text-2xl">
          <CgSortAz />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[190px]">
        <FilterForm
          setData={setData}
          setIsFiltering={setIsFiltering}
          isClosed={isClosed}
        />
      </PopoverContent>
    </Popover>
  );
};

export default FilterPopover;
