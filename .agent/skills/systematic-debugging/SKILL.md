---
name: systematic-debugging
description: "Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes."
risk: low (safe analysis)
source: "Elite Agent Operations - The Grand Finale"
date_updated: "2026-05-30"
---

# 🐛 Elite Systematic Debugging

*Debugging* (pencarian kutu) bukan tentang menebak-nebak letak kesalahan lalu mengubah kode secara acak (*Shotgun Debugging*). Itu adalah cara amatir yang akan merusak sistem. *Engineer* Elite melacak masalah dengan bukti.

## 🎯 Tujuan Skill
Memandu AI dan Developer untuk menemukan akar penyebab masalah (*Root Cause*) secara ilmiah, tanpa merusak kode yang sudah jalan.

## ⚠️ Kapan Digunakan
- Saat aplikasi *Crash* (Mati tiba-tiba).
- Saat hasil keluaran (*output*) tidak sesuai dengan ekspektasi.
- Saat tes otomatis gagal (*Red Test*).

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** mengubah kode untuk mencoba memperbaiki bug jika Anda BELUM menemukan baris pasti penyebab bug tersebut.
2. **JANGAN PERNAH** membiarkan `console.log` sisa *debugging* masuk ke *Production*. Itu membocorkan memori dan informasi sensitif.
3. **JANGAN PERNAH** mengabaikan pesan *Error Stack Trace*. Baca dari baris PALING ATAS.

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Reproduce**: Pastikan Anda bisa memunculkan ulang *error* tersebut secara konsisten sebelum mulai memperbaikinya.
2. **Isolasi**: Matikan fitur lain perlahan-lahan untuk menemukan di komponen mana *error* tersebut bersarang (Divide and Conquer).
3. **Baca Log**: Biasakan membaca *server log* atau *browser console*.

## 🛠 Proses Kerja
1. Ikuti alur pada `debug-flowchart.md` jika mentok.
2. Gunakan `audit-console-log.sh` untuk membersihkan kode dari jejak *debugging* sebelum diserahkan ke *reviewer*.
