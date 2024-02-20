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
import TableDataPagination from "../pending-overview/table-data-pagination";
import { useRouter } from "next/navigation";
import useScreenSize from "@/hooks/helper/useScreenSize";

interface TableDataProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function TableData<TData, TValue>({
  columns,
  data,
}: TableDataProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const router = useRouter();

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
    state: {
      sorting,
      columnFilters,
    },
  });

  const handleWidth = (width: number) => {
    if (width <= 1024) {
      table.getColumn("name")?.toggleVisibility(false);
      table.getColumn("department")?.toggleVisibility(false);
      table.getColumn("joined_on")?.toggleVisibility(false);
      table.getColumn("access_level")?.toggleVisibility(false);
      table.getColumn("system_status")?.toggleVisibility(false);
    } else {
      table.getColumn("name")?.toggleVisibility(true);
      table.getColumn("department")?.toggleVisibility(true);
      table.getColumn("joined_on")?.toggleVisibility(true);
      table.getColumn("access_level")?.toggleVisibility(true);
      table.getColumn("system_status")?.toggleVisibility(true);
    }
  };

  useEffect(() => {
    setTimeout(() => handleWidth(width), 200);
  }, [width]);

  function handleRedirect(id: string) {
    router.push(`/department/it/manage-user/${id}?id=${id}`);
  }

  return (
    <div>
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Filter name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
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
                  onClick={() => handleRedirect(row.getValue("id"))}
                  className="cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <p className="ms-4 lg:ms-3 flex space-x-0 lg:hidden">
                        <span className="lg:hidden">
                          {cell.column.id === "id" && "ID: "}
                        </span>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </p>
                      <p className="hidden lg:flex max-w-[190px]">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </p>
                      {cell.column.id !== "it_status" && (
                        <div className="flex flex-col ml-4 max-w-[190px]">
                          <span className="lg:hidden">
                            Name:
                            {row.getValue("name")}
                          </span>
                          <span className="lg:hidden">
                            Department:
                            {row.getValue("department")}
                          </span>
                          <span className="lg:hidden">
                            Joined On:
                            {row.getValue("joined_on")}
                          </span>
                          <span className="lg:hidden">
                            Access Level:
                            {row.getValue("access_level")}
                          </span>
                          <span className="lg:hidden">
                            System Status:
                            {row.getValue("system_status")}
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
      <TableDataPagination
        table={table}
        key={"ManageUserTableDataPagination"}
      />
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
