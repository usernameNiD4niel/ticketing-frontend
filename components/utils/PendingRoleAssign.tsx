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
import { Button } from "@/components/ui/button";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import CustomSelect from "./CustomSelect";

const PendingRoleAssign = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="fixed bottom-5 right-3 md:right-10 flex gap-x-2 items-center text-xl text-[#0B64B9]"
        >
          <BiSolidMessageSquareEdit />
          <span className="text-sm">Assign</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Assigning Role</AlertDialogTitle>
          <AlertDialogDescription>
            The selected user will have their role base on your selected role
          </AlertDialogDescription>
        </AlertDialogHeader>
        <CustomSelect />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default PendingRoleAssign;
