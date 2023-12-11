import { Locations } from "@/constants/types";

export default async function getLocations(token: string, isString?: boolean) {
  console.log("get location invoke");
  console.log(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/locations${
      isString ? `?isString=${isString}` : ""
    }`
  );

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/locations${
      isString ? `?isString=${isString}` : ""
    }`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["locations-item"],
      },
    }
  );

  if (response.ok) {
    const data = await response.json();

    console.log(`locations ::: ${JSON.stringify(data, null, 2)}`);

    if (isString) {
      return data.locations as string[];
    }
    return data.locations as Locations[];
  }

  if (response.status === 401) {
    throw new Error("You are not allowed to access the page");
  }

  console.log(response);

  throw new Error("error noooo!");
  // return [] as Locations[];
}
