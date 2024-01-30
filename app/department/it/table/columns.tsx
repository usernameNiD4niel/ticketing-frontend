"use client";

import { Payment } from "@/constants/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: () => <div className="ml-4 text-left">Ticket Number</div>,
    cell: ({ row }) => (
      <div className="ml-4 font-medium">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: () => <div className="ml-4">Requestor</div>,
    cell: ({ row }) => (
      <div className="text-left ml-4 font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "created_at",
    header: () => <div className="ml-4">Date Created</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left ml-4 font-medium">
          {row.getValue("created_at")}
        </div>
      );
    },
  },
  {
    accessorKey: "updated_at",
    header: () => <div className="ml-4">Last Update</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left ml-4 font-medium">
          {row.getValue("updated_at")}
        </div>
      );
    },
  },
  {
    accessorKey: "subject",
    header: () => <div className="ml-4 text-left">Subject</div>,
    cell: ({ row }) => {
      return (
        <div className="ml-4 text-left font-medium">
          {row.getValue("subject")}
        </div>
      );
    },
  },
  {
    accessorKey: "assigned_to",
    header: () => <div className="ml-4">Champion</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left ml-4 font-medium">
          {row.getValue("assigned_to")}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-left">Status</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {(row.getValue("status") as string).toUpperCase()}
        </div>
      );
    },
  },
];
