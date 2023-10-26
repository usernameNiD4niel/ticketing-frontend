import { cookies } from "next/headers";
import React from "react";
import { getCurrentFormattedDate } from "@/constants/date-utils";
import ProfileDropdown from "../helper/profile-dropdown";

const HeaderPage = () => {
  const currentUser = cookies().get("email")?.value;

  return (
    <div className="w-full flex justify-between items-center mt-16 md:mt-0">
      <div>
        <h1 className="font-bold text-2xl">Dashboard</h1>
        <p className="text-sm font-light text-gray-500">
          {getCurrentFormattedDate()}
        </p>
      </div>
      <div className="hidden md:flex">
        <ProfileDropdown email={currentUser!} />
      </div>
    </div>
  );
};

export default HeaderPage;
