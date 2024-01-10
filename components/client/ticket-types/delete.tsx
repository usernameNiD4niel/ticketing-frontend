import { deleteTicketTypesAction } from "@/app/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { TicketTypeColumns } from "@/constants/types";
import { Table } from "@tanstack/react-table";

interface DeleteProps<TData> {
  table: Table<TData>;
}

export default function Delete<TData>({ table }: DeleteProps<TData>) {
  async function handleDelete() {
    const ticket_types = [];

    for (const selectedRows of table.getSelectedRowModel().rows) {
      const original = selectedRows.original as TicketTypeColumns;
      ticket_types.push(original.ticket_type);
    }

    if (ticket_types.length === 0) {
      toast({
        title: "Failed to Delete",
        description: "Please select an item you want to be deleted",
      });
      return;
    }

    const { message, success } = await deleteTicketTypesAction(ticket_types);

    if (success) {
      toast({
        title: "Successfully Deleted",
        description: message,
      });
    } else {
      toast({
        title: "Failed to Delete",
        description: message,
      });
    }
  }

  return (
    <AlertDialog>
      {/* bg-blue-500 dark:bg-blue-800 dark:text-white py-2 px-5 rounded-md */}
      <AlertDialogTrigger className="bg-red-500 text-stone-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-stone-50 dark:hover:bg-red-900/90 py-2 px-5 rounded-md">
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            All of the selected ticket types will be delete. Are you still want
            to delete all of them?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Okay</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
