"use client";
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
import { FC, useState } from "react";
import { LoadingButton } from "./LoadingButton";
import { useToast } from "../ui/use-toast";
import updateDepartmentRole from "@/app/actions/update-department-role";

type PendingRoleAssignProps = {
  selectedUserIds: number[];
};

const PendingRoleAssign: FC<PendingRoleAssignProps> = ({ selectedUserIds }) => {
  const { toast } = useToast();

  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const handleFormAction = async (formData: FormData) => {
    const role = formData.get("role")?.toString();
    if (!role) {
      toast({
        title: "Validation Error",
        description: "Role is as required field",
      });
      return;
    }

    const formAction = await updateDepartmentRole(selectedUserIds, formData);

    if (formAction.success) {
      toast({
        title: "Update success",
        description: formAction.message,
      });
    } else {
      toast({
        title: "Update failed",
        description: formAction.message,
      });
    }
    setIsLoadingButton(false);
  };

  const handleFormSubmit = () => {
    setIsLoadingButton(true);
  };

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
        <form action={handleFormAction} onSubmit={handleFormSubmit}>
          <CustomSelect
            selectedState={"Select a role"}
            label="Role"
            selectItems={["Requestor", "Champion", "Catalyst"]}
            isFullWidth={false}
          />
          <AlertDialogFooter>
            <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
            {isLoadingButton ? (
              <LoadingButton isFullWidth={false} />
            ) : (
              <AlertDialogAction asChild>
                <Button type="submit">Save</Button>
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default PendingRoleAssign;
