---
name: n8n-workflow-patterns
description: "Proven architectural patterns for building n8n workflows."
risk: high (system integration)
source: "Elite Agent Operations - Batch 17"
date_updated: "2026-05-30"
---

# ⚙️ Elite n8n Workflow Patterns (The Automator)

Sebagai *Solo Founder*, lu nggak bisa kerja 24 jam. Biarkan n8n.io (Alat otomatisasi seperti Zapier tapi gratis & *Open Source*) yang jadi asisten pribadi lu malam-malam.

## 🎯 Tujuan Skill
Membuat alur otomatisasi lintas aplikasi (Contoh: Webhook nangkep isi *Form* GSAP lu -> Bikin baris baru di Google Sheets -> Ngirim notifikasi pesan ke Telegram/Discord lu -> Nge- *blast* Email balasan).

## ⚠️ Kapan Digunakan
- Saat menghubungkan *Frontend Website* ke layanan pihak ketiga (Database, Email, CRM).
- Saat capek melakukan *copy-paste* data secara manual tiap hari.

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** membuat satu aliran n8n yang lurus memanjang tanpa penanganan eror (*Error node*). Jika API Telegram mati sehari, seluruh data pendaftar lu akan hangus.
2. **JANGAN PERNAH** menaruh kunci rahasia (*API Key*) di dalam *Node* HTTP Request secara *hardcode*. Gunakan fitur `Credentials` bawaan n8n.

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Pemisah Logika (Switch & If)**: Filter data sampah (Spam) di awal *Workflow*. Jika alamat email *user* tidak mengandung `@`, buang langsung ke keranjang sampah tanpa memanggil API pihak ketiga yang berbayar.
2. **Sub-Workflows**: Jika pola *Node* (Misal: Pola mengirim Notifikasi Slack) dipakai di 10 alur yang berbeda, jadikan dia *Sub-Workflow* (Di n8n: `Execute Workflow Node`). Biar kalau format pesan Slack diganti, lu cukup edit di 1 tempat, bukan di 10 tempat!
