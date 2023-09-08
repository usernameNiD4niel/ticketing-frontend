import { z } from "zod";

export const otpValidationSchema = z.string().refine(
  (value) => {
    const regexPattern = /^[1-9]\d{5}$/;
    return regexPattern.test(value);
  },
  {
    message: "OTP should be a 6-digit positive integer",
  }
);
