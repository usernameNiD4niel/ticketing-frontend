import "./ticket-types.css";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectCustom from "@/components/utils/SelectCustom";

export default function Add() {
  function addAction() {}

  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-blue-500 dark:bg-blue-800 dark:text-white py-2 px-5 rounded-md">
        Add
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create Ticket Type</AlertDialogTitle>
          <AlertDialogDescription>
            You can edit the created ticket type anytime by clicking the actual
            ticket type from the table.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form action={addAction} className="w-full">
          <div className="w-full flex justify-between items-center">
            <Label htmlFor="ticketType">Ticket Type</Label>
            <Input
              id="ticketType"
              required
              className="w-[330px]"
              name="ticketType"
            />
          </div>
          <h3 className="w-full text-start mt-4">Duration</h3>
          <div className="space-y-2">
            <div className="w-full flex justify-between items-center">
              <Label htmlFor="type">Type</Label>
              {/* <Input id="type" className="w-[330px]" required name="type" /> */}
              <SelectCustom
                items={["Days"]}
                name="type"
                placeholder="Select a type"
                key={"Add-Ticket-Types"}
                width="w-[330px]"
              />
            </div>
            <div className="w-full flex justify-between relative items-center">
              <Label htmlFor="howLong">How Long</Label>
              <Input
                id="howLong"
                type="number"
                required
                name="howLong"
                className="w-[330px] no-spinners"
              />
            </div>
          </div>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
            <Button type="submit">Continue</Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
