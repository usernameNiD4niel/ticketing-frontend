"use client";
import { Button } from "@/components/ui/button";
import { FeedData } from "@/constants/hr/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<FeedData>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        type="button"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        #
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "requisitioner",
    header: ({ column }) => (
      <Button
        type="button"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Requisitioner
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="ml-4">{row.getValue("requisitioner")}</div>
    ),
  },
  {
    accessorKey: "department",
    header: ({ column }) => (
      <Button
        type="button"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Department
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("department")}</div>,
  },
  {
    accessorKey: "position",
    header: ({ column }) => (
      <Button
        type="button"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Position
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("position")}</div>,
  },
  {
    accessorKey: "assign_to",
    header: () => <div className="font-medium">Assign to</div>,
    cell: ({ row }) => <div>{row.getValue("assign_to")}</div>,
  },
];
