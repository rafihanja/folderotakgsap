---
name: framer-motion
description: "Production-ready declarative animations for React and Next.js"
risk: low (UI layer)
source: "Elite Agent Operations - Batch 8"
date_updated: "2026-05-30"
---

# 🚀 Elite Framer Motion

Framer Motion adalah raja dari *Animasi Deklaratif* di ekosistem React. Berbeda dengan GSAP yang Imperatif (memberikan perintah dari A ke B), Framer bereaksi secara otomatis terhadap perubahan *State* komponen (React-way).

## 🎯 Tujuan Skill
Membuat transisi halaman yang mulus (*Page Transitions*), orkestrasi elemen kompleks (*Staggering*), dan *Micro-interactions* interaktif dengan format kode yang sangat rapi.

## ⚠️ Kapan Digunakan
- Saat membuat animasi keluar/masuk komponen (`AnimatePresence`).
- Saat menganimasikan perubahan tata letak yang kompleks secara otomatis (`layout` prop).
- Saat berhadapan dengan *Drag* and *Drop* gesekan UI.

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** menuliskan objek animasi yang sangat rumit langsung (inline) di dalam properti `animate={{ x: 1, y: 2, scale: 0.5, ... }}`. Kode Anda akan menjadi bubur yang tidak terbaca.
2. **JANGAN MENGGUNAKAN** GSAP dan Framer Motion secara tumpang tindih pada elemen DOM yang SAMA. Mereka akan memperebutkan kontrol *style* CSS.

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Gunakan Variants**: Ekstrak objek animasi Anda ke luar komponen menjadi kamus *Variants* terpisah. (Lihat `framer-variants.tsx`).
2. **Orkestrasi Bawaan**: Manfaatkan `staggerChildren` di dalam parent Variant untuk membuat efek gelombang elemen, daripada menggunakan fungsi *delay* matematika yang rumit.

## 🛠 Proses Kerja
1. Deklarasikan `<motion.div>` sebagai pengganti `<div>`.
2. Gunakan pola dari `framer-variants.tsx` untuk menjaga komponen tetap bersih.
