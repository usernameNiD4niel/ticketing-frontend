"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaginatedType, Payment } from "@/constants/types";
import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";
import Cookies from "js-cookie";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  setData: React.Dispatch<React.SetStateAction<Payment[]>>;
  next_page_url: string | null;
  data: Payment[];
}

async function getData(
  token: string,
  setData: React.Dispatch<React.SetStateAction<Payment[]>>,
  nextPageUrl: string | null,
  setNextPageUrl: React.Dispatch<React.SetStateAction<string | null>>,
  setPreviousPageUrl: React.Dispatch<React.SetStateAction<string | null>>
) {
  console.log("log 1: ", nextPageUrl);

  // Fetch data from your API here.
  if (nextPageUrl) {
    const data = await fetch(
      // `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-tickets/pages?page=${page}`,
      `${nextPageUrl}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (data.ok) {
      const response: Promise<PaginatedType> = await data.json();
      const tickets = (await response).data;
      const filteredTickets: Payment[] = [];
      tickets.forEach((value) => {
        filteredTickets.push({
          id: value.id,
          assigned_to: value.assigned_to,
          created_at: value.created_at,
          name: value.name,
          status: value.status,
          subject:
            value.subject.length > 35
              ? value.subject.substring(0, 35) + "..."
              : value.subject,
        });
      });
      const nextPage = (await response).next_page_url;
      console.log("inside the request: ", nextPage);

      setData(filteredTickets);
      setNextPageUrl(nextPage);
      setPreviousPageUrl((await response).prev_page_url);
    } else {
      throw new Error("Cannot fetch all the tickets, sorry😪");
    }
  }
}
async function getPrevious(
  token: string,
  setData: React.Dispatch<React.SetStateAction<Payment[]>>,
  previousPageUrl: string | null,
  setNextPageUrl: React.Dispatch<React.SetStateAction<string | null>>,
  setPreviousPageUrl: React.Dispatch<React.SetStateAction<string | null>>
) {
  // Fetch data from your API here.
  if (previousPageUrl) {
    const data = await fetch(
      // `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/all-tickets/pages?page=${page}`,
      `${previousPageUrl}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (data.ok) {
      const response: Promise<PaginatedType> = await data.json();
      const tickets = (await response).data;
      const filteredTickets: Payment[] = [];
      tickets.forEach((value) => {
        filteredTickets.push({
          id: value.id,
          assigned_to: value.assigned_to,
          created_at: value.created_at,
          name: value.name,
          status: value.status,
          subject:
            value.subject.length > 35
              ? value.subject.substring(0, 35) + "..."
              : value.subject,
        });
      });
      const nextPage = (await response).next_page_url;
      console.log("inside the request: ", nextPage);

      setData(filteredTickets);
      setNextPageUrl(nextPage);
      setPreviousPageUrl((await response).prev_page_url);
    } else {
      throw new Error("Cannot fetch all the tickets, sorry😪");
    }
  }
}

export function DataTablePagination<TData>({
  table,
  next_page_url,
  setData,
  data,
}: DataTablePaginationProps<TData>) {
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (next_page_url) {
      console.log("hindi siya null");

      setNextPageUrl(next_page_url);
    } else {
      console.log("null siya");
    }
  }, [next_page_url]);
  return (
    <>
      {/* <div className="flex items-center justify-between p-2">
        <div className="flex-1 text-sm text-muted-foreground">
          Rows Available: {table.getFilteredRowModel().flatRows.length}
        </div>
        <div
          className={cn(
            "hidden md:flex items-center space-x-6 lg:space-x-8",
            data && data.length <= 10 && "hidden"
          )}
        >
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <AiOutlineDoubleLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <AiOutlineDoubleRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div> */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="lg"
          onClick={() => {
            const token = Cookies.get("token");
            console.log("the next page url above: ", previousPageUrl);
            getPrevious(
              token!,
              setData,
              previousPageUrl,
              setNextPageUrl,
              setPreviousPageUrl
            );
            table.previousPage();
          }}
          disabled={!previousPageUrl}
        >
          Previous
        </Button>
        <Button
          size="lg"
          variant={"outline"}
          onClick={() => {
            const token = Cookies.get("token");
            console.log("the next page url above: ", nextPageUrl);
            getData(
              token!,
              setData,
              nextPageUrl,
              setNextPageUrl,
              setPreviousPageUrl
            );
            table.nextPage();
          }}
          disabled={!nextPageUrl}
        >
          Next
        </Button>
      </div>
    </>
  );
}
