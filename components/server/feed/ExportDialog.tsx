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
import { LoadingButton } from "@/components/utils/LoadingButton";
import Cookies from "js-cookie";
import { FC, useState } from "react";

type ExportDialogProps = {
  url: string;
};

const ExportDialog: FC<ExportDialogProps> = ({ url }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState<any>();

  const getFetchedData = async () => {
    const token = Cookies.get("token");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${url}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();

      setData(data.tickets);
      setIsLoading(false);
      return;
    }

    setData([] as any);
    setIsLoading(false);
  };

  const handleOnExport = () => {
    setIsLoading(true);
    getFetchedData();
    setIsOpen(true);
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        {isLoading ? (
          <LoadingButton isFullWidth={false} />
        ) : (
          <Button onClick={handleOnExport}>
            <span className="text-sm">Export As CSV</span>
          </Button>
        )}
      </DialogTrigger>
      {!isLoading && (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Export as CSV</DialogTitle>
            <DialogDescription>
              Before exporting a csv file you need to create a file name first
              or go by a default name
            </DialogDescription>
          </DialogHeader>
          <ExportDialogForm data={data} setIsOpen={setIsOpen} />
        </DialogContent>
      )}
    </Dialog>
  );
};

export default ExportDialog;
