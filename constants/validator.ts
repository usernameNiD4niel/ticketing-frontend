import z from "zod";

// Define the validation schema
export const otpValidationSchema = z.object({
  email: z
    .string()
    .email("Email should be a valid email address")
    .min(1, "Email is required field")
    .refine(
      (value) =>
        value.endsWith("devexsolutions.com") || value.endsWith("devexinc.com"),
      {
        message: 'Email should end with "devexsolutions.com" or "devexinc.com"',
      }
    ),
  otp: z.string().refine((value) => /^\d{6}$/.test(value), {
    message: "OTP must be a 6-digit number.",
  }),
});

export const reportsFilterSchema = z.object({
  championName: z.string().min(2).max(50),
  start: z.string().min(6).max(50),
  end: z.string().min(6).max(50),
});

// ! Export table as CSV file
// ! https://medium.com/how-to-react/how-to-add-export-to-csv-button-in-react-table-7e77ce93838b
