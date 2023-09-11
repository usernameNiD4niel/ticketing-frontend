"use client";

import { useToast } from "@/components/ui/use-toast";
import {
  Toast,
  ToastDescription,
  ToastProvider,
  ToastTitle,
} from "../ui/toast";

export function ToastMessage() {
  const { toast } = useToast();

  return (
    <ToastProvider>
      <Toast title="Test title" value="This is a value of none" />
      <ToastTitle>This is a toast Title</ToastTitle>
      <ToastDescription>
        This is a sample description Toast only
      </ToastDescription>
    </ToastProvider>
  );
}
