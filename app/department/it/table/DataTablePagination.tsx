import { Button } from "@/components/ui/button";
import { PaginatedType, Payment } from "@/constants/types";
import { Table } from "@tanstack/react-table";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  setData: React.Dispatch<React.SetStateAction<Payment[]>>;
  next_page_url: number | null;
  isFiltering: boolean;
  page_count: number;
  current_page: number;
}

async function getData(
  token: string,
  setData: React.Dispatch<React.SetStateAction<Payment[]>>,
  nextPageUrl: number | null,
  setNextPageUrl: React.Dispatch<React.SetStateAction<number | null>>,
  setPreviousPageUrl: React.Dispatch<React.SetStateAction<number | null>>,
  setPageCount: React.Dispatch<React.SetStateAction<number>>,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
) {
  // Fetch data from your API here.
  if (nextPageUrl) {
    // ?page=${page}&sortedBy=created_at&ordering=desc&is_default=true
    const url = `${nextPageUrl}&sortedBy=created_at&ordering=desc&is_default=true`;
    const data = await fetch(`${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (data.ok) {
      const response: Promise<PaginatedType> = await data.json();
      const tickets: Payment[] = (await response).data;
      const nextPage = (await response).next_page_url;
      const pageCount = (await response).pageCount;
      const currentPage = (await response).currentPage;

      setData(tickets);
      setNextPageUrl(nextPage);
      setPreviousPageUrl((await response).prev_page_url);
      setPageCount(pageCount);
      setCurrentPage(currentPage);
    } else {
      throw new Error("Cannot fetch all the tickets, sorry😪");
    }
  }
}

async function getPrevious(
  token: string,
  setData: React.Dispatch<React.SetStateAction<Payment[]>>,
  previousPageUrl: number | null,
  setNextPageUrl: React.Dispatch<React.SetStateAction<number | null>>,
  setPreviousPageUrl: React.Dispatch<React.SetStateAction<number | null>>,
  setPageCount: React.Dispatch<React.SetStateAction<number>>,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
) {
  // Fetch data from your API here.
  // ?page=${page}&sortedBy=created_at&ordering=desc&is_default=true
  if (previousPageUrl) {
    const url = `${previousPageUrl}&sortedBy=created_at&ordering=desc&is_default=true`;
    const data = await fetch(`${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (data.ok) {
      const response: Promise<PaginatedType> = await data.json();
      const tickets: Payment[] = (await response).data;
      const nextPage = (await response).next_page_url;
      const pageCount = (await response).pageCount;
      const currentPage = (await response).currentPage;

      setData(tickets);
      setNextPageUrl(nextPage);
      setPreviousPageUrl((await response).prev_page_url);
      setPageCount(pageCount);
      setCurrentPage(currentPage);
    } else {
      throw new Error("Cannot fetch all the tickets, sorry😪");
    }
  }
}

export function DataTablePagination<TData>({
  table,
  next_page_url,
  setData,
  isFiltering,
  page_count,
  current_page,
}: DataTablePaginationProps<TData>) {
  const [nextPageUrl, setNextPageUrl] = useState<number | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<number | null>(null);
  const [pageCount, setPageCount] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (next_page_url) {
      setNextPageUrl(next_page_url);
      setPageCount(page_count);
      setCurrentPage(current_page);
    }
  }, [next_page_url]);

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Page{" "}
        {!isFiltering ? (
          <>
            {currentPage} of {pageCount === 0 ? 1 : pageCount}
          </>
        ) : (
          <>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount() === 0 ? 1 : table.getPageCount()}
          </>
        )}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="lg"
          onClick={() => {
            const token = Cookies.get("token");
            getPrevious(
              token!,
              setData,
              previousPageUrl,
              setNextPageUrl,
              setPreviousPageUrl,
              setPageCount,
              setCurrentPage
            );
            table.previousPage();
          }}
          // disabled={!previousPageUrl}
          disabled={
            isFiltering ? !table.getCanPreviousPage() : !previousPageUrl
          }
        >
          Previous
        </Button>
        <Button
          size="lg"
          variant={"outline"}
          onClick={() => {
            if (!isFiltering) {
              const token = Cookies.get("token");
              getData(
                token!,
                setData,
                nextPageUrl,
                setNextPageUrl,
                setPreviousPageUrl,
                setPageCount,
                setCurrentPage
              );
            }
            table.nextPage();
          }}
          disabled={isFiltering ? !table.getCanNextPage() : !nextPageUrl}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
