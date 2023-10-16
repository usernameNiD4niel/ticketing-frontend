"use client";
import { useToast } from "@/components/ui/use-toast";
import React, { FC } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface CopyToClipboardsProps {
  otp: string;
}

const CopyToClipboards: FC<CopyToClipboardsProps> = ({ otp }) => {
  const { toast } = useToast();
  return (
    <CopyToClipboard
      text={otp}
      onCopy={() =>
        toast({
          description: `✔ Copied to clipboard "${otp}"`,
          duration: 2000,
        })
      }
    >
      <span>Copy OTP</span>
    </CopyToClipboard>
  );
};

export default CopyToClipboards;
