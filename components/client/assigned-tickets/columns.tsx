"use client";

import { AssignedTickets } from "@/constants/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<AssignedTickets>[] = [
  {
    accessorKey: "id",
    header: () => <div className="ml-4 text-left">
      <span className="hidden lg:flex">Ticket Number</span>
      <span className="lg:hidden">Ticket Details</span>
    </div>,
    cell: ({ row }) => (
      <span className="ml-4 font-medium">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "requestor",
    header: () => <div className="ml-4">Requestor</div>,
    cell: ({ row }) => (
      <span className="text-left ml-4 font-medium">
        {row.getValue("requestor")}
      </span>
    ),
  },
  {
    accessorKey: "created_at",
    header: () => <div className="ml-4">Date Created</div>,
    cell: ({ row }) => {
      return (
        <span className="text-left ml-4 font-medium">
          {row.getValue("created_at")}
        </span>
      );
    },
  },
  {
    accessorKey: "subject",
    header: () => <div className="ml-4 text-left">Subject</div>,
    cell: ({ row }) => {
      return (
        <span className="ml-4 text-left font-medium">
          {row.getValue("subject")}
        </span>
      );
    },
  },
  {
    accessorKey: "ticket_type",
    header: () => <div className="ml-4">Ticket Type</div>,
    cell: ({ row }) => {
      return (
        <span className="text-left ml-4 font-medium">
          {row.getValue("ticket_type")}
        </span>
      );
    },
  },
];
