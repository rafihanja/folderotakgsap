---
name: golang-pro
description: "Master Go 1.21+ with modern patterns, advanced concurrency, performance optimization, and production-ready microservices."
risk: low (backend performance)
source: "Elite Agent Operations - Batch 9"
date_updated: "2026-05-30"
---

# 🐹 Elite Golang Pro

Golang (Go) adalah bahasa yang membangun Docker, Kubernetes, dan infrastruktur miliaran dolar Google. Bahasanya sangat sederhana, tetapi kesederhanaannya menyimpan mesin *concurrency* (pemrosesan paralel) paling buas di dunia: **Goroutines**.

## 🎯 Tujuan Skill
Membangun *Microservices* dan API yang mampu menangani ratusan ribu permintaan (*Request*) per detik tanpa memakan RAM lebih dari puluhan Megabyte.

## ⚠️ Kapan Digunakan
- Saat membangun *backend* atau *middleware* berkecepatan ekstrim.
- Saat membuat perkakas (*CLI Tools*) yang berjalan langsung di sistem operasi tanpa perlu diinstal (Biner tunggal/Single Binary).

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** membiarkan *Goroutine* berjalan tanpa batas. Selalu gunakan `context.Context` untuk memastikan *Goroutine* bisa dimatikan (*Canceled*) jika pengguna menutup tab browser mereka.
2. **JANGAN PERNAH** meremehkan `if err != nil`. Di Go, *Error* adalah nilai biasa (bukan Exception yang meledak). Anda **wajib** memeriksanya di setiap langkah. Jangan telan (abaikan) error menggunakan variabel kosong `_`.
3. **JANGAN PERNAH** menggunakan `panic()` kecuali aplikasi benar-benar tidak bisa berjalan tanpanya (misal database gagal konek saat *startup*).

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Worker Pools**: Daripada memutar sejuta *Goroutine* sekaligus yang bisa mencekik sistem, buat antrian pekerja (*Worker Pool*). Lihat `go-elite-routine.go`.
2. **Channel Communication**: "Jangan berkomunikasi dengan berbagi memori; berbagilah memori dengan berkomunikasi." Selalu gunakan `chan` (Channel) untuk memindahkan data antar *Goroutine*.
3. **Defer**: Selalu letakkan `defer file.Close()` atau `defer db.Close()` tepat satu baris setelah Anda membukanya agar tidak bocor.

## 🛠 Proses Kerja
1. Pelajari pola konkurensi di `go-elite-routine.go`.
