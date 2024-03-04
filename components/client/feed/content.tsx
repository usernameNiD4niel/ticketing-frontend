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
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";
import Filter from "./filter";
import { useRouter } from "next/navigation";
import { FeedData } from "@/constants/hr/types";
import ExportDialog from "./export-dialog";

interface ContentProps {
  columns: ColumnDef<FeedData>[];
  data_: FeedData[];
  next_url_page: number | null;
}

export default function Content({
  columns,
  data_,
  next_url_page,
}: ContentProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [data, setData] = useState(data_);
  const router = useRouter();

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

  const handleTableItemClick = (id: string) => {
    //
    router.push(`/department/hr/feed/${id}`);
  };

  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center py-4 relative w-fit gap-x-2">
          <Input
            placeholder="Search requisitioner..."
            value={
              (table.getColumn("requisitioner")?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn("requisitioner")
                ?.setFilterValue(event.target.value)
            }
            className="w-full md:w-[22rem] border-0 outline-none py-6 px-9"
          />
          <span className="absolute left-3 text-gray-500">
            <IoSearch />
          </span>
          <Filter setData={setData} />
        </div>
        <ExportDialog data={data} />
      </div>
      <div className="rounded-md border">
        <Table className="bg-white rounded-md drop-shadow-md">
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
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleTableItemClick(row.getValue("id"))}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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
