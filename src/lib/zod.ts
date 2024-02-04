import { z } from "zod";
export const ProductsSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  brand: z.string(),
  category: z.string(),
  thumbnail: z.string().url(),
  images: z.array(z.string().url()),
});

export const responseSchema = z.object({
  products: z.array(ProductsSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export type ProductsType = z.infer<typeof ProductsSchema>;
