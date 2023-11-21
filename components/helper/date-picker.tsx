import * as React from "react";
import { Calendar } from "../ui/calendar";
import { PHILIPPINE_TIME_ZONE } from "@/constants/variables";
import { format } from "date-fns-tz";

interface DatePickerProps {
  date?: Date;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export default function DatePicker({ setDate, date }: DatePickerProps) {
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border z-10 w-full"
    />
  );
}
