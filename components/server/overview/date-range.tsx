"use client"

import * as React from "react"
import { addDays, format, startOfMonth } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format as formatWithTimeZone, zonedTimeToUtc } from "date-fns-tz";

export default function DateRange({
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    const timezone = "Asia/Manila";
    const [date, setDate] = React.useState<DateRange | undefined>()

    React.useEffect(() => {
        if(date) {
            if(date.from) {
                const from = formatWithTimeZone(date.from, "LLL dd, y", {timeZone: timezone});
                window.localStorage.setItem("from", from);
            } else {
                window.localStorage.removeItem("from");
            }
            if (date.to) {
                const to = formatWithTimeZone(date.to, "LLL dd, y", {timeZone: timezone});
                window.localStorage.setItem("to", to);
            } else {
                window.localStorage.removeItem("to");
            }
        }
    }, [date]);

    if(date?.from) {
        console.log(`date from: ${formatWithTimeZone(date.from, "LLL dd, y", { timeZone: timezone })}`);
    }
    if(date?.to) {
        console.log(`date to: ${formatWithTimeZone(date.to, "LLL dd, y", { timeZone: timezone })}`);
    }
    return (
        <div className={cn("grid gap-2", className)}>
            <Popover modal>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {formatWithTimeZone(date.from, "LLL dd, y", { timeZone: timezone })} -{" "}
                                    {formatWithTimeZone(date.to, "LLL dd, y", { timeZone: timezone })}
                                </>
                            ) : (
                                formatWithTimeZone(date.from, "LLL dd, y", { timeZone: timezone })
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full md:w-auto overflow-y-auto sm:overflow-y-hidden h-[330px] sm:h-auto" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
