"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CodeTableProps } from "@/constants/types";
import { Column, ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

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

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(code.otp)}
            >
              Copy OTP
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View code details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
