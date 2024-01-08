"use client";

import { Button } from "@/components/ui/button";
import { AssignedTickets } from "@/constants/types";
import { FC } from "react";

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
import getSortedTableAction from "@/app/actions/sort-table-action";

type FilterFormProps = {
  setData: React.Dispatch<React.SetStateAction<AssignedTickets[]>>;
  setIsFiltering: React.Dispatch<React.SetStateAction<boolean>>;
  isClosed?: boolean;
};

const FormSchema = z.object({
  sort: z.enum(["id", "status", "created_at", "subject", "priority"], {
    required_error: "You need to select a column to sort.",
  }),
  order_by: z.enum(["desc", "asc"], {
    required_error: "Order by is required",
  }),
});

const FilterForm: FC<FilterFormProps> = ({
  setData,
  setIsFiltering,
  isClosed,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sort: "created_at",
      order_by: "asc",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formData = new FormData();
    formData.append("sort", data.sort);
    formData.append("order_by", data.order_by);
    formData.append("isClosed", String(isClosed));

    console.log(`data ${JSON.stringify(data, null, 2)}`);

    const response = await getSortedTableAction(formData);
    setData(response);
    setIsFiltering(true);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="sort"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Sort table by</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="id" />
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
        <FormField
          control={form.control}
          name="order_by"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Sort by</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="asc" />
                    </FormControl>
                    <FormLabel className="font-normal">ascending</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="desc" />
                    </FormControl>
                    <FormLabel className="font-normal">descending</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default FilterForm;
