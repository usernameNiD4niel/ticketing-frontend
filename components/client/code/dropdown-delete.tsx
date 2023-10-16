"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

const deleteByEmail = async (email: string) => {
  const token = Cookies.get("token");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/otps/${email}`,
    {
      method: "DELETE",
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

  throw new Error(`Cannot delete the row of ${email}`);
};

interface DropdownDeleteProps {
  email: string;
}

const DropdownDelete: FC<DropdownDeleteProps> = ({ email }) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleDeletion = async (email: string) => {
    const message = await deleteByEmail(email);

    if (message && message.length > 10) {
      toast({
        title: "Deletion Success",
        description: message,
      });
      router.refresh();
    } else {
      toast({
        title: "Failed to Delete",
        description: "OTP cannot be deleted",
      });
    }
  };

  return (
    <DropdownMenuItem onClick={() => handleDeletion(email)}>
      Delete Row
    </DropdownMenuItem>
  );
};

export default DropdownDelete;
