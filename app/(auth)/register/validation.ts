import z from "zod";

// Define the validation schema
export const validationSchema = z
  .object({
    name: z.string().min(3, "Name should be at least 3 characters long"),
    email: z
      .string()
      .email("Email should be a valid email address")
      .min(1, "Email is required field")
      .refine(
        (value) =>
          value.endsWith("devexsolutions.com") ||
          value.endsWith("devexinc.com"),
        {
          message:
            'Email should end with "devexsolutions.com" or "devexinc.com"',
        }
      ),
    password: z
      .string()
      .min(6, "Password should be at least 6 characters long")
      .refine(
        (value) =>
          /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value),
        {
          message:
            "Password should contain at least one uppercase letter, one lowercase letter, and one digit",
        }
      ),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine(
    (data) => {
      const { password, confirmPassword } = data;
      return password === confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );
