"use client";

import { updateTicketTypeAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import SelectCustom from "@/components/utils/SelectCustom";
import { useRouter, useSearchParams } from "next/navigation";

export default function TicketTypesSlugForm() {
  const searchParams = useSearchParams();

  const ticket_type = searchParams.get("ticket_type");
  const duration = searchParams.get("duration");

  const router = useRouter();

  async function formAction(formData: FormData) {
    if (ticket_type) {
      formData.append("ticketType_", ticket_type);

      const { message, success } = await updateTicketTypeAction(formData);

      if (success) {
        router.push("/department/it/ticket-types");
        toast({
          title: "Update Success",
          description: message,
        });
      } else {
        toast({
          title: "Update Failed",
          description: message,
        });
      }
    } else {
      toast({
        title: "Update Failed",
        description: "Please try to re-login and try again",
      });
    }
  }

  return (
    <form className="w-full space-y-3 max-w-4xl" action={formAction}>
      <div className="flex w-full justify-between items-center">
        <Label htmlFor="ticketType">Ticket Type</Label>
        <Input
          className="w-full md:w-[780px]"
          id="ticketType"
          name="ticketType"
          defaultValue={ticket_type ?? ""}
        />
      </div>
      <div className="w-full flex flex-col mt-2">
        <Label className="font-bold text-base" htmlFor="type">
          Duration
        </Label>
        <div className="space-y-2">
          <div className="flex w-full justify-between items-center gap-x-2">
            <Label htmlFor="type">Type</Label>
            <SelectCustom
              items={["Days"]}
              name="type"
              isRequired={true}
              placeholder="Select a type"
              defaultValue={duration?.split(" ")[1].trim()}
              key={"Add-Ticket-Types"}
              width="w-full md:w-[780px]"
            />
          </div>
          <div className="flex w-full justify-between items-center">
            <Label htmlFor="howLong">How Long</Label>
            <Input
              className="w-full md:w-[780px]"
              id="howLong"
              name="howLong"
              defaultValue={duration?.split(" ")[0]}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end gap-2">
        <Button variant={"ghost"} type="reset">
          Reset
        </Button>
        <Button type="submit">Update</Button>
      </div>
    </form>
  );
}
