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
}

async function getData(
  token: string,
  setData: React.Dispatch<React.SetStateAction<Payment[]>>,
  nextPageUrl: number | null,
  setNextPageUrl: React.Dispatch<React.SetStateAction<number | null>>,
  setPreviousPageUrl: React.Dispatch<React.SetStateAction<number | null>>
) {
  // Fetch data from your API here.
  if (nextPageUrl) {
    const url = `${nextPageUrl}&sortedBy=created_at&ordering=desc`;
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

      setData(tickets);
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
  previousPageUrl: number | null,
  setNextPageUrl: React.Dispatch<React.SetStateAction<number | null>>,
  setPreviousPageUrl: React.Dispatch<React.SetStateAction<number | null>>
) {
  // Fetch data from your API here.
  if (previousPageUrl) {
    const url = `${previousPageUrl}&sortedBy=created_at&ordering=desc`;
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

      setData(tickets);
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
  isFiltering,
}: DataTablePaginationProps<TData>) {
  const [nextPageUrl, setNextPageUrl] = useState<number | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<number | null>(null);

  useEffect(() => {
    if (next_page_url) {
      setNextPageUrl(next_page_url);
    }
  }, [next_page_url]);
  return (
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
            setPreviousPageUrl
          );
          table.previousPage();
        }}
        // disabled={!previousPageUrl}
        disabled={isFiltering ? !table.getCanPreviousPage() : !previousPageUrl}
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
              setPreviousPageUrl
            );
          }
          table.nextPage();
        }}
        disabled={isFiltering ? !table.getCanNextPage() : !nextPageUrl}
      >
        Next
      </Button>
    </div>
  );
}
