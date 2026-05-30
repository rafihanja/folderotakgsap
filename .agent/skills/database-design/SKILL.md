---
name: database-design
description: "Database design principles, indexing strategy, prevention of N+1 queries, and normalization."
risk: medium (schema design rules)
source: "Elite Agent Operations"
date_updated: "2026-05-30"
---

# 🗄️ Elite Database Design

Skill ini mengatur desain dasar penyusunan tabel atau dokumen *database*. Basis data adalah komponen paling kritis dan paling sulit diubah ketika aplikasi sudah berjalan. Kesalahan desain tabel hari ini adalah bencana kinerja di tahun depan.

## 🎯 Tujuan Skill
Memastikan skema basis data (*schema*) efisien, dinormalisasi dengan benar (hingga skala tertentu), memiliki indeks (*indexing*) yang tepat untuk pencarian cepat, dan terhindar dari *query* perusak performa seperti N+1.

## ⚠️ Kapan Digunakan
- Saat mendesain entitas/tabel baru di tahap awal pengembangan.
- Saat menulis kueri kompleks (SQL/NoSQL) atau menggunakan ORM (Prisma/Drizzle/Sequelize).
- Saat aplikasi mulai terasa lambat karena waktu tunggu *database*.

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** merilis fitur pencarian teks, rentang tanggal, atau pengurutan besar tanpa membuat **INDEX** di kolom yang bersangkutan.
2. **JANGAN PERNAH** menggunakan fungsi `SELECT *` dalam operasi produksi. Panggil hanya kolom spesifik yang dibutuhkan oleh aplikasi (contoh: `SELECT id, name`).
3. **JANGAN PERNAH** mengeksekusi kueri dalam perulangan `for/while` (Ini adalah kutukan N+1).

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Pola Penamaan**: Gunakan penamaan `snake_case` untuk tabel dan kolom SQL (misal: `user_profiles`, `created_at`). Jangan gunakan `camelCase` di level basis data SQL.
2. **Soft Deletes**: Jangan pernah menggunakan operasi `DELETE` permanen untuk data penting pengguna (seperti transaksi). Gunakan kolom `deleted_at` atau status aktif/tidak aktif.
3. **Eager Loading / DataLoader**: Jika Anda menarik daftar 100 *User* beserta daftar *Postingan* mereka, kumpulkan ID *user* dan tembak *Postingan* dalam SATU kueri tunggal (`WHERE user_id IN (...)`), bukan 100 kueri.

## 🛠 Proses Kerja
1. Buat diagram relasi (*Entity Relationship*) di atas kertas/sistem sebelum menulis migrasi.
2. Identifikasi potensi *query* berulang, lalu buat *Index* pada kolom Foreign Key.
3. Jalankan `audit-select-star.sh` untuk mengecek kualitas kueri mentah di *codebase*.
