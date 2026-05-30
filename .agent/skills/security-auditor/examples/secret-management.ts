// @ts-nocheck
/**
 * Contoh: Manajemen Rahasia (Secret Management)
 * Aturan Elite: JANGAN PERNAH hardcode rahasia. Selalu validasi .env.
 */

import { z } from 'zod';

// 1. ❌ DOSA FATAL (Jangan Ditiru!)
export const connectToDatabaseBad = () => {
  // Hardcoded password = bunuh diri jika kode ini bocor ke publik.
  const dbUrl = "postgres://admin:SuperSecretPassword123@localhost:5432/db";
  console.log(`Connecting to ${dbUrl}...`);
};


// 2. ✅ STANDAR ELITE
// Kita validasi variabel lingkungan (.env) saat aplikasi dihidupkan.
// Jika .env tidak lengkap, aplikasi akan GAGAL NYALA (Fail Fast). Ini jauh lebih baik
// daripada aplikasi nyala tapi diam-diam mengalami kegagalan sistem.

const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

// Mengekstrak tipe dari skema Zod
type Env = z.infer<typeof EnvSchema>;

export const getEnv = (): Env => {
  try {
    return EnvSchema.parse(process.env);
  } catch (error) {
    console.error("🚨 [FATAL ERROR] Variabel Lingkungan (.env) tidak valid atau hilang!");
    console.error(error);
    process.exit(1); // Matikan aplikasi seketika.
  }
};

// 3. Penggunaan
export const connectToDatabaseElite = () => {
  const env = getEnv();
  // Di sini env.DATABASE_URL dijamin ada dan bertipe string URL valid.
  console.log(`Menyambungkan ke database dengan aman...`);
};
