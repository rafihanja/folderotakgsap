---
name: backend-architect
description: "Master software architect specializing in modern architecture, microservices, and clean code."
risk: low (safe architecture patterns)
source: "Elite Agent Operations"
date_updated: "2026-05-30"
---

# 🏗️ Elite Backend Architect

Skill ini mengatur hukum besi pembangunan *backend*. Backend yang buruk adalah mimpi buruk operasional: sulit diskalakan, mudah dijebol, dan mustahil di-debug ketika terjadi kegagalan sistem (*system failure*).

## 🎯 Tujuan Skill
Mencegah pembuatan kode *spaghetti* di sisi server, memastikan pemisahan tanggung jawab (*Separation of Concerns*) secara ketat melalui pola arsitektur, dan menjaga stabilitas API pada lalu lintas data tinggi (*high concurrency*).

## ⚠️ Kapan Digunakan
- Saat mendesain fitur baru yang membutuhkan komunikasi *Client-Server*.
- Saat merestrukturisasi (Refactoring) kode *backend* lama.
- Saat membuat titik rute (Endpoints) untuk API.

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** menaruh *Business Logic* (seperti rumus diskon, perhitungan poin, atau manipulasi *string* berat) di dalam *Controller*. *Controller* hanya untuk menerima *Request* dan mengirim *Response*.
2. **JANGAN PERNAH** mengakses *Database* (Repository/ORM) langsung dari *Controller*. Ini menghancurkan kemudahan *Unit Testing*.
3. **JANGAN PERNAH** menyimpan *state* yang terkait spesifik pada *User* di dalam memori server (seperti variabel global) jika Anda menggunakan *load balancer*. Selalu gunakan penyimpanan sentral (seperti Redis).

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Service Layer Pattern**: *Controller* memanggil *Service*, *Service* memanggil *Repository* (Database). Rantai ini mutlak.
2. **Stateless API**: Pastikan setiap permintaan API tidak bergantung pada sesi HTTP lokal (*stateless*). Otentikasi harus berbasis *Token* (JWT) yang diurai pada setiap siklus *request*.
3. **Graceful Shutdown**: Tangkap sinyal terminasi (`SIGINT/SIGTERM`) untuk menutup koneksi *Database/Redis* secara aman sebelum server mati.

## 🛠 Proses Kerja
1. Buat *Interface/DTO* untuk memvalidasi *payload request*.
2. Susun *Service* yang menangani algoritma.
3. Gunakan *Dependency Injection* jika menggunakan framework modern (seperti NestJS).
