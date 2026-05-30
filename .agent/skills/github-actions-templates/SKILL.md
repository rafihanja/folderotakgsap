---
name: github-actions-templates
description: "Production-ready GitHub Actions workflow patterns for testing, building, and deploying applications."
risk: high (deployment pipeline)
source: "Elite Agent Operations - Batch 12"
date_updated: "2026-05-30"
---

# 🤖 Elite GitHub Actions (CI/CD)

GitHub Actions adalah sekumpulan robot tak kasat mata yang akan bangun secara otomatis setiap kali Anda menekan *Push*. Mereka akan mengetes kode Anda, mem- *build* Docker, dan melemparnya ke server *Production*.

## 🎯 Tujuan Skill
Mematikan cara rilis kuno (Upload FTP/Drag & Drop ke cPanel). Mengubah rilis aplikasi semudah mengklik tombol "Merge" (Continuous Deployment).

## ⚠️ Kapan Digunakan
- Saat tim proyek mulai membesar dan bentrokan kode sering terjadi.
- Saat QA/Tester capek mengetes fitur secara manual satu persatu.

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** menyimpan token rahasia (seperti Token AWS atau Token Docker) langsung di file `.yml`. Selalu gunakan `secrets.NAMA_TOKEN`.
2. **JANGAN PERNAH** membuat satu *Workflow* raksasa yang tidak bisa dibaca. Pecah menjadi *Job* terpisah (`test`, `build`, `deploy`).

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Caching**: Jika proyek Node.js Anda memuat ribuan `node_modules`, pastikan mengaktifkan *Cache* agar GitHub Actions tidak perlu mengunduh 500MB internet setiap kali jalan.
2. **Required Status Checks**: Kunci cabang `main` Anda di pengaturan GitHub. Jangan biarkan siapapun menggabungkan kode jika robot GitHub Actions berstatus *Merah* (Tes Gagal).
