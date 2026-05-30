// @ts-nocheck
import { z } from 'zod';

/**
 * Contoh: Runtime Validation dengan Zod
 * Aturan Elite:
 * Jangan percaya tipe data dari API meskipun backend menjanjikan format tertentu.
 * Parsing data dengan Zod akan menolak format yang salah di runtime sebelum masuk
 * ke state aplikasi Anda.
 */

// 1. Definisikan Schema Runtime (Single Source of Truth)
export const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3),
  price: z.number().positive(),
  tags: z.array(z.string()).optional(),
  isAvailable: z.boolean().default(true),
});

// 2. Ekstrak Type (Compile-time) secara otomatis
// Daripada menulis interface secara manual, ekstrak dari Schema.
export type Product = z.infer<typeof ProductSchema>;

// 3. Implementasi fetching yang kebal peluru
export const fetchProduct = async (productId: string): Promise<Product> => {
  const response = await fetch(`/api/products/${productId}`);
  
  if (!response.ok) {
    throw new Error('Network error');
  }

  const rawData = await response.json();
  
  // Ini adalah jantung dari keamanan Elite:
  // parse() akan melempar error otomatis jika rawData tidak sesuai schema.
  // safeParse() mengembalikan union type tanpa melempar error.
  const parsedData = ProductSchema.parse(rawData);
  
  return parsedData;
};
