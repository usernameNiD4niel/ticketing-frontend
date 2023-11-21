"use client";
import DatePicker from "@/components/helper/date-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Payment } from "@/constants/types";
import { PHILIPPINE_TIME_ZONE } from "@/constants/variables";
import { getFilteredData } from "@/endpoints";
import { format } from "date-fns-tz";
import Cookies from "js-cookie";
import { FC, useRef, useState } from "react";

type FilterFormProps = {
  setData: React.Dispatch<React.SetStateAction<Payment[]>>;
};

type RequestHelper = {
  champion: string | null;
  status: string | null;
  date: string | null;
};

type FilterRequestHelper = {
  tickets: Payment[];
};

const updateTable = async (token: string, request: RequestHelper) => {
  // Fetch all the table
  const response: FilterRequestHelper = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-tickets/filter`,
    {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }
  )
    .then((data) => data.json())
    .catch((error) => error);

  return response.tickets;
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

const FilterForm: FC<FilterFormProps> = ({ setData }) => {
  const championRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLInputElement>(null);

  const [date, setDate] = useState<Date | undefined>();

  const token = Cookies.get("token");

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const champion = championRef.current?.value.trim().toLowerCase() || null;
    const status = statusRef.current?.value.trim().toLowerCase() || null;
    let date_ = null;

    if (date) {
      const formattedDate = format(date, "MM-dd-yyyy", {
        timeZone: PHILIPPINE_TIME_ZONE,
      });
      date_ = formattedDate;
    }

    let params = "";

    if (champion && champion !== null) {
      params += `champion=${champion}&`;
    }

    if (status && status !== null) {
      params += `status=${status}&`;
    }

    if (date_ && date_ !== null) {
      params += `date=${date_}`;
    }

    params = params.substring(0, params.length);

    const filteredData = await getFilteredData(token!, params);
    setData(filteredData);
  };

  const handleViewAll = async () => {
    const data_ = await getAllTickets(token!);

    setData(data_);
  };

  const fetchedData = async (request: RequestHelper) => {
    const serverData = await updateTable(token!, request);

    setData(serverData);
  };

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Filter Ticket</h4>
        <p className="text-sm text-muted-foreground">
          Press enter to take effect your filtering
        </p>
      </div>
      <form className="grid gap-2" onSubmit={handleOnSubmit}>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="champion">Champion</Label>
          <Input
            id="champion"
            className="col-span-2 h-8"
            placeholder="Bry Bautista"
            ref={championRef}
            name="champion"
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="status">Status</Label>
          <Input
            id="status"
            className="col-span-2 h-8"
            placeholder="CLOSED"
            ref={statusRef}
            name="status"
          />
        </div>
        <div className="w-full">
          <Label htmlFor="status">
            Date <span className="text-gray-500">eg. 11-01-2023</span>
          </Label>
          <DatePicker setDate={setDate} date={date} />
          {/* <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            className="col-span-2 h-8"
            placeholder="09-13-2023"
            ref={dateRef}
            name="date"
          /> */}
        </div>
        <Button>Filter</Button>
        <Button variant="ghost" type="button" onClick={handleViewAll}>
          View All
        </Button>
      </form>
    </div>
  );
};

export default FilterForm;
