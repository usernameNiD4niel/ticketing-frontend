import { LoginProps } from "@/constants/types";
import axios from "axios";

export const login = async ({ email, password }: LoginProps) => {
  const header = {
    "Content-Type": "application/json",
  };

  // const body = {
  //   email,
  //   password,
  // };

  const d = axios
    .post(
      "http://localhost:8000/api/v1/accounts/login/",
      {
        owner_name: email,
        password: password,
      },
      {
        headers: header,
      }
    )
    .then((res) => console.log(res.data));

  d.then((item) => {
    return item;
  });

  // const accounts = await fetch("http://localhost:8000/api/v1/accounts/login/", {
  //   method: "POST",
  //   headers: header,
  //   body: JSON.stringify(body),
  // });

  // if (!accounts.ok) {
  //   throw new Error(accounts.statusText);
  // }

  // const accountsData: LoginResponseProps = await accounts.json();
  // return accountsData;
};
