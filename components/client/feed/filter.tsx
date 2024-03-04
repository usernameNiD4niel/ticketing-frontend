import { filterAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FeedData } from "@/constants/hr/types";
import { FaFilter } from "react-icons/fa";

interface FilterProps {
  setData: React.Dispatch<React.SetStateAction<FeedData[]>>;
}

export default async function Filter({ setData }: FilterProps) {
  const handleActionMiddleware = async (e: FormData) => {
    const data = await filterAction(e);

    setData(data);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="py-6 border-0 outline-none">
          <FaFilter />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form
          className="grid gap-4"
          //   onSubmit={handleFormSubmit}
          action={async (e) => handleActionMiddleware(e)}
        >
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Filter</h4>
            <p className="text-sm text-muted-foreground">
              You can fill one or more field and submit.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="requisitioner">Requisitioner</Label>
              <Input
                id="requisitioner"
                className="col-span-2 h-8"
                name="requisitioner"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                className="col-span-2 h-8"
                name="department"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="position">Position</Label>
              <Input id="position" className="col-span-2 h-8" name="position" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="assignTo">Assign to</Label>
              <Input id="assignTo" className="col-span-2 h-8" name="assignTo" />
            </div>
            <div className="w-full flex flex-col gap-2 mt-2">
              <Button
                className="bg-[#879FFF] hover:bg-[#879FFF]/80"
                type="submit"
              >
                Submit
              </Button>
              <Button variant={"ghost"} type="button">
                View All
              </Button>
            </div>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
