import { SearchParamsProps } from "@/constants/hr/types";

const getSearchParam = async (
  column: string,
  search: string,
  token: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/applications/search?column=${column}&data=${search}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((data) => data.json())
    .then((data) => {
      return data.search as SearchParamsProps[];
    })
    .catch((err) => {
      return [] as SearchParamsProps[];
    });

  return response;
};

export { getSearchParam };
