---
name: python-pro
description: "Master Python with modern features, performance optimization, and production-ready practices."
risk: low (best practices)
source: "Elite Agent Operations - Batch 9"
date_updated: "2026-05-30"
---

# 🐍 Elite Python Pro

Python adalah raja di dunia *Artificial Intelligence* dan Data. Namun secara bawaan, Python sangat lambat dan rawan *error* karena tidak memiliki pengecekan tipe statis (*Dynamic Typing*). 

## 🎯 Tujuan Skill
Menulis kode Python yang kebal terhadap *error runtime* melalui *Type Hinting*, dan mempercepat eksekusi logika tingkat dewa menggunakan paradigma *Asynchronous* dan fitur fungsional.

## ⚠️ Kapan Digunakan
- Saat membangun *backend* (FastAPI/Django), *Machine Learning*, atau penarik data otomatis (*Scraping/Crawling*).

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** menggunakan *looping* `for` biasa untuk membuat list baru. Menggunakan `.append()` berulang-ulang di dalam *loop* sangat lambat. 
2. **JANGAN PERNAH** menulis fungsi tanpa mencantumkan tipe data input dan *output*-nya (*Type Hinting*). Kode Python buta tipe adalah mimpi buruk saat *debugging*.
3. **JANGAN PERNAH** menaruh kunci rahasia atau *password* langsung di dalam *source code* Python.

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **List Comprehensions**: Gunakan satu baris kurung siku `[x for x in data]` alih-alih `for loop` tradisional. Ini diproses langsung di *layer* mesin C (CPython), membuatnya jauh lebih cepat.
2. **Type Hints**: Selalu gunakan `def proses(data: str) -> int:`. Ini memungkinkan IDE mendeteksi kesalahan tipe *sebelum* Anda menjalankan kodenya.
3. **Asyncio**: Python dibatasi oleh GIL (Hanya bisa menggunakan 1 inti CPU sejati dalam satu waktu). Untuk mengakalinya, saat menghubungi *Database* atau *API HTTP*, Anda harus menggunakan `async / await` agar sistem tidak terhenti (Blokir).

## 🛠 Proses Kerja
1. Pahami pola Async yang efisien di `py-elite-async.py`.
