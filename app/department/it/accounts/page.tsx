"use client";
import { AvailableTabs } from "@/constants/enums";
import useNavigationStore from "@/hooks/states/useNavigationStore";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useAuth } from "@/hooks/auth";
import { AccountProps } from "@/constants/types";

const Accounts = () => {
  const setActiveTab = useNavigationStore((state) => state.setActiveTab);

  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");

  const [account, setAccount] = useState<AccountProps | null>(null);

  const { getSpecificAccount } = useAuth();

  useEffect(() => {
    setActiveTab(AvailableTabs.Accounts);

    const getAccount = async () => {
      const email = Cookies.get("email");
      const token = Cookies.get("token");

      if (email) {
        const data: AccountProps = await getSpecificAccount({
          setError,
          setIsFetching,
          token,
          email,
        });
        setAccount(data);
        return;
      }
      setAccount(null);
    };

    getAccount();
  }, []);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error} test</div>;
  }

  if (!account) {
    return <div>Account not found</div>;
  }

  return (
    <div>
      <div>
        <h2>{account.name}</h2>
        <p>{account.email}</p>
        <p>{account.department}</p>
        <p>{account.role}</p>
        <p>{account.created_at}</p>
      </div>
    </div>
  );
};

export default Accounts;
