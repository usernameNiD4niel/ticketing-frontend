import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Avatar from "react-avatar";
import SignOut from "../client/header/sign-out";

type LogoutDropDownProps = {
  name: string;
};

const LogoutDropDown: React.FC<LogoutDropDownProps> = ({ name }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="hover:cursor-pointer">
          <Avatar name={name} size="35" round={true} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        <DropdownMenuLabel>
          <div className="flex gap-x-2 items-center p-3">
            <Avatar name={name} size="60" round={true} />
            <p className="text-sm">{name}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <SignOut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LogoutDropDown;
