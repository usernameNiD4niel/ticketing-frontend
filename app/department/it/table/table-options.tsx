import ExportDialog from "@/components/server/feed/ExportDialog";
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
  activeTab: number;
}

export default async function TableOptions({
  handleMyDepartments,
  handleMyTickets,
  activeTab,
}: TableOptionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <SlOptionsVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-4 py-2">
        <DropdownMenuItem onClick={handleMyDepartments}>
          My Department Tickets
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleMyTickets}>
          My Tickets
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <ExportDialog
          url={`all-tickets?is_my_tickets=${activeTab === 1 ? false : true}`}
          isFullWidth={true}
        />
        {/* <DropdownMenuItem>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
