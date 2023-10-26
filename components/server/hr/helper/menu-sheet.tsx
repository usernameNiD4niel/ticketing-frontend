import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { RiMenu2Fill } from "react-icons/ri";
import { FC } from "react";
import MobileMenu from "./mobile-menu";
import { AvailableTabs } from "@/constants/hr/enums";

interface MenuSheetProps {
  activeTab: AvailableTabs;
}

const MenuSheet: FC<MenuSheetProps> = ({ activeTab }) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet key="left">
        <SheetTrigger asChild>
          <Button variant="outline">
            <RiMenu2Fill />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <MobileMenu activeTab={activeTab} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MenuSheet;
