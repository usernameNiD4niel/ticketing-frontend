"use client";

import { Button } from "@/components/ui/button";

interface DisplayButtonProps {
  isDeactivated: boolean;
}

export default function DisplayButton({ isDeactivated }: DisplayButtonProps) {
  return (
    <Button variant={isDeactivated ? "success" : "destructive"}>
      {isDeactivated ? "Activate" : "Deactivate"}
    </Button>
  );
}
