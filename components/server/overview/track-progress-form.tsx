"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { DatePickerDemo } from "./date-range-picker";
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

export default function TrackProgressForm() {
  const [isOpen, setIsOpen] = React.useState(true);

  const form = useForm<z.infer<typeof reportsFilterSchema>>({
    resolver: zodResolver(reportsFilterSchema),
    defaultValues: {
      championName: "",
      start: "",
      end: "",
    },
  });

  function onSubmit(values: z.infer<typeof reportsFilterSchema>) {
    console.log(values.championName);
    console.log(values.start);
    console.log(values.end);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button>Filter</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Track Progress</AlertDialogTitle>
          <AlertDialogDescription>
            Enter the champion name and the start and end date you want to track
            the progress of champion.
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <Label>Date Covered</Label>
              <FormField
                control={form.control}
                name="start"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 items-center">
                      <FormLabel className="mt-2">Start</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 items-center">
                      <FormLabel className="mt-2">End</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2 items-center w-full justify-end pt-4">
              <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
              <Button type="submit">Calculate</Button>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
