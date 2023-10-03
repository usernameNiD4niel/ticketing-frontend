"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Payment } from "@/constants/types";
import Cookies from "js-cookie";
import { FC, useRef } from "react";

type FilterFormProps = {
  setData: React.Dispatch<React.SetStateAction<Payment[]>>;
};

type RequestHelper = {
  champion?: string;
  status?: string;
  date?: string;
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
      },
      body: JSON.stringify(request),
    }
  )
    .then((data) => data.json())
    .catch((error) => error);

  return response.tickets;
};

const FilterForm: FC<FilterFormProps> = ({ setData }) => {
  const championRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const champion = championRef.current?.value.toUpperCase();
    const status = statusRef.current?.value.toUpperCase();
    const date = dateRef.current?.value.toUpperCase();

    const request: RequestHelper = {
      champion,
      status,
      date,
    };

    fetchedData(request);

    console.log("request: ", request);
  };

  const fetchedData = async (request: RequestHelper) => {
    const token = Cookies.get("token");

    const serverData = await updateTable(token!, request);

    console.log("response: ", serverData);

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
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            className="col-span-2 h-8"
            placeholder="09-13-2023"
            ref={dateRef}
            name="date"
          />
        </div>
        <Button>Filter</Button>
      </form>
    </div>
  );
};

export default FilterForm;
