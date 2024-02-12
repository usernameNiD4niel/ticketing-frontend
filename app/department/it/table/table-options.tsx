import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SlOptionsVertical } from "react-icons/sl";

interface TableOptionsProps {
  handleMyTickets: () => void;
  handleMyDepartments: () => void;
}

export default async function TableOptions({
  handleMyDepartments,
  handleMyTickets,
}: TableOptionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <SlOptionsVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleMyDepartments}>
          My Department Tickets
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleMyTickets}>
          My Tickets
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Export as CSV</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
