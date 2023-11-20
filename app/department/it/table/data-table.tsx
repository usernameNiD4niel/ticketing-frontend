"use client";
import * as React from "react";

import {
  ColumnDef,
  flexRender,
  SortingState,
  getCoreRowModel,
  ColumnFiltersState,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { DataTablePagination } from "./DataTablePagination";
import { useRouter } from "next/navigation";
import { Payment } from "@/constants/types";
import FilterPopover from "@/components/client/feed/FilterPopover";
import ExportDialog from "@/components/server/feed/ExportDialog";

interface DataTableProps<TValue> {
  columns: ColumnDef<Payment, TValue>[];
  data_: Payment[];
  next_page_url: number | null;
}

export function DataTable<TValue>({
  columns,
  data_,
  next_page_url,
}: DataTableProps<TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [rowSelection, setRowSelection] = React.useState({});

  const [data, setData] = React.useState(data_);

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

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
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      columnVisibility,
    },
  });

  React.useEffect(() => {
    const width = window.innerWidth;

    if (width < 768) {
      table.getColumn("name")?.toggleVisibility(false);
      table.getColumn("created_at")?.toggleVisibility(false);
      table.getColumn("subject")?.toggleVisibility(false);
      table.getColumn("assigned_to")?.toggleVisibility(false);
    }
  }, []);

  const router = useRouter();

  const handleNavigation = (destination: string) => {
    router.push(destination);
  };

  return (
    <div>
      <div className="w-full flex justify-between py-3 items-center">
        <div className="flex items-center gap-x-2">
          <Input
            placeholder="Filter by ticket requestor..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <FilterPopover setData={setData} />
        </div>
        <div>
          <ExportDialog data={data} />
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
                  className="hover:cursor-pointer"
                  onClick={() =>
                    handleNavigation(
                      `/department/it/${row.getValue("id")}?tabName=Feed`
                    )
                  }
                  // data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                      {cell.column.id !== "status" && (
                        <div className="flex flex-col ml-4">
                          <span className="md:hidden">
                            {row.getValue("name")}
                          </span>
                          <span className="md:hidden">
                            {row.getValue("created_at")}
                          </span>
                          <span className="md:hidden">
                            {row.getValue("subject")}
                          </span>
                          <span className="md:hidden">
                            {row.getValue("assigned_to")}
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
      <DataTablePagination
        setData={setData}
        table={table}
        next_page_url={next_page_url}
      />
    </div>
  );
}
