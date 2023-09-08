import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function LoadingButton({ isFullWidth }: { isFullWidth: boolean }) {
  return (
    <Button
      disabled
      className={`${isFullWidth ? "w-full" : "w-fit"}`}
      type="button"
    >
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  );
}
