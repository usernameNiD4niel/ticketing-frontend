import { Button } from "@/components/ui/button";
import { AssignedTickets, AssignedPaginatedType } from "@/constants/types";
import { Table } from "@tanstack/react-table";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  setData: React.Dispatch<React.SetStateAction<AssignedTickets[]>>;
  next_page_url: string | null;
  isFiltering: boolean;
  tab: string;
}

async function getData(
  token: string,
  setData: React.Dispatch<React.SetStateAction<AssignedTickets[]>>,
  nextPageUrl: string | null,
  setNextPageUrl: React.Dispatch<React.SetStateAction<string | null>>,
  setPreviousPageUrl: React.Dispatch<React.SetStateAction<string | null>>,
  tab: string
) {
  // Fetch data from your API here.
  if (nextPageUrl) {
    const url = `${nextPageUrl}&isPreviewing=true&tab=${tab}&shouldPaginate=true`;

    //api/all-tickets/conditional?isPreviewing=true&tab=assigned_tickets&shouldPaginate=true&page=${page}
    const data = await fetch(`${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (data.ok) {
      const response: Promise<AssignedPaginatedType> = await data.json();
      const tickets: AssignedTickets[] = (await response).data;
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
  setData: React.Dispatch<React.SetStateAction<AssignedTickets[]>>,
  previousPageUrl: string | null,
  setNextPageUrl: React.Dispatch<React.SetStateAction<string | null>>,
  setPreviousPageUrl: React.Dispatch<React.SetStateAction<string | null>>,
  tab: string
) {
  // Fetch data from your API here.
  if (previousPageUrl) {
    //isPreviewing=true&tab=assigned_tickets&shouldPaginate=true&page=${page}
    const url = `${previousPageUrl}&isPreviewing=true&tab=${tab}&shouldPaginate=true`;
    const data = await fetch(`${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (data.ok) {
      const response: Promise<AssignedPaginatedType> = await data.json();
      const tickets: AssignedTickets[] = (await response).data;
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
  tab,
}: DataTablePaginationProps<TData>) {
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);

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
            setPreviousPageUrl,
            tab
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
              setPreviousPageUrl,
              tab
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
