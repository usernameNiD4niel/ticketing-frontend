import { columns } from "@/components/client/code/columns";
import { DataTable } from "@/components/client/code/data-table";
import Tabs from "@/components/client/code/tabs";
import { CodeTableProps } from "@/constants/types";
import { getCookies } from "next-client-cookies/server";

const getCodeData = async () => {
  const token = getCookies().get("token");
  const codes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/codes?page=1&perPage=10`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    }
  );

  if (codes.ok) {
    const theCode = await codes.json();
    const actualCode: CodeTableProps[] = theCode.code;
    return actualCode;
  }

  throw new Error("Cannot get the codes");
};

const Code = async () => {
  const data = await getCodeData();

  return (
    <div>
      <Tabs />
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Code;
