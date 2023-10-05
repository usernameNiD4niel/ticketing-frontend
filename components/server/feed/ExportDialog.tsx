"use client";
import ExportDialogForm from "@/components/client/feed/ExportDialogForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Payment } from "@/constants/types";
import { FC, useState } from "react";
import { BiSolidFileExport } from "react-icons/bi";

type ExportDialogProps = {
  data: Payment[];
};

const ExportDialog: FC<ExportDialogProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <span className="text-sm">Export As CSV</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Export as CSV</DialogTitle>
          <DialogDescription>
            Before exporting a csv file you need to create a file name first or
            go by a default name
          </DialogDescription>
        </DialogHeader>
        <ExportDialogForm data={data} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;
