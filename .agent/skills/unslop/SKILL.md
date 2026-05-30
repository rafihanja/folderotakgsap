---
name: unslop
description: "Post-process AI-generated text to strip AI writing patterns (slop) before publishing."
risk: low (formatting optimization)
source: "Elite Agent Operations - Thesis Kit"
date_updated: "2026-05-30"
---

# 🧼 Elite Unslop Engine

"Slop" adalah istilah internet untuk teks panjang yang dihasilkan AI tapi sama sekali tidak memiliki substansi atau 'jiwa'. Teks ini diulang-ulang, berputar-putar, dan membosankan.

## 🎯 Tujuan Skill
Memadatkan (*condense*) kalimat yang dihasilkan oleh mesin, memotong basa-basi, dan memastikan tulisan memiliki variasi panjang kalimat layaknya manusia yang sedang bernapas (Burstiness).

## ⚠️ Kapan Digunakan
- Saat mengedit draf paragraf panjang yang terasa membosankan dibaca.
- Saat menurunkan tingkat Plagiarisme / Deteksi AI di Turnitin.

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** merangkai 5 kalimat berturut-turut dengan panjang yang persis sama. AI menulis dengan irama konstan (Metronom), manusia menulis dengan irama acak (Jazz).
2. **JANGAN PERNAH** menggunakan *Passive Voice* (Kalimat Pasif) secara berlebihan. "Algoritma memproses data" (Aktif) jauh lebih kuat daripada "Data diproses oleh algoritma" (Pasif).
3. **JANGAN PERNAH** membiarkan *Filler Words* (kata pengisi yang tidak ada maknanya).

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Aturan Bernapas (Burstiness)**: Selipkan satu kalimat yang SANGAT PENDEK di antara kalimat-kalimat panjang dan kompleks. Kalimat pendek ini berfungsi sebagai "tinju" atau penekanan.
2. **Potong 20%**: Edit dan buang 20% kata dari draf kasar tanpa mengubah maknanya. Skripsi yang tebal karena omong kosong akan dibantai saat sidang.

## 🛠 Proses Kerja
1. Pelajari contoh perbandingan di `slop-vs-human.md`.
2. Gunakan `audit-passive-voice.sh` untuk mengecek apakah lo terlalu banyak nulis kalimat pasif.
