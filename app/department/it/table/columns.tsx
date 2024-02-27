"use client";

import { Payment } from "@/constants/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: () => (
      <p className="ml-4 text-left">
        <span className="hidden md:flex">Ticket Number</span>
        <span className="md:hidden">Ticket Details</span>
      </p>
    ),
    cell: ({ row }) => (
      <span className="ml-4 font-medium">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "name",
    header: () => <p className="ml-4">Requestor</p>,
    cell: ({ row }) => (
      <span className="text-left ml-4 font-medium">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "created_at",
    header: () => <p className="ml-4">Date Created</p>,
    cell: ({ row }) => {
      return (
        <span className="text-left ml-4 font-medium">
          {row.getValue("created_at")}
        </span>
      );
    },
  },
  {
    accessorKey: "updated_at",
    header: () => <p className="ml-4">Last Update</p>,
    cell: ({ row }) => {
      return (
        <span className="text-left ml-4 font-medium">
          {row.getValue("updated_at")}
        </span>
      );
    },
  },
  {
    accessorKey: "subject",
    header: () => <p className="ml-4 text-left">Subject</p>,
    cell: ({ row }) => {
      return (
        <span className="ml-4 text-left font-medium">
          {row.getValue("subject")}
        </span>
      );
    },
  },
  {
    accessorKey: "assigned_to",
    header: () => <p className="ml-4">Champion</p>,
    cell: ({ row }) => {
      return (
        <span className="text-left ml-4 font-medium">
          {row.getValue("assigned_to")}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <p className="text-left">Status</p>,
    cell: ({ row }) => {
      return (
        <span className="text-left font-medium">
          {(row.getValue("status") as string).toUpperCase()}
        </span>
      );
    },
  },
];
