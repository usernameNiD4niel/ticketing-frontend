import UpdatePassword from "@/components/utils/UpdatePassword";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AccountTab = () => {
  const token = cookies().get("token")?.value;
  const email = cookies().get("email")?.value;

  if (!token || !email) {
    redirect("/login");
  }

  return (
    <div className="my-5 mx-3 text-xs md:text-sm">
      <UpdatePassword token={token} email={email} />
    </div>
  );
};

export default AccountTab;
