import { AlertCircle, MailCheck } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const CustomAlert = () => {
  return (
    <Alert className="bg-green-500/50 dark:bg-green-500">
      {/* <AlertCircle className="h-4 w-4" /> */}
      <MailCheck />
      <AlertTitle>Validation Success</AlertTitle>
      <AlertDescription>You have entered a correct OTP code</AlertDescription>
    </Alert>
  );
};

export default CustomAlert;
