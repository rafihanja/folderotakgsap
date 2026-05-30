---
name: schema-markup
description: "Design, validate, and optimize schema.org structured data for eligibility, correctness, and measurable SEO impact."
risk: low (marketing)
source: "Elite Agent Operations - Batch 13"
date_updated: "2026-05-30"
---

# 🏷️ Elite Schema Markup (JSON-LD)

Pernah liat hasil pencarian Google yang ada bintang 5 (Rating), harga produk, atau daftar resep masakan langsung di halaman Google? Itu bukan sihir, itu adalah **Schema Markup (Structured Data)**.

## 🎯 Tujuan Skill
Memberikan "Kartu Identitas" resmi (*JSON-LD*) di balik layar agar mesin pencari (Google/Bing/AI) tidak perlu menebak-nebak apa isi halaman web Anda.

## ⚠️ Kapan Digunakan
- Saat membuat halaman Produk E-commerce, Resep Makanan, Berita Artikel, atau Event Acara.

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** memberikan *Schema* palsu (Contoh: Web lu tentang bengkel, tapi lu kasih Schema bertipe "Produk Baju"). Google akan memberi penalti (*Spam Penalty*).

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **JSON-LD**: Selalu suntikkan script `<script type="application/ld+json">` di kepala (`<head>`) dokumen HTML. Ini adalah format kesukaan Google dibanding format *Microdata* kuno.
