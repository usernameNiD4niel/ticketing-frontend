"use client";

import { FilterProgress } from "@/constants/types";
import { CSVLink } from "react-csv";

interface CSVDownloaderProps {
  champions: FilterProgress;
  championName: string;
  color: string;
}

export default function CSVDownloader({
  champions,
  championName,
  color,
}: CSVDownloaderProps) {
  function getDownloadableData() {
    return [
      [
        "Ticket Count",
        "Closed Ticket Count",
        "Open Ticket Count",
        "Cancelled Ticket Count",
        "Resolution Rate",
      ],
      [
        champions.ticket_count,
        champions.closed_ticket_count,
        champions.open_ticket_count,
        champions.cancelled_ticket_count,
        champions.resolution_rate,
      ],
    ];
  }

  return (
    <CSVLink
      data={getDownloadableData()}
      filename={`${championName}-Overall`}
      className={`${color} text-white py-3 px-4 rounded-sm`}
    >
      Download CSV
    </CSVLink>
  );
}
