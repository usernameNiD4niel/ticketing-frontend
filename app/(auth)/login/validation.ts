import z from "zod";

// Define the validation schema
export const validationSchema = z.object({
  email: z
    .string()
    .email("Email should be a valid email address")
    .min(1, "Email is required field")
    .refine(
      (value) =>
        value.endsWith("devexsolutions.com") ||
        value.endsWith("devexinc.com") ||
        value.endsWith("superaccount.com"),
      {
        message: 'Email should end with "devexsolutions.com" or "devexinc.com"',
      }
    ),
  password: z.string().min(6, "Password should be at least 6 characters long"),
});
