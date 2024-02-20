"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Add from "./add";
import Delete from "./delete";
import useScreenSize from "@/hooks/helper/useScreenSize";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const { width } = useScreenSize();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const handleWidth = (width: number) => {
    if (width < 1024) {
      table.getColumn("ticket_type")?.toggleVisibility(false);
      table.getColumn("duration")?.toggleVisibility(false);
      table.getColumn("created_at")?.toggleVisibility(false);
      table.getColumn("updated_at")?.toggleVisibility(false);
    } else {
      table.getColumn("ticket_type")?.toggleVisibility(true);
      table.getColumn("duration")?.toggleVisibility(true);
      table.getColumn("created_at")?.toggleVisibility(true);
      table.getColumn("updated_at")?.toggleVisibility(true);
    }
  };

  useEffect(() => {
    setTimeout(() => handleWidth(width), 200);
  }, [width]);

  return (
    <div>
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Search ticket type..."
          value={
            (table.getColumn("ticket_type")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("ticket_type")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex gap-2 items-center">
          <Add />
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            // <Button variant={"destructive"}>Delete</Button>
            <Delete table={table} />
          )}
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {/* {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))} */}

                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <p className="ms-4 md:ms-3 flex space-x-0 md:hidden">
                        <span>
                          {cell.column.id === "ticket_type" && "Ticket Type: "}
                        </span>
                        <span className="block">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </span>
                      </p>
                      <p className="hidden md:flex">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </p>
                      
                      {cell.column.id !== "actions" && (
                        <div className="flex flex-col ml-4">
                          <span className="md:hidden">
                            Ticket Type:{" "}
                            {row.getValue("ticket_type")}
                          </span>
                          <span className="md:hidden">
                            Duration:{" "}
                            {row.getValue("duration")}
                          </span>
                          <span className="md:hidden">
                            Created:{" "}
                            {row.getValue("created_at")}
                          </span>
                          <span className="md:hidden">
                            Updated:{" "}
                            {row.getValue("updated_at")}
                          </span>
                        </div>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex-1 text-sm text-muted-foreground mt-2">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
