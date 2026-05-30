---
name: api-patterns
description: "API design principles. REST vs GraphQL vs tRPC, standard response formats, versioning, rate limiting."
risk: low (safe structural rules)
source: "Elite Agent Operations"
date_updated: "2026-05-30"
---

# 🌐 Elite API Patterns

Skill ini mendikte bagaimana dua mesin (Klien dan Server) berkomunikasi dengan anggun. API yang tidak terstruktur akan membuat *Front-End Developer* (Klien) frustrasi dan memperlambat masa pengembangan secara drastis.

## 🎯 Tujuan Skill
Membakukan bentuk seragam (*Standard Response Format*) yang bisa diprediksi untuk setiap *request*, mencegah *breaking changes* melalui *Versioning*, dan melindungi peladen (*server*) dari serangan masif melalui *Rate Limiting*.

## ⚠️ Kapan Digunakan
- Saat mendesain rute API baru di sisi backend.
- Saat membuat kontrak integrasi data (API Docs / Swagger) untuk tim frontend.
- Saat mengkonfigurasi proksi atau pintu gerbang API (*API Gateway*).

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** merilis API tanpa memberikan nomor versi pada URL atau Header (contoh buruk: `/api/users`, seharusnya `/api/v1/users`).
2. **JANGAN PERNAH** membiarkan *server* mengembalikan format sukses dan format gagal yang memiliki struktur JSON berbeda secara mendasar.
3. **JANGAN PERNAH** menggunakan metode GET untuk operasi yang memodifikasi data (Mutasi) dan JANGAN menggunakan POST untuk sekadar mengambil data (Kecuali untuk *GraphQL/tRPC*). Patuhi standar REST.

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Standard Envelope**: Semua balasan harus dibungkus dalam entitas tunggal (`data`, `error`, `meta`). Lihat contoh di file `standard-response.ts`.
2. **Rate Limiter**: Wajib hukumnya memasang batas permintaan (*throttle/rate limit*) pada jalur *login/auth* untuk mencegah peretasan *Brute-force*.
3. **HTTP Status Codes**: Gunakan kode status dengan benar (200 Sukses, 201 Dibuat, 400 Kesalahan Klien, 401 Belum Auth, 403 Dilarang, 404 Tidak Ditemukan, 500 Kesalahan Server).

## 🛠 Proses Kerja
1. Pelajari spesifikasi OpenAPI/Swagger sebelum memprogram rute.
2. Integrasikan *Rate Limiter middleware* di tahap awal.
3. Gunakan *script* `audit-unversioned-api.sh` untuk memastikan semua rute memiliki perisai pembaruan (V1, V2).
