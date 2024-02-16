import { searchTicketAction } from "@/app/actions";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useEffect, useState } from "react";

interface SearchTableProps<TData> {
  setData: React.Dispatch<React.SetStateAction<TData[]>>;
  clonedData: TData[];
  setIsFiltering: React.Dispatch<React.SetStateAction<boolean>>;
  module?: string;
  specific_status: string;
}

export default function SearchTable<TData>({
  setData,
  module,
  setIsFiltering,
  clonedData,
  specific_status,
}: SearchTableProps<TData>) {
  const [search, setSearch] = useState("");
  const searchDebounce = useDebounce(search);
  const [isSearched, setIsSearched] = useState(false);

  async function getResultSearch() {
    const formData = new FormData();
    formData.append("search", search);
    formData.append("module", module || "");
    formData.append("specific_status", specific_status);
    const data = (await searchTicketAction(formData)) as TData[];
    setData(data);
  }

  useEffect(() => {
    if (searchDebounce) {
      setIsFiltering(true);
      getResultSearch();
      setIsSearched(true);
    } else {
      if (isSearched) {
        // refresh the table data
        setIsFiltering(false);
        setIsSearched(false);
        setData(clonedData);
      }
    }
  }, [searchDebounce]);

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  return (
    <Input
      placeholder="Search"
      value={search}
      onChange={handleOnChange}
      className="max-w-sm"
    />
  );
}
