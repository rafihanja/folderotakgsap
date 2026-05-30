---
name: avoid-ai-writing
description: "Audit and rewrite content to remove categories of AI writing patterns with replacement tables."
risk: low (content filtering)
source: "Elite Agent Operations - Thesis Kit"
date_updated: "2026-05-30"
---

# 🕵️ Elite Anti-AI Writing Detector

Sistem pelacak bahasa mesin. Mesin LLM (seperti ChatGPT atau Claude) memiliki kecenderungan bawaan (*bias*) untuk menggunakan frasa yang berlebihan, berbunga-bunga, atau terlalu diplomatis yang sangat mudah dideteksi oleh Turnitin atau Dosen Penguji.

## 🎯 Tujuan Skill
Membersihkan draf penulisan ilmiah/skripsi dari kata-kata sampah, memaksakan penggunaan bahasa lugas, dan menutupi jejak bahwa teks tersebut disunting oleh mesin.

## ⚠️ Kapan Digunakan
- Saat mengedit Bab Pendahuluan, Landasan Teori, atau Kesimpulan.
- Saat melakukan *Proofreading* (Uji Baca) draf kasar dari mahasiswa.

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** memulai paragraf kesimpulan dengan "Kesimpulannya,..." atau "Dengan demikian,...". (Sangat kaku dan terkesan generik).
2. **JANGAN PERNAH** menggunakan kata "Komprehensif", "Revolusioner", "Mendalam", "Signifikan" tanpa ada data angka statistik yang mendukung klaim tersebut.
3. **JANGAN PERNAH** membiarkan kalimat pembuka yang berbunyi "Penting untuk dicatat bahwa...".

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **To the Point**: Langsung kepada inti masalah. Hapus semua kalimat pengantar yang tidak punya nilai informatif (Contoh: *"Di era digital ini..."*).
2. **Substitusi Kata**: Ganti kata-kata dramatis dengan kata-kata faktual. Cek `forbidden-ai-words.md`.
3. **Variasi Subjek**: Jangan memulai kalimat secara berulang dengan subjek yang sama.

## 🛠 Proses Kerja
1. Pastikan setiap draf mentah tidak mengandung kata di dalam `forbidden-ai-words.md`.
2. Jalankan `audit-ai-patterns.sh` pada folder laporan atau `.md` sebelum menyerahkan draf ke dosen.
