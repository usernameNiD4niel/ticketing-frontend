import { filterTableAssigned } from "@/app/actions";
import DatePicker from "@/components/helper/date-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectCustom from "@/components/utils/SelectCustom";
import { AssignedTickets } from "@/constants/types";
import { PHILIPPINE_TIME_ZONE } from "@/constants/variables";
import { format } from "date-fns-tz";
import Cookies from "js-cookie";
import { FC, useState } from "react";
import DropdownStatus from "../feed/dropdown-status";

type FilterFormProps = {
  setData: React.Dispatch<React.SetStateAction<AssignedTickets[]>>;
  setIsFiltering: React.Dispatch<React.SetStateAction<boolean>>;
  module: string;
};

const getAllTickets = async (token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-my-tickets`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((data) => data.json())
    .catch((error) => error);

  return response["my-tickets"] as AssignedTickets[];
};

const FilterForm: FC<FilterFormProps> = ({
  setData,
  setIsFiltering,
  module,
}) => {
  const [date, setDate] = useState<Date | undefined>();

  const token = Cookies.get("token");

  const handleFormAction = async (formData: FormData) => {
    const priority = formData.get("priority")?.toString();
    const status = formData.get("status")?.toString();
    const sort_by = formData.get("sort_by")?.toString();
    let date_ = null;

    if (date) {
      const formattedDate = format(date, "MM-dd-yyyy", {
        timeZone: PHILIPPINE_TIME_ZONE,
      });
      date_ = formattedDate;
    }

    let params = "";

    if (priority && priority !== null) {
      params += `priority=${priority}&`;
    }

    if (status && status !== null) {
      params += `status=${status}&`;
    }

    if (date_ && date_ !== null) {
      params += `date=${date_}&`;
    }

    if (sort_by && sort_by !== null) {
      let sort = "";

      // "Date Created", "Ticket Number", "Requestor"

      if (sort_by === "Date Created") {
        sort = "created_at";
      } else if (sort_by === "Ticket Number") {
        sort = "id";
      } else {
        sort = "name";
      }

      params += `sort_by=${sort}`;
    }

    params = params.substring(0, params.length);

    params = params + `&module=${module}`;

    console.log(`params ::: ${params}`);

    const param = new FormData();
    param.append("params", params);

    const data = await filterTableAssigned(param);
    setData(data);
    setIsFiltering(true);
  };

  const handleViewAll = async () => {
    const data_ = await getAllTickets(token!);

    setData(data_);
    setIsFiltering(true);
  };

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Filter Ticket</h4>
        <p className="text-sm text-muted-foreground">
          Press enter or click <span className="font-semibold">Filter</span> to
          take effect your filtering
        </p>
      </div>
      <form className="grid gap-2" action={handleFormAction}>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="priority">Priority</Label>
          {/* <Input
            id="priority"
            className="col-span-2 h-8"
            placeholder="Medium"
            name="priority"
          /> */}

          <DropdownStatus
            filter_by="priority"
            items={["LOW", "MEDIUM", "HIGH"]}
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="status">Status</Label>
          {/* <Input
            id="status"
            className="col-span-2 h-8"
            placeholder="CLOSED"
            name="status"
          /> */}
          <DropdownStatus
            filter_by="status"
            items={["OPEN", "CLOSED", "RE-OPENED", "EXPIRED", "RESOLVED"]}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="status">
            Date <span className="text-gray-500">eg. 11-01-2023</span>
          </Label>
          <DatePicker setDate={setDate} date={date} />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="sort_by">Sort By</Label>
          <SelectCustom
            items={["Date Created", "Ticket Number", "Status", "Priority"]}
            name="sort_by"
            placeholder="Sort column"
            key={"SelectCustomFilterFormAssignedTickets"}
          />
        </div>
        <div className="w-full mt-8 flex flex-col gap-y-3">
          <Button>Filter</Button>
          <Button variant="ghost" type="button" onClick={handleViewAll}>
            View All
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FilterForm;
