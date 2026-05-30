---
name: open-interpreter
description: "Lets LLMs run code (Python, Javascript, Shell) locally to complete tasks"
risk: extreme (local code execution)
source: "Elite Agent Operations - The Grand Finale"
date_updated: "2026-05-30"
---

# 💻 Elite Open Interpreter

Alat ini adalah "Tangan Tuhan" bagi AI. Dengan alat ini, AI tidak hanya menyarankan skrip, tetapi langsung membuka Terminal Anda dan menjalankan Python, Node.js, atau Bash Script secara mandiri di laptop Anda.

## 🎯 Tujuan Skill
Memerintahkan AI untuk melakukan otomatisasi OS (Operating System) lokal: Menghapus ribuan file sampah, merename ratusan foto sekaligus, atau menyalakan *server*.

## ⚠️ Kapan Digunakan
- Saat tugas memakan waktu jika dilakukan manual (Contoh: "Tolong konversi 100 video mp4 di folder X jadi mp3").
- Saat ingin mengetes skrip Python murni.

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** menjalankan Open Interpreter dengan mode `auto_run=True` (tanpa konfirmasi manusia) saat Anda login menggunakan akses Root/Administrator. AI bisa tidak sengaja menghapus folder OS Windows (`C:/Windows/System32`).
2. **JANGAN PERNAH** menyuruh AI mengeksekusi skrip dari internet (*wget / curl*) tanpa dibaca dulu isinya.

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Pagar Pengaman (Sandbox)**: Selalu awasi perintah apa yang hendak dijalankan AI sebelum menekan 'Yes' (y).
2. **Batasi CWD**: Pastikan terminal AI hanya berjalan di dalam direktori target (contoh: `d:\gsap`), bukan di root direktori laptop (`C:\`).

## 🛠 Proses Kerja
Berikan instruksi menggunakan bahasa alami di terminal.
Contoh: `interpreter --os "Tolong ganti sistem tema laptop saya jadi dark mode"` (Hanya berlaku untuk AI bersistem Open Interpreter).
