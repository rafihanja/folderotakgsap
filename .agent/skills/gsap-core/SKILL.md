---
name: gsap-core
description: "GreenSock Animation Platform. The industry standard for web animation."
risk: medium (performance & memory leaks)
source: "Elite Agent Operations - Batch 8"
date_updated: "2026-05-30"
---

# 🟢 Elite GSAP Core (GreenSock)

GSAP adalah mesin penggerak situs-situs peraih penghargaan (Awwwards). Namun di tangan yang salah, animasi GSAP akan tumpang tindih, menyebabkan *memory leak*, dan membuat CPU pengguna terbakar hingga *browser* nge-lag.

## 🎯 Tujuan Skill
Memastikan setiap animasi dikontrol menggunakan *Timeline*, dikelola di dalam konteks (*Context*), dan **dibunuh** (*Killed*) saat elemen hilang dari layar (khususnya pada aplikasi React/SPA).

## ⚠️ Kapan Digunakan
- Saat menggerakkan posisi (x/y), rotasi, skala, atau opasitas elemen DOM.
- Saat membuat efek paralaks atau animasi kompleks yang bergantung pada urutan waktu (*sequencing*).

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** membiarkan *Tween* (`gsap.to`) terus berjalan setelah komponen dihancurkan (Unmount). Anda WAJIB membersihkannya.
2. **JANGAN PERNAH** menggunakan properti seperti `top`, `left`, `width`, atau `height` untuk dianimasikan! (Ini akan memaksa *Browser Reflow* yang sangat lambat). 
3. **JANGAN PERNAH** membuat efek berurutan tanpa `gsap.timeline()`. Menggunakan *delay* manual (`delay: 1.5`) adalah cara kuno yang rentan rusak.

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Gunakan Transform**: Selalu animasikan properti CSS `x`, `y`, `scale`, `rotation`, dan `opacity`. Properti ini diproses langsung oleh GPU (*Hardware Accelerated*).
2. **Gunakan gsap.context() (React)**: Jika Anda menggunakan React, selalu bungkus kode GSAP Anda di dalam `gsap.context()` (atau pakai hook `@gsap/react`) agar pembersihan animasi semudah memanggil `ctx.revert()`.

## 🛠 Proses Kerja
1. Pelajari pola pembersihan animasi di `gsap-elite-timeline.ts`.
2. Jalankan `audit-gsap-memory-leaks.sh` sebelum rilis untuk mencari kelalaian *cleanup* di `useEffect`.
