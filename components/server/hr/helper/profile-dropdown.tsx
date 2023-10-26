import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { FC } from "react";

interface ProfileDropdownProps {
  email?: string;
}

const ProfileDropdown: FC<ProfileDropdownProps> = ({ email }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="drop-shadow-sm border cursor-pointer">
          <AvatarFallback>
            {email?.substring(0, 1).toUpperCase() ?? "DVX"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-4 py-5 space-y-2 mr-5">
        <DropdownMenuLabel>{email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={"/hr/feed"} className="w-full">
            My Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/hr/application"} className="w-full">
            Departments
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
