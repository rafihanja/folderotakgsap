---
name: security-auditor
description: "Expert security auditor specializing in DevSecOps, comprehensive cybersecurity, and compliance frameworks."
risk: high (requires strict compliance)
source: "Elite Agent Operations"
date_updated: "2026-05-30"
---

# 🛡️ Elite Security Auditor

Keamanan bukan sekadar fitur, melainkan urat nadi dari sebuah aplikasi. Aplikasi sehebat apa pun akan hancur reputasinya dalam semalam jika data pelanggannya bocor ke *Dark Web* karena kelalaian *developer*.

## 🎯 Tujuan Skill
Memastikan setiap baris kode yang ditulis bebas dari celah kerentanan (seperti OWASP Top 10), mengelola kunci rahasia secara profesional, dan mendeteksi injeksi berbahaya sebelum masuk ke tahap *production*.

## ⚠️ Kapan Digunakan
- Saat mengelola Kunci API (API Keys), Token, atau Kata Sandi.
- Saat menerima input dari *User* (Formulir, URL Parameter, JSON Payload).
- Saat meninjau Kode (Code Review/Pull Request) sebelum digabungkan ke cabang utama.

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** menulis *password*, rahasia JWT, atau token API langsung di dalam *source code* (Hardcoding).
2. **JANGAN PERNAH** merender atau memasukkan input pengguna langsung ke dalam HTML mentah (XSS Vulnerability) atau Kueri SQL (SQL Injection Vulnerability).
3. **JANGAN PERNAH** mengirim (*commit*) file `.env` yang berisi kredensial asli ke sistem kontrol versi (Git/GitHub).

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Sanitasi Input**: Segala data yang datang dari luar server HARUS dianggap sebagai "racun" dan wajib divalidasi (menggunakan Zod, Joi, atau pustaka sanitasi lainnya).
2. **Environment Variables**: Sentralisasikan semua rahasia ke dalam `.env` atau layanan rahasia awan (*Cloud Secret Manager*).
3. **Least Privilege**: Berikan hak akses seminimal mungkin. Jika fungsi A hanya butuh membaca data, jangan beri ia izin administrator.

## 🛠 Proses Kerja
1. Gunakan file `secret-management.ts` sebagai pedoman membaca variabel rahasia.
2. Centang semua poin di `owasp-top-10-checklist.md` sebelum perilisan besar.
3. Jalankan rutin `audit-hardcoded-secrets.sh` di setiap *pipeline CI/CD*.
