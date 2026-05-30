---
name: docker
description: "Platform designed to help developers build, share, and run modern applications using containers"
risk: high (requires strict infrastructure compliance)
source: "Elite Agent Operations"
date_updated: "2026-05-30"
---

# 🐳 Elite Docker Architecture

Skill ini adalah landasan pembentukan *Container*. *Container* yang diracik sembarangan akan berukuran raksasa (berat saat *deploy*), memuat lubang keamanan (CVE), dan berjalan dengan akses administrator penuh yang membahayakan *host*.

## 🎯 Tujuan Skill
Memastikan semua Dockerfile mengadopsi ukuran minimal (menggunakan basis Alpine/Distroless), berjalan tanpa hak akses *Root*, dan memanfaatkan fitur tembolok (*Layer Caching*) untuk pembangunan (*build*) secepat kilat.

## ⚠️ Kapan Digunakan
- Saat mem-paket aplikasi untuk tahap *Production* (CI/CD Pipeline).
- Saat menstandarkan lingkungan lokal untuk *Developer* (Docker Compose).

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** menjalankan *container* produksi sebagai `root`. Jika aplikasi diretas, *hacker* memiliki kendali penuh di dalam kontainer.
2. **JANGAN PERNAH** menyertakan kredensial (seperti token akses GitHub pribadi atau NPM Token) langsung ke dalam *Image*.
3. **JANGAN PERNAH** menyalin seluruh direktori tanpa menggunakan file `.dockerignore`.

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Multi-Stage Builds**: Pisahkan tahap Pembangunan (*Builder* - yang berisi kode sumber penuh, compiler, ts-node) dengan tahap Rilis (*Runner* - yang hanya berisi Node.js dan file hasil kompilasi final).
2. **Layer Caching**: Salin `package.json` dan jalankan `npm install` TERLEBIH DAHULU sebelum menyalin seluruh *source code*. Ini akan menghemat waktu *build* 80% karena Docker tidak perlu mengunduh ulang *module* jika hanya kode Anda yang berubah.
3. **Non-Root User**: Pada akhir Dockerfile, alihkan eksekusi ke akun non-administrator (contoh di Node.js: `USER node`).

## 🛠 Proses Kerja
1. Gunakan templat `Dockerfile.elite` sebagai landasan proyek baru.
2. Pastikan file `docker-ignore-list.md` diterapkan ke proyek untuk mencegah kebocoran file lokal.
3. Gunakan `audit-docker-root.sh` untuk melacak kelalaian keamanan di *Dockerfile* lama.
