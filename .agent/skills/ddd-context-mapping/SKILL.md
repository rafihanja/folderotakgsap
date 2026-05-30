---
name: ddd-context-mapping
description: "Map relationships between bounded contexts and define integration contracts using DDD context mapping patterns."
risk: medium (architectural standard)
source: "Elite Agent Operations - Batch 10"
date_updated: "2026-05-30"
---

# 🗺️ Elite DDD Context Mapping

*Domain-Driven Design* (DDD) adalah kitab suci para arsitek untuk membagi wilayah kekuasaan kode. *Context Mapping* mencegah *Database* dari departemen A dicemari oleh *Database* departemen B.

## 🎯 Tujuan Skill
Menentukan garis batas (*Bounded Context*) antar fitur raksasa. Memastikan istilah "Pelanggan" di divisi Pengiriman berbeda definisinya dengan "Pelanggan" di divisi Penagihan.

## ⚠️ Kapan Digunakan
- Saat kode aplikasi (*Monolith*) Anda sudah mencapai ratusan ribu baris dan sulit dikelola.
- Saat komunikasi antar departemen di kantor mulai kacau karena perbedaan istilah.

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** membuat "Satu Model Raksasa Untuk Semua". Model `User` di layanan Autentikasi harus terpisah dari model `User` di layanan Pesanan. Jangan digabung!

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Anti-Corruption Layer (ACL)**: Jika Anda harus terhubung dengan API kuno (Legacy System) yang berantakan, bangun tembok ACL. Tembok ini bertugas menerjemahkan respons kotor dari sistem lama menjadi objek suci (*Clean Object*) yang dipahami oleh sistem baru Anda.
2. **Ubiquitous Language**: Anda dan manajer bisnis harus menggunakan kamus kata yang persis sama. Jika manajer menyebut "Keranjang Belanja", nama *class* di kode Anda WAJIB bernama `ShoppingCart`, bukan `OrderList`.
