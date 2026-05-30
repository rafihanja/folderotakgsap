---
name: frontend-design
description: "SOP Elite untuk Desain UI/UX: Vibrancy, Layouting, dan Animasi."
risk: low (safe styling rules)
source: "Elite Agent Operations"
date_updated: "2026-05-30"
---

# 🎨 Elite Frontend Design Guidelines

Skill ini adalah "SOP Desainer Visual". Saat membangun UI, fungsionalitas saja tidak cukup. Desain harus memanjakan mata (*WOW Factor*). Agen tidak diizinkan membuat *layout* kaku ala tahun 2010.

## 🎯 Tujuan Skill
Memastikan setiap komponen yang dibuat memiliki kualitas premium: proporsi yang tepat, *white-space* yang bernapas, warna yang harmoni, dan transisi/animasi yang *smooth* (seperti mentega).

## ⚠️ Kapan Digunakan
- Saat mendesain struktur *Card*, *Hero Section*, atau *Form*.
- Saat memilih palet warna atau mengatur efek *hover*.
- Saat meninjau PR yang berkaitan dengan antarmuka visual.

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** menggunakan unit statis `px` untuk *margin/padding* skala besar. Gunakan `rem` agar mengikuti aksesibilitas *font-size* browser.
2. **JANGAN PERNAH** memakai bayangan (*box-shadow*) yang keras dan pekat (`opacity: 100%`). Bayangan harus halus, menyebar (*diffused*), dan transparan.
3. **JANGAN PERNAH** membuat tombol atau *link* interaktif tanpa *hover state* atau *active state*.

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Glassmorphism & Layering**: Gunakan kedalaman (*depth*). Elemen penting harus melayang di atas latar belakang dengan sedikit efek *blur* (*backdrop-filter*) jika relevan.
2. **Micro-animations**: Berikan transisi `.3s ease` pada elemen yang berinteraksi dengan kursor (*hover/focus*).
3. **Visual Hierarchy**: Elemen utama (H1) harus memiliki *weight* dan *size* dominan. Jangan takut memberi ruang kosong (*whitespace/gap*) agar elemen "bernapas".

## 🛠 Proses Kerja
1. Gunakan *Design Tokens* dari Tailwind CSS.
2. Verifikasi proporsi dengan aturan *8pt grid system* (menggunakan *spacing* `4, 8, 12, 16` dst).
3. Uji coba dengan *mouse hover* untuk memvalidasi *micro-animations*.
