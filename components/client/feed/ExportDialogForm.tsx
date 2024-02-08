import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { FC, useState } from "react";
import { CSVLink } from "react-csv";
import { AiOutlineClose } from "react-icons/ai";

type ExportDialogFormProps = {
  // data: Payment[] | AssignedTickets[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
};

function getCurrentDateFormatted(): string {
  const currentDate = new Date();
  // Get the month, day, and year components
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so we add 1
  const day = String(currentDate.getDate()).padStart(2, "0");
  const year = String(currentDate.getFullYear());
  // Combine them in the desired format
  const formattedDate = `${month}-${day}-${year}`;

  return `${formattedDate}-Tickets`;
}

const ExportDialogForm: FC<ExportDialogFormProps> = ({ setIsOpen, data }) => {
  const [fileName, setFileName] = useState(getCurrentDateFormatted());

  const handleDialogClose = () => setIsOpen(false);

  return (
    <>
      <div
        className="absolute top-4 right-4 hover:cursor-pointer z-10"
        onClick={handleDialogClose}
      >
        <AiOutlineClose />
      </div>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="fileName" className="text-right">
            File Name
          </Label>
          <Input
            id="fileName"
            className="col-span-3"
            name="fileName"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="ghost" onClick={handleDialogClose}>
          Cancel
        </Button>
        {fileName && (
          <Button type="submit">
            <CSVLink
              data={data}
              aria-disabled={true}
              filename={fileName}
              onClick={handleDialogClose}
              target="_blank"
            >
              Export
            </CSVLink>
          </Button>
        )}
      </DialogFooter>
    </>
  );
};

export default ExportDialogForm;
