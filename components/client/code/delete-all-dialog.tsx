"use client";
import React from "react";
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
import { useToast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const deleteAllCode = async () => {
  const token = Cookies.get("token");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/delete-all-otps`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    const message: string = data.message;
    return message;
  }

  throw new Error("Cannot delete all the tickets!");
};

const DeleteAllDialog = () => {
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    const message = await deleteAllCode();
    if (
      message &&
      message === 'All records in the "otps" table have been deleted'
    ) {
      toast({
        title: "Deletion Success",
        description: message,
      });
      router.refresh();
    } else {
      toast({
        title: "Failed to Delete",
        description: "OTPs cannot be deleted",
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"}>Delete All</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            record and remove this data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAllDialog;
