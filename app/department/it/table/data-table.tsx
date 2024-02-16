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

import { DataTablePagination } from "./DataTablePagination";
import { useRouter } from "next/navigation";
import { Payment } from "@/constants/types";
import FilterPopover from "@/components/client/feed/FilterPopover";
import useScreenSize from "@/hooks/helper/useScreenSize";
import ExportDialog from "@/components/server/feed/ExportDialog";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import SearchTable from "./search";
import { cn } from "@/lib/utils";
import { getPaginatedFeedAction } from "@/app/actions";
import TableOptions from "./table-options";

interface DataTableProps<TValue> {
  columns: ColumnDef<Payment, TValue>[];
  data_: Payment[];
  next_page_url: number | null;
  pageCount: number;
  currentPage: number;
}

export function DataTable<TValue>({
  columns,
  data_,
  next_page_url,
  pageCount,
  currentPage,
}: DataTableProps<TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [rowSelection, setRowSelection] = React.useState({});

  const width = useScreenSize();

  const [data, setData] = React.useState(data_);

  const [activeTab, setActiveTab] = React.useState(2);

  const role = Cookies.get("it_access_level");

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
    if (width < 768) {
      table.getColumn("name")?.toggleVisibility(false);
      table.getColumn("created_at")?.toggleVisibility(false);
      table.getColumn("updated_at")?.toggleVisibility(false);
      table.getColumn("subject")?.toggleVisibility(false);
      table.getColumn("assigned_to")?.toggleVisibility(false);
    } else {
      table.getColumn("name")?.toggleVisibility(true);
      table.getColumn("created_at")?.toggleVisibility(true);
      table.getColumn("updated_at")?.toggleVisibility(true);
      table.getColumn("subject")?.toggleVisibility(true);
      table.getColumn("assigned_to")?.toggleVisibility(true);
    }
  };

  React.useEffect(() => {
    setTimeout(() => handleWidth(width.width), 200);
  }, [width.width]);

  const [isFiltering, setIsFiltering] = React.useState(false);
  const router = useRouter();

  const handleNavigation = (destination: string) => {
    router.push(destination);
  };

  async function getMyTickets() {
    const newData = await getPaginatedFeedAction(true, 1);
    // const response = await myTickets(token!);

    setIsFiltering(true);
    setData(newData);
    setActiveTab(2);
  }

  async function getMyDepartmentTickets() {
    // set the default data
    // table.resetPagination();
    // setData(data_);
    // setIsFiltering(false);
    // setActiveTab(1);

    const newData = await getPaginatedFeedAction(false, 1);

    setIsFiltering(true);
    setData(newData);
    setActiveTab(1);
  }

  return (
    <div>
      <div className="w-full flex justify-between py-3 items-center">
        <div className="flex items-center gap-x-2">
          <SearchTable
            setData={setData}
            key={"SearchDataTable"}
            clonedData={data_}
            setIsFiltering={setIsFiltering}
          />
          <FilterPopover setData={setData} setIsFiltering={setIsFiltering} />
        </div>
        {/* This will show only when web view and the options is not visible */}
        <div className="space-x-2 hidden md:block">
          {role?.toLowerCase() === "requestor" && (
            <>
              <Button
                variant={"ghost"}
                className={cn(
                  activeTab === 1 ? "border-slate-500 border" : "border-none"
                )}
                onClick={getMyDepartmentTickets}
              >
                My Department Tickets
              </Button>
              <Button
                variant={"ghost"}
                className={cn(
                  activeTab !== 1 ? "border-slate-500 border" : "border-none"
                )}
                onClick={getMyTickets}
              >
                My Tickets
              </Button>
            </>
          )}
          <ExportDialog
            url={`all-tickets?is_my_tickets=${activeTab === 1 ? false : true}`}
          />
        </div>
        {/* This will show on mobile when the tabs are not visible */}
        <div className="md:hidden">
          <TableOptions
            handleMyDepartments={getMyDepartmentTickets}
            handleMyTickets={getMyTickets}
            activeTab={activeTab}
          />
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
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <p className="ms-4 md:ms-3 flex space-x-0 md:hidden">
                        <span className="md:hidden">
                          {cell.column.id === "id" && "ID: "}
                        </span>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </p>
                      <p className="hidden md:flex">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </p>
                      {/* {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )} */}
                      {cell.column.id !== "status" && (
                        <div className="flex flex-col ml-4">
                          <span className="md:hidden">
                            Requestor:
                            {row.getValue("name")}
                          </span>
                          <span className="md:hidden">
                            Creator:
                            {row.getValue("created_at")}
                          </span>
                          <span className="md:hidden">
                            Updated:
                            {row.getValue("updated_at")}
                          </span>
                          <span className="md:hidden">
                            Subject:
                            {row.getValue("subject")}
                          </span>
                          <span className="md:hidden">
                            Champion:
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
        isFiltering={isFiltering}
        current_page={currentPage}
        page_count={pageCount}
      />
    </div>
  );
}
