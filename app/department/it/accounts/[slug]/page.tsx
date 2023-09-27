"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { FC, useState } from "react";
import Cookies from "js-cookie";
import { LoadingButton } from "@/components/utils/LoadingButton";
import AccountRecent from "@/components/utils/AccountRecent";
import UpdatePassword from "@/components/utils/UpdatePassword";
import EditProfile from "@/components/server/accounts/EditProfile";

type AccountTabProps = {
  params: { slug: string };
};

const AccountTab: FC<AccountTabProps> = ({ params }) => {
  let contentTab = null;

  const token = Cookies.get("token") || "no token";

  const router = useRouter();

  if (!token) {
    router.push("/login");
    return;
  }

  if (params.slug === "recent") {
    contentTab = <AccountRecent />;
  } else if (params.slug === "edit-profile") {
    contentTab = <EditProfile />;
  } else if (params.slug === "update-password") {
    contentTab = <UpdatePassword token={token} />;
  } else {
    contentTab = <Settings />;
  }

  return <div className="my-5 mx-3 text-xs md:text-sm">{contentTab}</div>;
};

const Settings = () => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    Cookies.remove("email");
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("name");
    localStorage.clear();
    router.push("/login");
  };

  return (
    <div className="flex justify-center items-center my-10">
      <div className="w-full md:w-[70%] flex flex-col gap-5">
        <div className="w-full flex items-center justify-end">
          {isLoggingOut ? (
            <LoadingButton isFullWidth={false} />
          ) : (
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
        <hr />
        <div className="my-4 space-y-5">
          <div>
            <h3 className="text-lg font-bold">Feedback</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis incidunt, error minus iste quos corrupti?
            </p>
          </div>
          <Input placeholder="Type of your concern" />
          <Textarea placeholder="Justify your concern here" />
          <Button>Submit</Button>
        </div>
        <hr />
        <div className="my-4 space-y-2">
          <h3 className="text-lg font-bold">About</h3>
          <p className="text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            incidunt, error minus iste quos corrupti? Lorem ipsum dolor, sit
            amet consectetur adipisicing elit. Voluptate aut sequi temporibus
            tenetur omnis. Dolorem, modi in asperiores illo hic ipsum autem
            nulla vel incidunt ut aliquid cupiditate laboriosam fugiat cum
            debitis similique numquam minima nobis excepturi pariatur temporibus
            provident. Quisquam veritatis porro, voluptatum quo rem quos,
            soluta, eos nisi excepturi velit quidem? Enim, ipsam est. Eius
            voluptas voluptatibus obcaecati ratione exercitationem iste autem,
            illum reprehenderit possimus praesentium debitis, quasi cum
            repellendus iusto tempore veniam unde, soluta corrupti molestiae
            nisi est. Minus, quasi iste? Accusamus quod expedita praesentium
            impedit dicta odit illo suscipit laudantium. Quo non consequatur eum
            magnam possimus.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountTab;
