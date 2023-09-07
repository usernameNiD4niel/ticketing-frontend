import { LoginProps, LoginResponseProps } from "@/constants/types";
import axios from "axios";

export const login = async ({ email, password }: LoginProps) => {
  // const csrfToken = "Bearer LG159w8YrCvueGpOebzuyhcYUgHGSeHRuYcJxxC2";

  const header = {
    Accept: "application/json",
  };

  const body = {
    email,
    password,
  };

  // axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
  const d = axios
    .post(
      "http://127.0.0.1:8000/api/login",
      {
        email,
        password,
      },
      {
        headers: header,
      }
    )
    .then((res) => console.log(res.data));

  d.then((item) => {
    return item;
  });

  // const accounts = await fetch("http://127.0.0.1:8000/api/login", {
  //   method: "POST",
  //   headers: header,
  //   body: JSON.stringify(body),
  // });

  // if (!accounts.ok) {
  //   throw new Error("wag naman " + accounts.statusText);
  // }

  // const accountsData: LoginResponseProps = await accounts.json();
  // return accountsData;
};
