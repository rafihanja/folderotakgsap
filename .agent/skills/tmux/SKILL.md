---
name: tmux
description: "Expert tmux session, window, dan pane management for terminal multiplexing"
risk: low (productivity tool)
source: "Elite Agent Operations - The Grand Finale"
date_updated: "2026-05-30"
---

# 🟩 Elite Tmux Multiplexer

Tmux (*Terminal Multiplexer*) adalah alat yang memisahkan *Programmer* biasa dengan *Hacker* tulen. Alat ini memungkinkan Anda membuka puluhan layar terminal dalam satu jendela, dan mencegah *server* lokal Anda mati ketika jendela terminal tertutup tidak sengaja.

## 🎯 Tujuan Skill
Memandu cara instalasi dan konfigurasi Tmux agar terminal terlihat layaknya dasbor kapal luar angkasa, serta memisahkan *workspace* tanpa menggunakan *mouse*.

## ⚠️ Kapan Digunakan
- Saat memantau *Log Server*, *Database*, dan menulis *Git* di waktu yang bersamaan.
- Saat melakukan *Remote SSH* ke server awan (Jika koneksi internet putus, sesi Tmux tetap hidup di *server*!).

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** membiarkan puluhan sesi (*Session*) Tmux menumpuk tak terpakai di latar belakang (Ini memakan RAM).
2. **JANGAN PERNAH** menutup tab terminal bawaan tanpa melepaskan (*Detach*) sesi Tmux terlebih dahulu (Ketik `Ctrl+B` lalu `D`).

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Ganti Prefix**: Tombol bawaan `Ctrl+B` terlalu jauh untuk jari. Banyak pengguna elit mengubahnya menjadi `Ctrl+A` atau `Ctrl+Space`. (Cek `.tmux.conf.elite`).
2. **Beri Nama Jendela**: Jangan biarkan nama *tab* bertuliskan `bash`. Ubah menjadi nama proyeknya (contoh: `Backend-API` atau `Frontend-React`).

## 🛠 Proses Kerja
1. *Copy-paste* isi file `.tmux.conf.elite` ke `~/.tmux.conf` di sistem operasi Linux/WSL/Mac Anda.
2. *Reload* dengan perintah `tmux source-file ~/.tmux.conf`.
