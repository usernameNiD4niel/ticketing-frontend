"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { CodeTableProps } from "@/constants/types";
import { Column, ColumnDef } from "@tanstack/react-table";
import Cookies from "js-cookie";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { CopyToClipboard } from "react-copy-to-clipboard";

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

const handleSorting = (column: Column<CodeTableProps, unknown>) =>
  column.toggleSorting(column.getIsSorted() === "asc");

export const columns: ColumnDef<CodeTableProps>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button variant={"ghost"} onClick={() => handleSorting(column)}>
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="ml-4 font-medium">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "otp",
    header: ({ column }) => (
      <Button variant={"ghost"} onClick={() => handleSorting(column)}>
        OTP
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="ml-4 font-medium">{row.getValue("otp")}</div>
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <Button variant={"ghost"} onClick={() => handleSorting(column)}>
        Generated on
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="ml-4 font-medium">{row.getValue("created_at")}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const code = row.original;
      const { toast } = useToast();
      const router = useRouter();

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
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <CopyToClipboard
                  text={code.otp}
                  onCopy={() =>
                    toast({
                      description: `✔ Copied to clipboard "${code.otp}"`,
                      duration: 2000,
                    })
                  }
                >
                  <span>Copy OTP</span>
                </CopyToClipboard>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeletion(code.email)}>
                Delete Row
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
