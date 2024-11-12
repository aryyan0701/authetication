import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(4, "Username must be atleast 4 character")
  .max(8, "Username must be not more than 8 character");

export const signUpSchema = z.object({
  username: usernameValidation,

  email: z.string().email({ message: "invalid email address" }),

  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 character" })
    .max(10, { message: "Password must be not more than 10 characters" }),
});
