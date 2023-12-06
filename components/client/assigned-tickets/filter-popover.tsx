import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AiFillFilter } from "react-icons/ai";
import { FC } from "react";
import { AssignedTickets } from "@/constants/types";
import FilterForm from "./filter-form";

type FilterPopoverProps = {
  setData: React.Dispatch<React.SetStateAction<AssignedTickets[]>>;
  setIsFiltering: React.Dispatch<React.SetStateAction<boolean>>;
};

const FilterPopover: FC<FilterPopoverProps> = ({ setData, setIsFiltering }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" type="button">
          <AiFillFilter />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <FilterForm setData={setData} setIsFiltering={setIsFiltering} />
      </PopoverContent>
    </Popover>
  );
};

export default FilterPopover;