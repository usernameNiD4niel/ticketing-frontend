"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FC, useState } from "react";
import { FeedData } from "@/constants/hr/types";
import ExportDialogForm from "./ExportDialogForm";

type ExportDialogProps = {
  data: FeedData[];
};

const ExportDialog: FC<ExportDialogProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonExport = () => {
    setIsOpen(true);
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-[#879FFF] hover:bg-[#879FFF]/90"
          type="button"
          onClick={handleButtonExport}
        >
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
