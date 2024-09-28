import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0.01, "Price must be at least 0.01"),
  availableStock: z.number().min(0, "Available stock must be at least 0"),
});
