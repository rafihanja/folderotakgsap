---
name: test-driven-development
description: "Test-Driven Development workflow principles. RED-GREEN-REFACTOR cycle."
risk: low (best practice enforcement)
source: "Elite Agent Operations - The Grand Finale"
date_updated: "2026-05-30"
---

# 🧪 Elite Test-Driven Development (TDD)

TDD adalah cara hidup *Programmer* Elite. Alih-alih menulis kode baru lalu kebingungan cara mengujinya, kita membalik prosesnya: Tulis tes yang gagal (*RED*), tulis kode sesedikit mungkin agar tes itu lulus (*GREEN*), lalu perbaiki struktur kodenya tanpa mengubah fungsi (*REFACTOR*).

## 🎯 Tujuan Skill
Memastikan sistem dilindungi oleh sabuk pengaman otomatis (Unit Tests). Sehingga fitur baru tidak merusak fitur lama tanpa disadari.

## ⚠️ Kapan Digunakan
- Saat membangun logika kalkulasi (*Business Logic*) yang kompleks.
- Saat menambal *Bug* (Tulis tes gagal yang memicu *bug*, lalu perbaiki).

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** menulis fitur rawan (seperti sistem pembayaran/keranjang belanja) tanpa Unit Test.
2. **JANGAN PERNAH** membiarkan *Test Suite* menguji *Database Asli* (Gunakan Mock/Fake Database agar tes berjalan dalam hitungan milidetik).

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **RED**: Tulis ekspektasi tes terlebih dahulu. Jalankan, dan pastikan ia gagal (karena fiturnya belum ada).
2. **GREEN**: Tulis kode seburuk apapun yang penting tes tersebut hijau (Lulus).
3. **REFACTOR**: Rapihkan kode buruk tersebut. Karena sudah dijaga oleh tes hijau, Anda bebas merombak struktur tanpa takut aplikasinya hancur.

## 🛠 Proses Kerja
1. Pelajari pola *Mocking* dari `jest-elite.ts`.
2. Gunakan `audit-missing-tests.sh` untuk mengejar persentase cakupan kode (*Code Coverage*).
