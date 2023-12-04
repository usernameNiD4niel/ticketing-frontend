import { z } from "zod";

export const formSchema = z.object({
  location: z.string().min(2).max(50),
});

export const editSchema = z.object({
  updatedLocation: z.string().min(2).max(50),
});
