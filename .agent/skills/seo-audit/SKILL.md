---
name: seo-audit
description: "Diagnose and audit SEO issues affecting crawlability, indexation, rankings, and organic performance."
risk: low (safe text and meta patterns)
source: "Elite Agent Operations"
date_updated: "2026-05-30"
---

# 🔎 Elite SEO Audit Patterns

Skill ini mengatur bagaimana struktur HTML harus ditulis agar di-anakemaskan oleh *search engine* (Google, Bing). Kecepatan (*Core Web Vitals*) dan semantik yang jelas adalah kunci utama. UI/UX yang indah tidak ada gunanya jika web tidak bisa ditemukan di Google.

## 🎯 Tujuan Skill
Memastikan semua halaman web mematuhi aturan Semantik HTML5, memiliki Meta Tags yang komprehensif, dan bebas dari kelemahan aksesibilitas (A11y) dasar yang menghukum peringkat pencarian.

## ⚠️ Kapan Digunakan
- Saat mendesain struktur kerangka (*layout*) halaman.
- Saat menambahkan *image*, *link*, atau konten multimedia.
- Saat menyusun komponen `Head` untuk *Next.js/React* atau *raw HTML*.

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** menggunakan `<div>` untuk segalanya (*Div Soup*). Header, Navigasi, Main, Article, dan Footer memiliki tag semantiknya sendiri.
2. **JANGAN PERNAH** merender gambar `<img>` tanpa atribut `alt`. Ini adalah dosa besar SEO dan Aksesibilitas. Jika gambar murni dekoratif, set `alt=""`.
3. **JANGAN PERNAH** memiliki lebih dari satu tag `<h1>` per halaman yang dirender.

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Semantic HTML5**: Gunakan `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, dan `<footer>` dengan benar. Mesin pencari menggunakan ini untuk memahami hierarki konten.
2. **Open Graph & Twitter Cards**: Selalu sertakan meta tag sosial agar tautan terlihat profesional ketika dibagikan di WhatsApp, Twitter, atau Facebook.
3. **Lazy Loading**: Tambahkan `loading="lazy"` pada gambar yang berada di luar *viewport* awal untuk mempercepat *Largest Contentful Paint* (LCP).

## 🛠 Proses Kerja
1. Bangun kerangka semantik HTML5 terlebih dahulu.
2. Suntikkan Meta Tags lengkap di bagian `<head>`.
3. Gunakan *script* audit bawaan `audit-missing-alt-tags.sh` sebelum rilis.
