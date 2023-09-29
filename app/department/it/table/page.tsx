import { Payment } from "@/constants/types";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { payments } from "@/constants/objects";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return payments;
}

export default async function DemoPage() {
  const data = await getData();
  return (
    <div className="container  py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
