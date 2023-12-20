import { CreateUserType } from "@/constants/types";

type ResponseHelper = {
  token: string;
  name: string;
  it_access_level: string;
  hr_access_level: string;
};

function getFormattedName(name: string) {
  const splittedName = name.split(" ");

  let newString = "";
  for (const name_ of splittedName) {
    newString += name_.charAt(0).toUpperCase() + name_.substring(1) + " ";
  }

  return newString.trim();
}

export default async function createUser(data: CreateUserType) {
  data.name = getFormattedName(data.name);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const data_ = await response.json();
  const data__ = data_.data;

  if (response.ok) {
    return {
      success: true,
      data: data__ as ResponseHelper,
      message: data_.message as string,
    };
  }

  return {
    success: false,
    data: {} as ResponseHelper,
    message: data_.message as string,
  };
}
