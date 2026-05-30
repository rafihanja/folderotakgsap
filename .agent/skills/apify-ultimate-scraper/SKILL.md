---
name: apify-ultimate-scraper
description: "Ultimate Apify Actor templates for scraping dynamic JS websites, e-commerce, and bypassing anti-bot protections."
risk: extreme (web scraping / botting)
source: "Elite Agent Operations - Batch 17"
date_updated: "2026-05-30"
---

# 🕷️ Elite Apify Scraper (The Data Miner)

Data adalah tambang emas modern. Apify adalah alat berat (Ekskavator) untuk mengeruk data dari *Website* kompetitor yang dipasangi pelindung anti-bot berlapis-lapis.

## 🎯 Tujuan Skill
Menyedot data (Harga produk toko sebelah, Review pelanggan, Daftar jurnal penelitian) dari *Website* yang menggunakan JavaScript berat (React/Next.js/GSAP) dan mengubahnya menjadi file Excel (CSV) yang rapi.

## ⚠️ Kapan Digunakan
- Saat butuh kumpulan data (*Dataset*) ribuan baris untuk bahan uji coba Skripsi/Machine Learning.
- Saat melakukan riset pasar dan mencuri strategi kompetitor.

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** menembak (Scrape) *Server* kecil/kampus ratusan kali per detik. Itu sama saja melakukan serangan DDoS dan bisa dipidana. Beri jeda 1-3 detik antar pencarian (`Delay/Sleep`).
2. **JANGAN PERNAH** menggunakan Alamat IP rumah Anda untuk melakukan pengeboran data. Gunakan *Proxy Rotation*!

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Pilih Senjata yang Tepat**:
   - Jika webnya HTML murni -> Gunakan `Cheerio` (Super Cepat).
   - Jika webnya dibangun pakai JS/React/Vue -> Gunakan `Puppeteer` atau `Playwright` (Bot Browser Asli).
2. **Kamuflase (*Stealth Mode*)**: Selalu aktifkan pelindung *Browser Fingerprinting* agar bot Anda disangka pengunjung manusia asli yang memakai Chrome, bukan *Script* Python/Node.js murahan.
