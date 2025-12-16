import { z } from "zod";


export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(50, { message: "Password is too long" }),
});

export const RegisterFormSchema = z.object({
  image: z.instanceof(File).optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})


export type RegisterFormValues = z.infer<typeof RegisterFormSchema>;
export type LoginFormValues = z.infer<typeof loginFormSchema>;
