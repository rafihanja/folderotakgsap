---
name: typescript-pro
description: "Master TypeScript: strict mode, generics, discriminated unions, and runtime validation."
risk: low (safe typing patterns)
source: "Elite Agent Operations"
date_updated: "2026-05-30"
---

# 🛡️ Elite TypeScript Pro

Skill ini mendefinisikan aturan ketat untuk keamanan tipe (Type Safety) dalam aplikasi skala besar. Kode yang tidak memiliki validasi tipe yang jelas bagaikan bom waktu yang menanti untuk meledak di mode *production*.

## 🎯 Tujuan Skill
Memastikan setiap data (terutama dari API eksternal) divalidasi, serta mengeliminasi tebak-tebakan tipe dari *compiler*.

## ⚠️ Kapan Digunakan
- Saat mendefinisikan *payload* dari/ke API (REST/GraphQL).
- Saat membuat fungsi utilitas umum (*Utility Functions*).
- Saat menulis *state* kompleks dalam aplikasi React.

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** menggunakan tipe `any` kecuali untuk melakukan *type-casting* darurat yang segera disembunyikan di balik fungsi yang sudah di-tipe dengan benar.
2. **JANGAN PERNAH** me-lempar (*throw*) error tanpa menangkapnya sebagai `unknown` dan memeriksanya (di TypeScript 4.4+).
3. **JANGAN PERNAH** mendefinisikan tipe dengan singkatan yang tidak jelas seperti `type T = ...`.

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Runtime Validation**: TypeScript HANYA melindungi Anda selama masa kompilasi (*compile-time*). Untuk data yang datang dari internet (API), wajib gunakan perpustakaan validasi runtime seperti **Zod**.
2. **Discriminated Unions**: Jika status aplikasi memiliki cabang yang berbeda (misal: sukses/gagal), jangan satukan semuanya dalam tipe opsional raksasa. Gunakan tag literal pembeda (seperti `status: 'success'`).
3. **Generics Secara Terukur**: Gunakan Generics `<T>` untuk komponen yang dapat digunakan ulang (seperti *Table* atau *Select Dropdown*) agar tipe data yang dikembalikan tidak hilang.

## 🛠 Proses Kerja
1. Bangun Skema Zod sebelum Anda mendefinisikan *Interface*.
2. Ekstrak *Type* dari Zod Schema menggunakan `z.infer`.
3. Jalankan `audit-any-types.sh` untuk memastikan tidak ada celah di dalam perlindungan tipe.
