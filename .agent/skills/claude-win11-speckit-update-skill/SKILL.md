---
name: claude-win11-speckit-update-skill
description: "Elite Windows 11 system management & PowerShell automation"
risk: high (requires strict auditing)
source: "Elite Agent Operations"
date_updated: "2026-05-30"
---

# 🛡️ Elite Windows 11 System Management Skill

Skill ini wajib dipanggil setiap kali AI agent diminta untuk melakukan operasi sistem pada OS Windows 11, khususnya menggunakan eksekusi CLI atau PowerShell.

## 🎯 Tujuan Skill
Memastikan semua operasi sistem (update, cleanup, diagnosa) berjalan dengan aman, transparan, dan tidak merusak integritas *registry* atau berkas inti Windows 11.

## ⚠️ Kapan Digunakan
- Saat mendiagnosa kesehatan Windows (`sfc`, `DISM`).
- Saat membersihkan disk dari file sampah (*Temp*, *Prefetch*).
- Saat melakukan pengecekan status *Windows Update*.
- Saat diminta mengeksekusi skrip PowerShell secara otomatis.

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** menjalankan skrip dari URL eksternal menggunakan `Invoke-Expression` atau `iex (irm ...)` secara mentah tanpa mengunduh dan membaca isinya terlebih dahulu.
2. **JANGAN PERNAH** menggunakan `Remove-Item` secara rekursif (`-Recurse -Force`) di direktori `C:\Windows\` atau `C:\Program Files\` tanpa mode `-WhatIf`.
3. **JANGAN PERNAH** mengubah *Execution Policy* ke `Bypass` secara global. Gunakan `-Scope Process` jika sangat diperlukan.

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Gunakan `-WhatIf`**: Untuk perintah destruktif (hapus, ubah), jalankan dulu dengan flag `-WhatIf` untuk simulasi.
2. **Error Handling**: Setiap `.ps1` wajib menggunakan `$ErrorActionPreference = 'Stop'`.
3. **Validasi Admin**: Jika operasi butuh *Administrator*, skrip wajib memvalidasi *role* pengguna terlebih dahulu sebelum *crash* di tengah jalan.

## 🛠 Proses Kerja
1. Pahami perintah pengguna.
2. Cocokkan dengan `win11-safe-commands-cheatsheet.md`.
3. Jika harus menggunakan script kompleks, pakai skrip yang sudah diaudit di dalam folder `scripts/`.
4. Berikan output yang bisa dibaca manusia.
