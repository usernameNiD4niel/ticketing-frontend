import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Avatar from "react-avatar";
import { Button } from "../ui/button";

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
      <DropdownMenuContent className="w-fit">
        <DropdownMenuLabel>
          <div className="flex gap-x-2 items-center p-3">
            <Avatar name={name} size="60" round={true} />
            <p className="text-sm">{name}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Button
          variant={"noVariant"}
          className="w-full text-xs md:text-sm text-start"
        >
          Sign Out
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LogoutDropDown;
