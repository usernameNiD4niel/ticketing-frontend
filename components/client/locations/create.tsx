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
import { Input } from "@/components/ui/input";
import { formSchema } from "./form-validation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import createLocationAction from "@/app/actions/create-location-action";
import { useToast } from "@/components/ui/use-toast";

export default function Create() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("location", values.location);

    const { message, success } = await createLocationAction(formData);

    if (success) {
      toast({
        title: "Successfully created",
        description: message,
      });
      form.reset();
    } else {
      form.setError("location", { message });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="md:w-[690px]">
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Create Location</FormLabel>
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
            className="bg-[#0B64B9] hover:bg-blue-900 px-10"
          >
            Add
          </Button>
        </div>
      </form>
    </Form>
  );
}
