"use client";
import filterTable from "@/app/actions/filter-table";
import DatePicker from "@/components/helper/date-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectCustom from "@/components/utils/SelectCustom";
import { Payment } from "@/constants/types";
import { PHILIPPINE_TIME_ZONE } from "@/constants/variables";
import { format } from "date-fns-tz";
import Cookies from "js-cookie";
import { FC, useState } from "react";
import DropdownStatus from "./dropdown-status";

type FilterFormProps = {
  setData: React.Dispatch<React.SetStateAction<Payment[]>>;
  setIsFiltering: React.Dispatch<React.SetStateAction<boolean>>;
};

type FilterRequestHelper = {
  tickets: Payment[];
};

const getAllTickets = async (token: string) => {
  const response: FilterRequestHelper = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-tickets`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((data) => data.json())
    .catch((error) => error);

  return response.tickets;
};

const FilterForm: FC<FilterFormProps> = ({ setData, setIsFiltering }) => {
  const [date, setDate] = useState<Date | undefined>();

  const token = Cookies.get("token");

  const handleFormAction = async (formData: FormData) => {
    const champion = formData.get("champion")?.toString();
    const status = formData.get("status")?.toString();
    const sort_by = formData.get("sort_by")?.toString();
    let date_ = null;

    console.log(`the status ::: ${status}`);

    if (date) {
      const formattedDate = format(date, "MM-dd-yyyy", {
        timeZone: PHILIPPINE_TIME_ZONE,
      });
      date_ = formattedDate;
    }

    console.log(`the formatted date ::: ${date_}`);
    console.log(`the date ::: ${date}`);

    let params = "";

    if (champion && champion !== null) {
      params += `champion=${champion}&`;
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

    const data = await filterTable(params);
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
          Press enter to take effect your filtering
        </p>
      </div>
      <form className="grid gap-2" action={handleFormAction}>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="champion">Champion</Label>
          <Input
            id="champion"
            className="col-span-2 h-8"
            placeholder="Jose Rizal"
            name="champion"
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
            key={"dropdownstatusfilterform"}
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
            items={["Date Created", "Ticket Number", "Requestor"]}
            name="sort_by"
            placeholder="Sort column"
            key={"SelectCustomFilterForm"}
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
