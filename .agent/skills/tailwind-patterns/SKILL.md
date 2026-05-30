---
name: tailwind-patterns
description: "Tailwind CSS v4 principles. CSS-first configuration, container queries, modern patterns, design token architecture."
risk: low (safe styling patterns)
source: "Elite Agent Operations"
date_updated: "2026-05-30"
---

# 🎨 Elite Tailwind Patterns (v4)

Skill ini mengatur arsitektur *styling* aplikasi menggunakan Tailwind CSS versi terbaru (v4). Pendekatan *Utility-first* sangat kuat, namun jika tidak dikelola dengan baik akan menghasilkan baris kode *class* yang berantakan (*class soup*).

## 🎯 Tujuan Skill
Memastikan sistem desain tetap konsisten, *maintainable*, dan sesuai dengan fitur modern v4 (seperti konfigurasi berbasis CSS murni, *Container Queries*, dan *Fluid Typography*).

## ⚠️ Kapan Digunakan
- Saat membangun atau memperbarui antarmuka pengguna (UI).
- Saat menerjemahkan desain (Figma/Sketch) ke dalam kode.
- Saat melakukan audit dan pembersihan CSS *class* yang berlebihan.

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** menggunakan *Arbitrary Values* secara masif untuk warna atau spasi yang berulang (contoh: `text-[#123456]` atau `p-[17px]`). Ini menghancurkan *Design System*. Selalu buat *token*!
2. **JANGAN PERNAH** menggunakan *Media Queries* lawas (`sm:`, `md:`) jika komponen tersebut adalah komponen mandiri yang ukurannya bergantung pada *container* induknya. Gunakan `@container` dan `@size`.
3. **JANGAN PERNAH** mencampur Tailwind dengan CSS eksternal/tradisional untuk komponen yang sama kecuali sangat terpaksa (seperti animasi super kompleks).

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Design Tokens First**: Definisikan warna utama, *font*, dan spasi di file CSS root menggunakan sintaks `@theme`.
2. **Container Queries (@)**: Komponen yang dapat digunakan ulang (seperti *Card*) harus merespons ukuran pembungkusnya (`@container`), bukan ukuran layar (*viewport*).
3. **Semantic Grouping**: Kelompokkan kelas secara logis: Layout -> Spacing -> Typography -> Visuals -> Interactivity.

## 🛠 Proses Kerja
1. Periksa `design-tokens.css` sebelum memulai styling.
2. Gunakan *utility classes* yang tersedia.
3. Hindari pembuatan komponen *wrapper* yang hanya berisi sedikit styling; gunakan *class* langsung jika memungkinkan, atau pisahkan ke ranah UI.
