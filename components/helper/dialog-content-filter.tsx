"use client";
import React, { useEffect, useState } from "react";
import DropdownFilter from "./dropdown-filter";
import { Input } from "@/components/ui/input";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import Cookies from "js-cookie";
import { getSearchParam } from "@/endpoints";
import useDebounce from "@/hooks/useDebounce";
import { SearchParamsProps } from "@/constants/hr/types";

const DialogContentFilter = () => {
  const [search, setSearch] = useState("");
  const [column, setColumn] = useState("applicant");
  const [searchSuggested, setSearchSuggested] = useState<SearchParamsProps[]>(
    []
  );
  const token = Cookies.get("token");

  const recentSearch: string[] =
    JSON.parse(localStorage.getItem("recent_searches")!) || [];

  const debounceValue = useDebounce(search);

  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const fetchClientSeearch = async () => {
    if (debounceValue) {
      const data = await getSearchParam(column, search, token!);
      if (data && data.length > 0) {
        setSearchSuggested(data);
      } else {
        setSearchSuggested([]);
      }
    }
  };

  const searchSuggestionContent = () => {
    if (searchSuggested && searchSuggested.length > 0) {
      return (
        <>
          {searchSuggested.map((item) => (
            <Link
              href={`/hr/application/${item.id}`}
              className="p-3 text-sm hover:bg-gray-200 flex justify-between items-center"
              key={item.id}
            >
              <span>{item.data}</span>
              <span>{item.created_at}</span>
            </Link>
          ))}
        </>
      );
    } else {
      if (debounceValue) {
        return (
          <div className="w-full flex items-center justify-center text-center py-4 text-sm text-gray-400">
            No &quot;{search}&quot; found in the &quot;{column}&quot;
          </div>
        );
      }
    }

    if (recentSearch && recentSearch.length > 0) {
      return (
        <>
          {recentSearch.map((item) => (
            <Link
              href={`/hr/application/11`}
              className="p-3 text-sm hover:bg-gray-200"
              key={item}
            >
              {item}
            </Link>
          ))}
        </>
      );
    }

    return (
      <div className="w-full flex items-center justify-center text-center py-4 text-sm text-gray-400">
        No search history yet
      </div>
    );
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchClientSeearch();
  };

  useEffect(() => {
    fetchClientSeearch();
  }, [debounceValue]);
  return (
    <>
      <div className="w-full relative">
        <DropdownFilter column={column} setColumn={setColumn} />
        <form onSubmit={handleFormSubmit}>
          <Input
            placeholder="Search application here..."
            name="search"
            className="w-full pe-10 ps-[6.5rem] py-7 rounded-lg"
            autoFocus
            autoComplete="false"
            value={search}
            onChange={handleOnChange}
          />
        </form>
        <div className="absolute right-0 h-full bg-white text-black flex items-center justify-center top-0 w-10 z-10 rounded-md">
          <span className="hover:cursor-pointer" onClick={() => setSearch("")}>
            <AiOutlineClose />
          </span>
        </div>
      </div>
      <div className="absolute top-[4.1rem] rounded-md drop-shadow-lg flex flex-col bg-white left-0 w-full max-h-96 overflow-y-auto">
        {searchSuggestionContent()}
      </div>
    </>
  );
};

export default DialogContentFilter;
