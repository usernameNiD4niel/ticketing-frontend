import { MailCheck } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface CustomAlert {
  success: boolean;
  title: string;
  description: string;
}

const CustomAlert = ({ description, success, title }: CustomAlert) => {
  return (
    <Alert
      className={cn(
        success
          ? "bg-green-500/50 dark:bg-green-500"
          : "bg-red-500/50 dark:bg-red-500"
      )}
    >
      {/* <AlertCircle className="h-4 w-4" /> */}
      <MailCheck />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default CustomAlert;
