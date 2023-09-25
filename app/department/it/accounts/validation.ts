import z from "zod";

// Define the validation schema
export const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "Clue your current password is 6 characters long or more"),
    newPassword: z
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
      const { newPassword, confirmPassword } = data;
      return newPassword === confirmPassword;
    },
    {
      message: "Password and confirm password do not match",
      path: ["confirmPassword"],
    }
  );
