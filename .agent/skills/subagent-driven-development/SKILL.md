---
name: subagent-driven-development
description: "Use when executing implementation plans with independent tasks in the current session"
risk: high (requires strict token management)
source: "Elite Agent Operations - The Grand Finale"
date_updated: "2026-05-30"
---

# 🤖 Elite Subagent Development

Di masa depan, *Software Engineer* tidak mengetik kode secara manual. Mereka adalah "Mandor" yang membagikan tugas (Task) kepada pasukan robot spesialis (Subagents), dan mengawasi hasil akhirnya.

## 🎯 Tujuan Skill
Memandu cara kerja di mana satu agen utama (*Master Agent*) memecah belah tugas besar menjadi sub-tugas kecil, lalu mendelegasikannya ke agen-agen bawahan agar dikerjakan secara paralel (bersamaan).

## ⚠️ Kapan Digunakan
- Saat menghadapi tugas masif yang membutuhkan pembacaan/penulisan lebih dari 10 file sekaligus.
- Saat melakukan *Refactoring* besar-besaran (Satu agen fokus di *Backend*, satu fokus di *Frontend*).

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** memberikan instruksi abstrak ke Sub-Agent (Contoh buruk: "Tolong perbaiki web ini").
2. **JANGAN PERNAH** membiarkan Sub-Agent berjalan tanpa pengawasan (*Infinite Loop*). Selalu beri batasan langkah maksimal.

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Instruksi Atomik**: Berikan instruksi super spesifik (Contoh: "Buka file X, ganti warna tombol Y jadi merah, lalu verifikasi perubahannya").
2. **Delegasi**: Jika agen utama sudah mulai kelelahan membaca riwayat percakapan yang terlalu panjang (*Context Window Full*), oper tugas sisanya ke Sub-Agent segar.

## 🛠 Proses Kerja
1. Gunakan cetakan dari `agent-prompt-templates.md` saat memanggil agen baru.
