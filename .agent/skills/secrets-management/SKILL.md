---
name: secrets-management
description: "Secure secrets management practices for CI/CD pipelines using Vault, AWS Secrets Manager, and other tools."
risk: extreme (security)
source: "Elite Agent Operations - Batch 14"
date_updated: "2026-05-30"
---

# 🔐 Elite Secrets Management

Kebocoran database terjadi bukan karena *Hacker* sangat jenius, melainkan karena *Programmer* bodoh yang menaruh *Password* Database mereka langsung di file konfigurasi publik.

## 🎯 Tujuan Skill
Memastikan Kunci API (Stripe/Payment), Password Database, dan Sertifikat berada di brankas terenkripsi (Misal: HashiCorp Vault, AWS Secrets Manager) dan hanya diinjeksikan ke memori aplikasi sesaat sebelum berjalan.

## ⚠️ Kapan Digunakan
- Saat mengatur variabel lingkungan (*Environment Variables* / `.env`).

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** menyimpan file `.env` di repositori Git (Pastikan masuk `.gitignore`).
2. **JANGAN PERNAH** mengirimkan file `.env` via WhatsApp atau Slack ke teman tim Anda. Gunakan pengelola rahasia seperti Bitwarden atau 1Password.

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Zero Trust / Secret Rotation**: Buat agar *password* database otomatis terganti oleh sistem (Vault) setiap 30 hari. Jika kunci tersebut tercuri, ia akan hangus dalam sebulan.
