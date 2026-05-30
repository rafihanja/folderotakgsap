---
name: rust-pro
description: "Master Rust 1.75+ with modern async patterns, advanced type system features, and production-ready systems programming."
risk: low (memory safety)
source: "Elite Agent Operations - Batch 9"
date_updated: "2026-05-30"
---

# 🦀 Elite Rust Pro

Rust adalah satu-satunya bahasa di dunia yang menawarkan performa dan kontrol sistem sekelas C++ (bisa beroperasi tanpa OS / *Bare Metal*), namun dengan **Garansi 100% Anti Memori Bocor** dan **Anti Data Race**.

## 🎯 Tujuan Skill
Menguasai sistem pemilikan (*Ownership*), sistem pinjam-meminjam memori (*Borrowing & Lifetimes*), dan memanfaatkan *compiler* Rust sebagai asisten pribadi yang galak tapi melindungimu dari bencana.

## ⚠️ Kapan Digunakan
- Saat membangun mesin game (*Game Engine*), Sistem Operasi, WebAssembly (WASM), atau Blockchain (*Smart Contracts*).
- Saat *backend* Anda membutuhkan latensi hitungan nanodetik dan tidak boleh *crash*.

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** menggunakan blok `unsafe {}` hanya karena Anda malas berurusan dengan *Borrow Checker*. Gunakan `unsafe` HANYA jika Anda berinteraksi dengan API sistem atau bahasa C (*FFI*).
2. **JANGAN PERNAH** sering melakukan kloning data (`.clone()`) ke kanan dan kiri untuk menghindari masalah kepemilikan. Itu sama saja Anda melepaskan performa murni Rust. Biasakan diri dengan referensi (`&`).
3. **JANGAN PERNAH** panik dengan fitur `unwrap()`. Selalu gunakan pencocokan pola `match` atau `?` (*Error propagation*) agar program selalu siap menghadapi yang terburuk.

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Type Driven Design**: Gunakan `Enum` untuk memodelkan status mustahil. Jika suatu entitas memiliki tipe `Option<T>` atau `Result<T, E>`, paksa pengguna kode Anda untuk menanganinya.
2. **Iterators over Loops**: Dibandingkan menggunakan `for i in 0..len`, gunakan iterator fungsional seperti `.iter().map().filter()` karena Rust akan merubahnya menjadi bahasa mesin yang lebih cepat dari *looping* biasa tanpa biaya *runtime* (*Zero-Cost Abstraction*).

## 🛠 Proses Kerja
1. Pahami pola kepemilikan yang ada di `rust-elite-memory.rs`.
