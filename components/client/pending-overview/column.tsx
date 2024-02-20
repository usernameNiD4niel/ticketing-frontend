"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { UserProps } from "@/constants/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

const column: ColumnDef<UserProps>[] = [
  {
    id: "select",
    header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="ms-4"
        />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hidden lg:flex"
        >
          #
          <ArrowUpDown className=" h-4 w-4 ml-2" />
        </Button>
        <Label className="lg:hidden ms-4">
          User Details
        </Label>
        </>
      );
    },
    cell: ({ row }) => <div className="lg:ml-5">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "department",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Department
          <ArrowUpDown className="h-4 w-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lg:ml-5">{row.getValue("department")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="h-4 w-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lg:ml-5">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created Date
          <ArrowUpDown className="h-4 w-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lg:ml-5">{row.getValue("created_at")}</div>,
  },
  {
    accessorKey: "created_time",
    header: ({ column }) => {
      return (
        <>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hidden lg:flex"
        >
          Created Time
          <ArrowUpDown className="h-4 w-4 ml-2" />
        </Button>
        <Label className="lg:hidden">Created Time</Label>
        </>
      );
    },
    cell: ({ row }) => (
      <div className="lg:ml-5">{row.getValue("created_time")}</div>
    ),
  },
];

export default column;
