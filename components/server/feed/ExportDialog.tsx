import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Payment } from "@/constants/types";
import { FC } from "react";
import { CSVLink } from "react-csv";

type ExportDialogProps = {
  data: Payment[];
};

const ExportDialog: FC<ExportDialogProps> = ({ data }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Export As CSV</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Export as CSV</DialogTitle>
          <DialogDescription>
            Remember you can only export the filtered data from the data, to
            export all the data you can click the View All button then click
            export
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              File Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
          <CSVLink
            data={data}
            filename="tickets.csv"
            target="_blank"
            className="text-sm p-3 font-medium rounded-md bg-stone-900 text-stone-50 hover:bg-stone-900/90 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-50/90"
          >
            Export As CSV
          </CSVLink>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;
