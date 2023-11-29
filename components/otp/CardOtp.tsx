import { cookies } from "next/headers";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import OtpCardContent from "./otp-card-content";

const CardOtp = () => {
  const email = cookies().get("email")?.value;

  return (
    <Card className="w-full md:w-[450px] mx-2 md:mx-0  px-2 py-4">
      <CardHeader>
        <div className="w-full flex items-center justify-center mb-7 mt-4">
          <Image
            src="/origdevexlogo.svg"
            alt="Devex Inc logo"
            width={90}
            height={90}
            className="w-[90] md:w-[140px] h-auto"
          />
        </div>
        <CardTitle>OTP has been send!</CardTitle>
        <CardDescription>
          Please check{" "}
          {email ? <span className="font-bold">{email}</span> : "your"} email we
          have sent you the OTP code. If you didn&apos;t receive a code you can
          click the button &quot;Didn&apos;t receive a code?&quot; or restart
          your Thunderbird
        </CardDescription>
      </CardHeader>
      <OtpCardContent />
    </Card>
  );
};

export default CardOtp;
