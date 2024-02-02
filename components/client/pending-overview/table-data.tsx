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
import TableDataPagination from "./table-data-pagination";
import { UserProps } from "@/constants/types";
import SelectCustom from "@/components/utils/SelectCustom";
import { useToast } from "@/components/ui/use-toast";
import updateDepartmentRole from "@/app/actions/update-department-role";
import { deleteUserAction } from "@/app/actions";
import { LoadingButton } from "@/components/utils/LoadingButton";

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

  const [rowSelection, setRowSelection] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

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

  async function handleFormAction(formData: FormData) {
    const role = formData.get("role")?.toString();
    if (!role) {
      toast({
        title: "Failed to assign",
        description: "Role is a required field",
      });
      return;
    }

    const ids = [];

    for (const selectedRows of table.getSelectedRowModel().rows) {
      const original = selectedRows.original as UserProps;
      ids.push(original.id);
    }

    const departmentRole = await updateDepartmentRole(ids, formData);

    if (departmentRole.success) {
      toast({
        title: "Successfully Assigned",
        description: "You have successfully assigned a role",
      });
      table.resetRowSelection();
    } else {
      toast({
        title: "Failed Assigned",
        description: "Failed to assign a role, please try again",
      });
    }
  }

  async function handleDeleteUser() {
    const names = [];

    for (const selectedRows of table.getSelectedRowModel().rows) {
      const original = selectedRows.original as UserProps;
      names.push(original.name);
    }

    const { success, message } = await deleteUserAction(names);

    if (success) {
      toast({
        title: "Successfully Deleted",
        description: message,
      });
      table.resetRowSelection();
    } else {
      toast({
        title: "Failed to Delete",
        description: message,
      });
    }
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
        {JSON.stringify(rowSelection) !== "{}" && (
          <div className="flex items-center gap-2">
            <form action={handleFormAction} className="flex gap-1">
              <SelectCustom
                items={["Requestor", "Champion", "Catalyst"]}
                name="role"
                placeholder="Assign a role"
                key={"pending-role-select-custome"}
              />
              {isLoading ? (
                <LoadingButton isFullWidth={false} />
              ) : (
                <>
                  <Button>Submit</Button>
                  <Button variant={"destructive"} onClick={handleDeleteUser}>
                    Decline
                  </Button>
                </>
              )}
            </form>
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
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
      <TableDataPagination table={table} />
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
