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
import { useAuth } from "@/hooks/auth";
import { LoadingButton } from "./LoadingButton";
import { useToast } from "../ui/use-toast";

type PendingRoleAssignProps = {
  activeCards: string[];
  setSignalForRefetch: React.Dispatch<React.SetStateAction<boolean>>;
};

const PendingRoleAssign: FC<PendingRoleAssignProps> = ({
  activeCards,
  setSignalForRefetch,
}) => {
  const [selectedRole, setSelectedRole] = useState("");
  const { toast } = useToast();
  const { updatePendingRoles } = useAuth();

  const [backendValidationError, setBackendValidationError] = useState("");
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const handleOnSubmit = () => {
    const message = createRequest();

    if (!message) {
      setBackendValidationError(
        "Please refrain your steps, you might miss important step"
      );
      return;
    }

    setSignalForRefetch((prev) => !prev);
    toast({
      title: "Roles Update",
      description: "You have successfully updated roles",
      duration: 3000,
    });
  };

  const createRequest = async () => {
    setIsLoadingButton(true);
    const { message }: any = updatePendingRoles({
      emails: activeCards,
      role: selectedRole,
      setBackendValidationError,
      setIsLoadingButton,
    });

    return message;
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
          {backendValidationError && (
            <p className="text-red-500 text-sm">{backendValidationError}</p>
          )}
        </AlertDialogHeader>
        <CustomSelect
          setSelectedState={setSelectedRole}
          selectedState={selectedRole}
          label="Role"
          placeHolder="Select a role"
          selectItems={["Requestor", "Champion", "Catalyst"]}
          isFullWidth={false}
        />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {isLoadingButton ? (
            <LoadingButton isFullWidth={false} />
          ) : (
            <AlertDialogAction
              disabled={selectedRole.length === 0}
              onClick={handleOnSubmit}
            >
              Save
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default PendingRoleAssign;
