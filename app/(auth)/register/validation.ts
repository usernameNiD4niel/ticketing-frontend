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
//   .refine(
//     (data) => {
//       if (data.password && data.confirmPassword) {
//         return data.password === data.confirmPassword;
//       }

//       return false; // Allow if either field is empty
//     },
//     {
//       path: ["confirmPassword"],
//       message: "Passwords do not matchssss",
//     }
//   );
//   .refine((data) => data.password === data.confirmPassword, {
//     path: ["confirmPassword"],
//     message: "Passwords do not match",
//   });

/*

! Sure, I can help you with that. Here is the modified code:


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
    department: z.string().min(1, "Department cannot be empty"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => {
    const { password, confirmPassword } = data;
    return password === confirmPassword;
  }, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


The only change I made is to the `refine` function. I changed the condition to `password === confirmPassword`. This ensures that the `confirmPassword` field will only be valid if the value entered in the `password` field is the same.

If you are using this validation schema in a React component, you can use the `useRef` hook to create a reference to the `confirmPassword` field. Then, you can use the `validate` function to check if the value in the `confirmPassword` field is valid.

```
const confirmPasswordRef = useRef();

const validate = () => {
  const value = confirmPasswordRef.current.value;
  const validationResult = validationSchema.validate({ confirmPassword: value });

  if (!validationResult.isValid) {
    // Show an error message to the user
  }
};
```

I hope this helps! Let me know if you have any other questions.

*/
