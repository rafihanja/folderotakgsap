---
name: powershell-windows
description: "PowerShell Windows patterns. Critical pitfalls, operator syntax, error handling."
risk: high (system-level commands)
source: "Elite Agent Operations - The Grand Finale"
date_updated: "2026-05-30"
---

# 💻 Elite PowerShell (Windows)

PowerShell bukan lagi sekadar Command Prompt (cmd.exe) warna biru. Ini adalah bahasa *scripting* tangguh berbasis objek (.NET) yang mampu mengontrol seluruh sistem operasi Windows Anda.

## 🎯 Tujuan Skill
Memandu *Developer* Windows untuk menggunakan Terminal layaknya *Hacker* di Linux, mempercepat eksekusi perintah harian, dan menghindari kesalahan fatal (*Pitfalls*) PowerShell.

## ⚠️ Kapan Digunakan
- Saat mengotomatisasi pekerjaan membosankan (menghapus 1000 file sekaligus).
- Saat *troubleshooting* jaringan atau *proses* sistem Windows yang macet.

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** menjalankan skrip dari internet (`Invoke-WebRequest`) secara membabi-buta tanpa membacanya. (Ini adalah metode nomor 1 penyebaran Ransomware).
2. **JANGAN PERNAH** meremehkan *Execution Policy*. Pastikan Anda tahu kapan menggunakan `RemoteSigned` vs `Bypass`.

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Gunakan Alias**: Mengapa mengetik `Remove-Item -Recurse -Force` jika Anda bisa mengetik `rm -rf` (jika *alias* sudah diatur)? Cek `pwsh-aliases.md`.
2. **Penanganan Error**: Sama seperti kode *backend*, gunakan balok `try/catch` di dalam skrip `*.ps1` Anda untuk menangani *error* dengan elegan.

## 🛠 Proses Kerja
1. Buka profil PowerShell Anda (`notepad $PROFILE`).
2. Tempelkan alias dari `pwsh-aliases.md` ke dalamnya untuk *Workflow* secepat kilat.
