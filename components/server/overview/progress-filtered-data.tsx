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
            <h4 className="text-xl mr-4">{data.ticket_count}</h4>
          </div>
          <div className="flex items-center justify-between w-full text-lg">
            <p>Closed</p>
            <h4 className="text-xl mr-4">{data.closed_ticket_count}</h4>
          </div>
          <div className="flex items-center justify-between w-full text-lg">
            <p>Open</p>
            <h4 className="text-xl mr-4">{data.open_ticket_count}</h4>
          </div>
          <div className="flex items-center justify-between w-full text-lg">
            <p>Cancelled</p>
            <h4 className="text-xl mr-4">{data.cancelled_ticket_count}</h4>
          </div>
          <hr />
          <div className="flex items-center justify-between w-full text-lg mt-3">
            <p>Resolution Rate</p>
            <h4 className="text-4xl mr-4">{data.resolution_rate}%</h4>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Okay</AlertDialogCancel>
          <AlertDialogAction>Download CSV</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
