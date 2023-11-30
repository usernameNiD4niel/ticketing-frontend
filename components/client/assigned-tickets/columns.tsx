"use client";

import { AssignedTickets } from "@/constants/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<AssignedTickets>[] = [
  {
    accessorKey: "id",
    header: () => <div className="ml-4 text-left">Ticket Number</div>,
    cell: ({ row }) => (
      <div className="ml-4 font-medium">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="ml-4">Status</div>,
    cell: ({ row }) => (
      <div className="text-left ml-4 font-medium">{row.getValue("status")}</div>
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
    accessorKey: "priority",
    header: () => <div className="ml-4">Priority</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left ml-4 font-medium">
          {row.getValue("priority")}
        </div>
      );
    },
  },
];
