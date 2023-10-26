import Menu from "./menu";
import { cookies } from "next/headers";
import ProfileDropdown from "../helper/profile-dropdown";
import ExtenderHeader from "../nav/extender-header";

const Navigation = () => {
  const currentUser = cookies().get("email");

  return (
    <>
      {/* Web View */}
      <div className="hidden md:flex items-center w-full justify-center">
        <Menu />
      </div>
      {/* Mobile */}
      <div className="md:hidden w-full flex items-center justify-between h-16 px-3">
        <ExtenderHeader />
        {/* <Avatar className="drop-shadow-sm">
          <AvatarFallback>{currentUser ?? "DVX"}</AvatarFallback>
        </Avatar> */}
        <div className="md:hidden">
          <ProfileDropdown email={currentUser?.value!} key={"MobileAvatar"} />
        </div>
      </div>
    </>
  );
};

export default Navigation;
