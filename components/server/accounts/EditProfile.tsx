import ProfileForm from "@/components/client/accounts/ProfileForm";
import { Button } from "@/components/ui/button";
import { UsersType } from "@/constants/types";
import React from "react";

const getUserInfo = async (token: string) => {
  const user: UsersType = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/accounts/current-user`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  )
    .then((data) => data.json())
    .catch((error) => console.error(error));
  return user;
};

type RequestShape = {
  name: string;
  department: string;
  token: string;
};

type ResponseShape = {
  message: string;
};

const updateUserInfo = async ({ name, department, token }: RequestShape) => {
  const data: ResponseShape = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/accounts/current-user`,
    {
      method: "post",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, department }),
    }
  )
    .then((data) => data.json())
    .then((data) => data)
    .catch((error) => console.error(error));

  return data;
};

type FormDataProps = {
  name: string;
  department: string;
  token: string;
};

const EditProfile = async ({ token }: { token: string }) => {
  const data = await getUserInfo(token);

  console.log("token natin: ", token);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData: FormDataProps = {
      name: "",
      department: "",
      token,
    };

    // Cast event.target to HTMLFormElement
    const form = event.target as HTMLFormElement;

    const name_ = form.elements[0] as HTMLInputElement;
    const department_ = form.elements[1] as HTMLInputElement;

    if (name_.tagName === "INPUT") {
      formData["name"] = name_.value;
      formData["department"] = department_.value;
    }

    destructor(formData);
  };

  const destructor = async (formData: FormDataProps) => {
    const { message } = await updateUserInfo(formData);
    console.log("This is a message: ", message);
  };

  return (
    <div className="relative py-4 flex items-center flex-col">
      <h1 className="w-full md:w-[70%] font-bold">Update your Information</h1>
      <div className="w-full md:w-[70%]">
        <form className="py-4 space-y-4" onSubmit={handleFormSubmit}>
          <ProfileForm data={data} />
          <div className="flex items-center justify-end">
            <Button>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
