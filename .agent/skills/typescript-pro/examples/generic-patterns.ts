// @ts-nocheck
/**
 * Contoh: Generic Patterns & Discriminated Unions
 * Aturan Elite:
 * Gunakan Generics untuk tipe data container (seperti respons API dasar),
 * dan Discriminated Union untuk status (success vs error) sehingga tidak 
 * ada data 'undefined' yang dibiarkan menggantung.
 */

// 1. Generic API Response Wrapper
export type ApiResponse<T> =
  | { status: 'success'; data: T; timestamp: string }
  | { status: 'error'; error: string; code: number };

// 2. Tipe Bisnis Konkret
export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

// 3. Penggunaan
export const handleUserResponse = (response: ApiResponse<User>) => {
  // TypeScript secara otomatis membatasi scope berkat 'status'
  if (response.status === 'success') {
    // Di dalam scope ini, TS TAHU PASTI bahwa 'response.data' ada dan bertipe User
    console.log(`Berhasil memuat data user: ${response.data.email}`);
  } else {
    // Di sini TS TAHU PASTI bahwa 'error' ada
    console.error(`Gagal kode ${response.code}: ${response.error}`);
  }
};

/**
 * 4. Generic Function
 * Bisa memproses array tipe apapun dan mempertahankan tipenya (tidak jadi any).
 */
export function extractPlucks<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map(item => item[key]);
}
