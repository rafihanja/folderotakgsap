---
name: code-reviewer
description: "Elite code review expert specializing in modern AI-powered code"
risk: medium (quality control gate)
source: "Elite Agent Operations - The Grand Finale"
date_updated: "2026-05-30"
---

# 🧐 Elite Code Reviewer

*Code Review* (Tinjauan Kode) adalah gerbang terakhir sebelum *Bug* atau kode jelek masuk ke *Production*. Reviewer Elite tidak mencari-cari kesalahan titik koma (itu tugas *Linter/Prettier*), melainkan menganalisis logika, keamanan, dan kinerja arsitektur.

## 🎯 Tujuan Skill
Memastikan setiap cabang kode (*Branch/Pull Request*) memenuhi standar minimum klan Elite sebelum digabungkan ke cabang utama (*Master/Main*).

## ⚠️ Kapan Digunakan
- Saat AI selesai mengimplementasikan tugas dan bersiap untuk menyerahkannya kepada pengguna.
- Saat melakukan *Pull Request* di GitHub/Gitlab.

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** menyetujui (Approve) kode yang tidak memiliki deskripsi tujuan perubahan (*PR Description*).
2. **JANGAN PERNAH** berdebat soal format spasi/tab di Code Review. Gunakan alat otomatis (*Formatter*) untuk itu. Fokuslah pada algoritma.

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Pola Sandwich**: Beri komentar positif (Pujian), lalu berikan kritik konstruktif, tutup dengan semangat.
2. **Review Berlapis**: Cek Keamanan dulu (Ada token bocor?), lalu Kinerja (Ada N+1?), lalu Kebersihan (*Clean Code*).

## 🛠 Proses Kerja
1. Pastikan setiap titik pada `pr-checklist.md` sudah dicentang sebelum menekan tombol *Merge*.
