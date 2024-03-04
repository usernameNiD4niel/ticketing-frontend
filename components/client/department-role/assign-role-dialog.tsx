import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdAssignmentAdd } from "react-icons/md";
import AssignRoleDropdown from "./assign-role-dropdown";
import { useToast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";
import { FC, useState } from "react";
import { FetchingUsersRole } from "@/constants/hr/types";

type UpdateProps = {
  role: string;
  ids: string[];
  column: string;
};

type ResponseHelper = {
  success: boolean;
};

const updateRolesSelected = async (data: UpdateProps) => {
  const token = Cookies.get("token");
  console.log(`the token ${token}`);
  console.log(`${JSON.stringify(data, null, 2)}`);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/accounts/role`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  )
    .then((d) => d.json())
    .then((d) => {
      return d as ResponseHelper;
    })
    .catch((e) => {
      throw new Error("Error: ", e);
    });

  return response;
};

interface AssignRoleDialogProps {
  ids: string[];
  setUser: React.Dispatch<React.SetStateAction<FetchingUsersRole[]>>;
}

const AssignRoleDialog: FC<AssignRoleDialogProps> = ({ ids, setUser }) => {
  const [selected, setSelected] = useState("Requestor");
  const { toast } = useToast();

  const handleSubmit = async () => {
    const data: UpdateProps = {
      column: "hr_access_level",
      role: selected.toLowerCase(),
      ids: ids,
    };
    const d = await updateRolesSelected(data);

    if (d) {
      toast({
        title: "Update Success",
        description: "Selected users updated successfully.",
        duration: 3000,
      });
      setUser((prevUser) => {
        const newUser = prevUser.filter((_) => {
          const isIt = ids.find((id) => _.id.toString() === id);
          if (isIt) {
            return false;
          }

          return true;
        });
        return newUser;
      });
    } else {
      toast({
        title: "Update Failed",
        description: "Cannot update the selected users role, please try again!",
        duration: 3000,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-x-2 items-center justify-center w-14 h-14 rounded-full py-3 md:rounded-md md:w-auto md:h-auto">
          <span className="text-lg">
            <MdAssignmentAdd />
          </span>
          <span className="hidden md:flex">Assign</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Role</DialogTitle>
          <DialogDescription>
            After selecting the role for the selected users just click button
            submit and it will update their role to our server.
          </DialogDescription>
        </DialogHeader>
        <AssignRoleDropdown selected={selected} setSelected={setSelected} />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant={"ghost"}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignRoleDialog;
