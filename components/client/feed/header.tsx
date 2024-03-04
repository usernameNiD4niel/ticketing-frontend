import ProfileDropdown from "@/components/server/hr/helper/profile-dropdown";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Header() {
  const email = cookies().get("email")?.value;

  if (!email || email === undefined || email === null) {
    redirect("/login");
  }

  return (
    <div className="w-full hidden md:flex justify-between">
      <h1 className="font-bold text-lg md:text-2xl">Feed</h1>
      <ProfileDropdown email={email} />
    </div>
  );
}
