import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FilterProgress } from "@/constants/types";
import { cn } from "@/lib/utils";
import { CSVLink } from "react-csv";

interface ProgressFilteredDataProps {
  championName: string;
  start: string;
  end: string;
  data: FilterProgress;
  setIsSuccess: React.Dispatch<
    React.SetStateAction<"idle" | "success" | "failed">
  >;
  isSuccess: "idle" | "success" | "failed";
}

export default function ProgressFilteredData({
  championName,
  start,
  end,
  data,
  setIsSuccess,
  isSuccess,
}: ProgressFilteredDataProps) {
  function getColor() {
    if (data.resolution_rate >= 50) {
      return "text-green-500";
    }
    if (data.resolution_rate >= 30 && data.resolution_rate <= 49) {
      return "text-orange-500";
    }

    return "text-red-500";
  }

  function getDownloadableData() {
    return [
      [
        "Ticket Count",
        "Closed Ticket Count",
        "Open Ticket Count",
        "Cancelled Ticket Count",
        "Resolution Rate",
      ],
      [
        data.ticket_count,
        data.closed_ticket_count,
        data.open_ticket_count,
        data.cancelled_ticket_count,
        data.resolution_rate,
      ],
    ];
  }

  return (
    <AlertDialog
      onOpenChange={(open) => {
        if (open) {
          setIsSuccess("success");
        } else {
          setIsSuccess("idle");
        }
      }}
      open={isSuccess === "success"}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Progress of {championName}</AlertDialogTitle>
          <AlertDialogDescription>
            You are viewing the progress of {championName} starting from {start}{" "}
            to {end}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <div className="flex items-center justify-between w-full text-lg">
            <p>No of Tickets</p>
            <h4 className="text-2xl mr-4">{data.ticket_count}</h4>
          </div>
          <div
            className={cn(
              "flex items-center justify-between w-full text-lg",
              getColor()
            )}
          >
            <p>Closed</p>
            <h4 className="text-2xl mr-4">{data.closed_ticket_count}</h4>
          </div>
          <div className="flex items-center justify-between w-full text-lg">
            <p>Open</p>
            <h4 className="text-2xl mr-4">{data.open_ticket_count}</h4>
          </div>
          <div className="flex items-center justify-between w-full text-lg">
            <p>Cancelled</p>
            <h4 className="text-2xl mr-4">{data.cancelled_ticket_count}</h4>
          </div>
          <hr />
          <div
            className={cn(
              "flex items-center justify-between w-full text-lg mt-3",
              getColor()
            )}
          >
            <p>Resolution Rate</p>
            <h4 className="text-4xl mr-2">{data.resolution_rate}%</h4>
          </div>
        </div>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel>Okay</AlertDialogCancel>
          <AlertDialogAction asChild>
            <CSVLink
              data={getDownloadableData()}
              filename={`${championName}-${start}-${end}`}
            >
              Download CSV
            </CSVLink>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
