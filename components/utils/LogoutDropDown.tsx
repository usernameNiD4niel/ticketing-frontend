import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignOut from "../client/header/sign-out";
import { Avatar, AvatarFallback } from "../ui/avatar";

type LogoutDropDownProps = {
  name: string;
};

const LogoutDropDown: React.FC<LogoutDropDownProps> = ({ name }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="hover:cursor-pointer">
          <Avatar className="drop-shadow-sm cursor-pointer bg-white">
            <AvatarFallback>
              {name
                .split(" ")
                .map((word) => word.substring(0, 1).toUpperCase())}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="-right-3 absolute w-fit">
        <DropdownMenuLabel>
          <div className="flex gap-x-2 items-center p-3">
            <Avatar className="drop-shadow-sm cursor-pointer bg-white">
              <AvatarFallback>
                {name
                  .split(" ")
                  .map((word) => word.substring(0, 1).toUpperCase())}
              </AvatarFallback>
            </Avatar>
            <p className="text-base min-w-max">{name}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <SignOut />
      </DropdownMenuContent>
    </DropdownMenu>
    // <div>Ito ba?</div>
  );
};

export default LogoutDropDown;
