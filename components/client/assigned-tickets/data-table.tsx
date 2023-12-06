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
import { DataTablePagination } from "./data-table-pagination";
import { useRouter } from "next/navigation";
import { AssignedTickets } from "@/constants/types";
import ExportDialog from "@/components/server/feed/ExportDialog";
import useScreenSize from "@/hooks/helper/useScreenSize";
import FilterPopover from "./filter-popover";
import TableFallback from "./table-fallback";

interface DataTableProps<TValue> {
  columns: ColumnDef<AssignedTickets, TValue>[];
  data_: AssignedTickets[];
  next_page_url: number | null;
  isAssignedTickets: boolean;
  url: string;
}

export function DataTable<TValue>({
  columns,
  data_,
  next_page_url,
  url,
  isAssignedTickets,
}: DataTableProps<TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [rowSelection, setRowSelection] = React.useState({});

  const width = useScreenSize();

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

  const handleWidth = (width: number) => {
    if (width < 1024) {
      table.getColumn("subject")?.toggleVisibility(false);
      table.getColumn("created_at")?.toggleVisibility(false);
      table.getColumn("status")?.toggleVisibility(false);
    } else {
      table.getColumn("subject")?.toggleVisibility(true);
      table.getColumn("created_at")?.toggleVisibility(true);
      table.getColumn("status")?.toggleVisibility(true);
    }
  };

  React.useEffect(() => {
    setTimeout(() => handleWidth(width.width), 200);
  }, [width.width]);

  const [isFiltering, setIsFiltering] = React.useState(false);
  const router = useRouter();

  const handleNavigation = (destination: string) => {
    let tabName = "Assigned Tickets";

    if (!isAssignedTickets) {
      tabName = "Unhandled Tickets";
    }

    router.push(`/department/it/${destination}?tabName=${tabName}`);
  };

  return (
    <div>
      <div className="w-full flex justify-between py-3 items-center">
        <div className="flex items-center gap-x-2">
          {isAssignedTickets && (
            <>
              <Input
                placeholder="Filter by ticket status..."
                value={
                  (table.getColumn("status")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("status")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
              <FilterPopover
                setData={setData}
                setIsFiltering={setIsFiltering}
              />
            </>
          )}
        </div>
        {data && data.length > 0 && (
          <div>
            <ExportDialog url={url} />
          </div>
        )}
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
          <React.Suspense fallback={<TableFallback />}>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="hover:cursor-pointer"
                    onClick={() => handleNavigation(row.getValue("id"))}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                        {cell.column.id !== "priority" && (
                          <div className="flex flex-col ml-4">
                            <span className="lg:hidden">
                              {row.getValue("status")}
                            </span>
                            <span className="lg:hidden">
                              {row.getValue("subject")}
                            </span>
                            <span className="lg:hidden">
                              {row.getValue("created_at")}
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
                    {table.getColumn("id")?.getFilterValue() as string}
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </React.Suspense>
        </Table>
      </div>
      {data && data.length > 0 && (
        <DataTablePagination
          setData={setData}
          table={table}
          next_page_url={next_page_url}
          isFiltering={isFiltering}
        />
      )}
    </div>
  );
}
