import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie";

export default function ChangePasswordForm() {
  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    setTimeout(() => Cookies.set(fieldName, event.target.value), 100);
  };

  return (
    <>
      <div className="flex flex-col justify-center gap-y-2">
        <Label className="space-y-2">
          <span>New Password</span>
          <Input
            id="newPassword"
            placeholder="Enter your new password"
            className="col-span-3"
            type="password"
            onChange={(e) => handleOnChange(e, "newPassword")}
          />
        </Label>
      </div>
      <div className="flex flex-col justify-center gap-y-2">
        <Label className="space-y-2">
          <span>Confirm Password</span>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Re-type your new password"
            className="col-span-3"
            onChange={(e) => handleOnChange(e, "confirmPassword")}
          />
        </Label>
      </div>
    </>
  );
}
