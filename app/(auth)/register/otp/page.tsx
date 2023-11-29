import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CardOtp from "@/components/otp/CardOtp";

const Otp = () => {
  const token = cookies().get("token")?.value;

  if (token) {
    redirect("/");
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <CardOtp />
    </div>
  );
};

export default Otp;
