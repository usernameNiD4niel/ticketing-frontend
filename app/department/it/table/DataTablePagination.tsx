"use client";
import { Button } from "@/components/ui/button";
import { PaginatedType, Payment } from "@/constants/types";
import { Table } from "@tanstack/react-table";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  setData: React.Dispatch<React.SetStateAction<Payment[]>>;
  next_page_url: string | null;
}

async function getData(
  token: string,
  setData: React.Dispatch<React.SetStateAction<Payment[]>>,
  nextPageUrl: string | null,
  setNextPageUrl: React.Dispatch<React.SetStateAction<string | null>>,
  setPreviousPageUrl: React.Dispatch<React.SetStateAction<string | null>>
) {
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
}: DataTablePaginationProps<TData>) {
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (next_page_url) {
      setNextPageUrl(next_page_url);
    } else {
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
        disabled={!previousPageUrl}
      >
        Previous
      </Button>
      <Button
        size="lg"
        variant={"outline"}
        onClick={() => {
          const token = Cookies.get("token");
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
  );
}
