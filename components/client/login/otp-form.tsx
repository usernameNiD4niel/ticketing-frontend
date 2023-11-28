import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { MdMarkEmailUnread } from "react-icons/md";
import { getForgotPasswordOTP } from "@/endpoints";
import { LoadingButton } from "@/components/utils/LoadingButton";
import CustomAlert from "@/components/utils/CustomAlert";
import { useToast } from "@/components/ui/use-toast";

interface OtpFormProps {
  setIsCorrectOtp: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OtpForm({ setIsCorrectOtp }: OtpFormProps) {
  const emailRef = useRef<HTMLInputElement>(null);
  const otpRef = useRef<HTMLInputElement>(null);

  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [error, setError] = useState("");

  const { toast } = useToast();

  const handleSubmitOtp = () => {
    if (isLoadingButton) {
      return;
    }

    const email = emailRef.current!.value;
    const otp = otpRef.current!.value.toString();

    // check if the generatedOtp is equal to the otp from the user
    if (
      !(email.endsWith("devexsolutions.com") || email.endsWith("devexinc.com"))
    ) {
      setError("Only devexsolutions.com or devexinc.com are valid email");
      return;
    }

    if (generatedOtp.toString() !== otp) {
      setError("OTP is incorrect, please try again.");
      return;
    }

    // TODO: the user enter a correct otp, update the otp is correct
    localStorage.setItem("email", email);
    setIsCorrectOtp(true);
  };

  const handleSendEmail = async () => {
    setIsLoadingButton(true);
    const email = emailRef.current!.value;

    const { otp, message, success } = await getForgotPasswordOTP(email);

    console.log(`otp ::: ${otp}`);
    console.log(`message ::: ${message}`);

    if (success) {
      setError("");
      setGeneratedOtp(otp.toString());
      toast({
        title: "OTP sent successfully",
      });
    } else {
      setError(message);
    }
    setIsLoadingButton(false);
  };

  return (
    <div className="flex flex-col justify-center gap-y-3">
      {error && (
        <CustomAlert
          success={false}
          description={error}
          title="Validation Failed"
          key={"OTPFormCustomAlert"}
        />
      )}
      <div>
        <div className="flex items-center gap-x-2">
          <Input
            id="email"
            placeholder="juantamad@devexsolutions.com"
            type="email"
            required
            className="col-span-3"
            ref={emailRef}
          />
          {!isLoadingButton ? (
            <Button type="button" onClick={handleSendEmail}>
              {/* <span className="hidden md:block text-xs">Get OTP</span> */}
              <span className=" text-xl">
                <MdMarkEmailUnread />
              </span>
            </Button>
          ) : (
            <LoadingButton isFullWidth={false} key={"OTPFormLoadingButton"} />
          )}
        </div>
      </div>
      <Input
        placeholder="Enter your OTP here"
        type="password"
        required
        maxLength={6}
        className="col-span-3"
        ref={otpRef}
      />
      <div className="w-full flex justify-end mt-2">
        <Button type="button" className="w-full" onClick={handleSubmitOtp}>
          Submit
        </Button>
      </div>
    </div>
  );
}
