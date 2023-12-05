"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { editSchema } from "./form-validation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectLocations } from "./select-locations";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Locations } from "@/constants/types";
import updateLocationAction from "@/app/actions/update-location-action";
import { useToast } from "@/components/ui/use-toast";

interface EditProps {
  locations: Locations[];
}

export default function Edit({ locations }: EditProps) {
  const [selectedLocation, setSelectedLocation] = useState("");
  const { toast } = useToast();

  const form = useForm<z.infer<typeof editSchema>>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      updatedLocation: "",
    },
  });

  async function onSubmit(values: z.infer<typeof editSchema>) {
    const formData = new FormData();
    formData.append("selectedLocation", selectedLocation);
    formData.append("updatedLocation", values.updatedLocation);

    const { message, success } = await updateLocationAction(formData);

    if (success) {
      toast({
        title: "Update Success",
        description: message,
      });
      form.reset();
    } else {
      toast({
        title: "Update Failed",
        description: message,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 md:w-[690px]"
      >
        <div>
          <Label htmlFor="selectedLocation">Locations</Label>
          <SelectLocations
            locations={locations}
            setLocations={setSelectedLocation}
            form={form}
          />
        </div>
        <FormField
          control={form.control}
          name="updatedLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This will reflect to &ldquo;Create Ticket&rdquo; and can be
                selected by our requestor.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-end">
          <Button
            type="submit"
            className="bg-[#0B64B9] hover:bg-blue-900 px-7"
            id="update-button"
          >
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
}
