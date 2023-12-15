// "use client";
import deleteLocationAction from "@/app/actions/delete-location-action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { useToast } from "../ui/use-toast";

interface ScalableDialogBoxProps {
  triggerClass: string;
  triggerText: string;
  title: string;
  description: string;
  action: "delete";
  negativeText?: string;
  positionText?: string;
  triggerVariant:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "noVariant";
  data?: string; // changes this if it's not accurate... but please align the existing caller!
  setData: React.Dispatch<React.SetStateAction<string>>;
}

export default function ScalableDialogBox({
  action,
  description,
  title,
  triggerClass,
  triggerText,
  negativeText,
  positionText,
  triggerVariant,
  data,
  setData,
}: ScalableDialogBoxProps) {
  const { toast } = useToast();

  async function handleAction() {
    switch (action) {
      case "delete":
        //TODO: query a deletion...
        const formData = new FormData();
        formData.append("location", data!);

        const { message, success } = await deleteLocationAction(formData);

        if (success) {
          setData("");
          toast({
            title: "Deletion Success",
            description: message,
          });
        } else {
          toast({
            title: "Deletion Failed",
            description: message,
          });
        }
        break;
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant={triggerVariant} className={triggerClass}>
          {triggerText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {negativeText ? negativeText : "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleAction}>
            {positionText ? positionText : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
