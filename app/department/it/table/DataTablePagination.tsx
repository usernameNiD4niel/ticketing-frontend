import { getPaginatedTicketsAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Payment } from "@/constants/types";
import { Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  setData: React.Dispatch<React.SetStateAction<Payment[]>>;
  next_page_url: string | null;
  isFiltering: boolean;
  page_count: number;
  current_page: number;
}

async function getData(
  setData: React.Dispatch<React.SetStateAction<Payment[]>>,
  requestUrl: string | null,
  setNextPageUrl: React.Dispatch<React.SetStateAction<string | null>>,
  setPreviousPageUrl: React.Dispatch<React.SetStateAction<string | null>>,
  setPageCount: React.Dispatch<React.SetStateAction<number>>,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
) {
  // Fetch data from your API here.
  if (requestUrl) {
    // ?page=${page}&sortedBy=created_at&ordering=desc&is_default=true
    const url = `${requestUrl}&sortedBy=created_at&ordering=desc&is_default=true`;
    const { data: { currentPage, data, next_page_url, pageCount, prev_page_url }, success } = await getPaginatedTicketsAction(url);

    if (success) {
      setData(data);
      setNextPageUrl(next_page_url);
      setPreviousPageUrl(prev_page_url);
      setPageCount(pageCount);
      setCurrentPage(currentPage);
    } else {
      toast({
        title: "Cannot get the tickets, please try again",
        duration: 5000
      })
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
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);
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
            getData(
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
              getData(
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
        // disabled={isFiltering ? !table.getCanNextPage() : !nextPageUrl}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
