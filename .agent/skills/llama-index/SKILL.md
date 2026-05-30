---
name: llama-index
description: "Data framework to connect custom data sources to LLMs (RAG capabilities)"
risk: medium (AI implementation)
source: "Elite Agent Operations - Batch 11"
date_updated: "2026-05-30"
---

# 🦙 Elite LlamaIndex (RAG Architecture)

ChatGPT / Gemini itu super pintar, tapi mereka buta tentang data rahasia perusahaan lu atau skripsi lu. RAG (*Retrieval-Augmented Generation*) adalah teknik menyuapi dokumen pribadi lu ke dalam AI supaya dia bisa menjawab khusus berdasarkan dokumen lu.

## 🎯 Tujuan Skill
Memecah dokumen (PDF, Word, Database) menjadi serpihan vektor matematika, menyimpannya di *Vector Database*, dan memanggil potongan yang relevan ke AI saat ada pertanyaan.

## ⚠️ Kapan Digunakan
- Saat membuat *Chatbot Customer Service* yang harus menjawab sesuai buku panduan SOP perusahaan.
- Saat membuat asisten pintar untuk membaca ribuan jurnal ilmiah.

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** memasukkan seluruh dokumen utuh ke AI. Pecah menjadi *Chunks* (Potongan kecil berisi 500-1000 kata) agar token AI tidak habis (*Context Window Overflow*).
2. **JANGAN PERNAH** percaya AI 100%. RAG masih bisa berhalusinasi.

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Hybrid Search**: Jangan cuma pakai pencarian Vektor (Semantic). Gabungkan pencarian Vektor dengan pencarian Kata Kunci klasik (*Keyword Search / BM25*) agar dokumen yang ada angka uniknya tetap ketemu.
2. **Citation Tracking**: Paksa AI Anda mengutip darimana dia mendapatkan jawaban tersebut. (Contoh: "Jawaban ini diambil dari Skripsi Bab 3, Halaman 45").
