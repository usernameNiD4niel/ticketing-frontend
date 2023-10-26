import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import LoggingOut from "@/components/client/hr/helper/logging-out";
import { MenuTypes } from "@/constants/types";

interface LogoutProps {
  menuObject: MenuTypes;
  isActive: boolean;
  title: string;
  description: string;
}
const Logout: FC<LogoutProps> = ({
  isActive,
  menuObject,
  description,
  title,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div>
          <Button
            variant={"noVariant"}
            className="flex p-3 w-full gap-x-3 text-lg"
          >
            <p className="w-full flex gap-x-3 items-center">
              {isActive ? (
                <span>{<menuObject.activeIcon />}</span>
              ) : (
                <span>{<menuObject.inactiveIcon />}</span>
              )}
              <span className="text-sm">{menuObject.text}</span>
            </p>
          </Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <LoggingOut />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Logout;
