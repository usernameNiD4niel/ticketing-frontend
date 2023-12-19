"use client";

import { filterTableAssigned } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { AssignedTickets } from "@/constants/types";
import { PHILIPPINE_TIME_ZONE } from "@/constants/variables";
import { format } from "date-fns-tz";
import Cookies from "js-cookie";
import { FC, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";

type FilterFormProps = {
  setData: React.Dispatch<React.SetStateAction<AssignedTickets[]>>;
  setIsFiltering: React.Dispatch<React.SetStateAction<boolean>>;
  module: string;
};

const FormSchema = z.object({
  sort_by: z.enum(["ticket_d", "status", "created_at", "subject", "priority"], {
    required_error: "You need to select a column to sort.",
  }),
});

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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const handleViewAll = async () => {
    //TODO revalidate the table pagination
    // TODO set the filtering to false

    // const data_ = await getAllTickets(token!);

    console.log(`the module ::: ${module}`);

    // setData(data_);
    setIsFiltering(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="sort_by"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Sort table by...</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="ticket_id" />
                    </FormControl>
                    <FormLabel className="font-normal">Ticket ID</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="status" />
                    </FormControl>
                    <FormLabel className="font-normal">Status</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="created_at" />
                    </FormControl>
                    <FormLabel className="font-normal">Created Date</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="subject" />
                    </FormControl>
                    <FormLabel className="font-normal">Subject</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="priority" />
                    </FormControl>
                    <FormLabel className="font-normal">Priority</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default FilterForm;
