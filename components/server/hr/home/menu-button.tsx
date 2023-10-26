import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { FC } from "react";
import { MenuTypes } from "@/constants/types";
import Logout from "../dialog/logout";

interface MenuButtonProps {
  menuObject: MenuTypes;
  isActive: boolean;
}

const MenuButton: FC<MenuButtonProps> = ({ menuObject, isActive }) => {
  let classes = "";
  if (isActive) {
    classes = "bg-primary text-white rounded-md";
  }
  return (
    <li>
      {menuObject.text.toLowerCase() === "logout" ? (
        <Logout
          menuObject={menuObject}
          isActive={isActive}
          description="When you logout you will be redirected to login, still you want to procced?"
          title="Are you sure you want to logout?"
        />
      ) : (
        <Link
          href={menuObject.route}
          className={cn(
            "flex p-3 items-center w-full gap-x-3 text-lg",
            classes
          )}
        >
          {isActive ? (
            <span>{<menuObject.activeIcon />}</span>
          ) : (
            <span>{<menuObject.inactiveIcon />}</span>
          )}
          <span className="text-sm">{menuObject.text}</span>
        </Link>
      )}
    </li>
  );
};

export default MenuButton;
