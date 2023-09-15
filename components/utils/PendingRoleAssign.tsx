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
    console.log("log 1");

    if (!message) {
      console.log("log 2");
      setBackendValidationError(
        "Please refrain your steps, you might miss important step"
      );
      return;
    }
    console.log("log 3");
    // router.refresh();
    // window.location.reload();
    setSignalForRefetch((prev) => !prev);
    toast({
      title: "Roles Update",
      description: "You have successfully updated roles",
      duration: 3000,
    });
    console.log("handle selected: ", selectedRole);
  };

  const createRequest = async () => {
    console.log("log 4");
    setIsLoadingButton(true);
    const { message }: any = updatePendingRoles({
      emails: activeCards,
      role: selectedRole,
      setBackendValidationError,
      setIsLoadingButton,
    });
    console.log("log 5");

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
          setSelectedRole={setSelectedRole}
          selectedRole={selectedRole}
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
