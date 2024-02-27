"use client";
import * as React from "react";

import DateRange from "./date-range";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { reportsFilterSchema } from "@/constants/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import filterProgressAction from "@/app/actions/filter-progress-action";
import ProgressFilteredData from "./progress-filtered-data";
import { FilterProgress } from "@/constants/types";
import { toast } from "@/components/ui/use-toast";

// interface TrackProgressFormProps {
//   data: FilterProgress;
// }

export default function TrackProgressForm() {
  const form = useForm<z.infer<typeof reportsFilterSchema>>({
    resolver: zodResolver(reportsFilterSchema),
    defaultValues: {
      championName: "",
    },
  });

  const [isSuccess, setIsSuccess] = React.useState<
    "idle" | "success" | "failed"
  >("idle");
  const [data, setData] = React.useState<FilterProgress>({
    cancelled_ticket_count: 0,
    closed_ticket_count: 0,
    open_ticket_count: 0,
    resolution_rate: 0,
    ticket_count: 0,
  });

  async function onSubmit(values: z.infer<typeof reportsFilterSchema>) {
    const from = window.localStorage.getItem("from");
    const to = window.localStorage.getItem("to");

    if(!from || !to) {
      setIsSuccess("failed");
      return;
    }
    
    setIsSuccess("idle");

    const { championName } = values;

    const { data, success } = await filterProgressAction(
      championName,
      from,
      to
    );

    if (success) {
      setIsSuccess("success");
      setData(data);
    } else {
      setIsSuccess("failed");
    }
  }

  React.useEffect(() => {
    if (isSuccess === "failed") {
      toast({
        description:
          "Unable to get the converted progress track, please try again",
        duration: 4000,
      });
    }
  }, [isSuccess]);

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button>Filter</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Track Progress</AlertDialogTitle>
            <AlertDialogDescription>
              Enter the champion name and the start and end date you want to
              track the progress of champion.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="championName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Champion Label</FormLabel>
                    <FormControl>
                      <Input {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <Label>Date Covered</Label>
                <DateRange />
              </div>
              <div className="flex gap-2 items-center w-full justify-end pt-4">
                <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
                <Button type="submit">Calculate</Button>
              </div>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
      {isSuccess === "success" && (
        <ProgressFilteredData
          championName={form.getValues().championName}
          data={data}
          setIsSuccess={setIsSuccess}
          isSuccess={isSuccess}
        />
      )}
    </>
  );
}
