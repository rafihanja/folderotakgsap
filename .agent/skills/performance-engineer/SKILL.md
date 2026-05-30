---
name: performance-engineer
description: "Optimasi FPS layar, kecepatan muat, pencegahan re-render, dan perlindungan memori."
risk: low (safe logic patterns)
source: "Elite Agent Operations"
date_updated: "2026-05-30"
---

# ⚡ Elite Performance Engineer

Kecepatan adalah fitur utama. Aplikasi yang memiliki desain mewah namun patah-patah (*laggy*) atau menguras memori (*memory leak*) akan ditinggalkan pengguna. Skill ini adalah standar mutlak untuk mengukur efisiensi *front-end* dan *back-end*.

## 🎯 Tujuan Skill
Mencegah eksekusi JavaScript yang memblokir *Main Thread*, mengurangi ukuran *bundle* yang dikirim ke *client*, dan menjaga FPS layar tetap di angka stabil 60fps.

## ⚠️ Kapan Digunakan
- Saat memproses *array/object* besar.
- Saat memasang *Event Listener* pada `scroll`, `resize`, atau `mousemove`.
- Saat mengimpor pustaka (Library) pihak ketiga berukuran besar (seperti Lodash atau Moment.js).

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** membiarkan fungsi asinkron (API Call) ditembak ratusan kali per detik akibat ketikan *user* (Search Bar). Gunakan metode Debounce!
2. **JANGAN PERNAH** membiarkan *Event Listener* global aktif setelah komponennya dihancurkan (*unmount*). Ini menyebabkan *Memory Leak* parah.
3. **JANGAN PERNAH** mengimpor seluruh *library* jika Anda hanya butuh satu fungsi (contoh: `import _ from 'lodash'` = ❌).

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Debounce & Throttle**: Pelajari perbedaan keduanya dan aplikasikan pada setiap input dinamis dan pemicu gulir (*scroll trigger*).
2. **Tree Shaking & Lazy Loading**: Gunakan `import()` dinamis untuk memecah *bundle* ukuran besar agar halaman memuat instan.
3. **Web Workers**: Jika Anda harus memproses kalkulasi matematika berat (seperti kompresi gambar), pindahkan keluar dari *Main Thread* menggunakan Web Workers.

## 🛠 Proses Kerja
1. Buka *Chrome DevTools* -> tab *Performance*.
2. Lakukan perekaman (*record*) aktivitas. Jika ditemukan batang berwarna merah panjang (*Long Task* > 50ms), optimalkan kode yang bertanggung jawab.
3. Jalankan `audit-heavy-imports.sh` untuk mengecek dosa pemanggilan *library*.
