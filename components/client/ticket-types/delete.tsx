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
import { IoIosTrash } from "react-icons/io";

interface DeleteProps<TData> {
  ticketTypes: TData[];
}

export default function Delete<TData>({ ticketTypes }: DeleteProps<TData>) {
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
          <div>
            {ticketTypes.map((ticketType) => (
              <p
                className="text-red-500 dark:text-red-700"
                key={ticketType as string}
              >
                <IoIosTrash />
                {ticketType as string}
              </p>
            ))}
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
