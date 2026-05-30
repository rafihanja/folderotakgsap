---
name: github
description: "Use the `gh` CLI for issues, pull requests, Actions runs, and GitHub API queries."
risk: medium (collaboration standard)
source: "Elite Agent Operations - The Grand Finale"
date_updated: "2026-05-30"
---

# 🐙 Elite GitHub Mastery

GitHub bukan sekadar Google Drive tempat Anda menyimpan file kode. Ini adalah landasan peluncuran produk dan catatan sejarah sejarah aplikasi Anda. Jika Anda menulis riwayat yang berantakan, Anda tidak akan bisa memperbaiki *bug* di masa depan.

## 🎯 Tujuan Skill
Memastikan kebersihan kolaborasi, penulisan pesan komit (*Commit Message*) yang berstandar internasional, dan penguasaan `gh` (GitHub CLI).

## ⚠️ Kapan Digunakan
- Saat menyimpan perubahan kode (`git commit`).
- Saat bekerja sama dengan anggota tim (membuat *Pull Request* atau *Issues*).

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** menulis komit seperti: `"fix bug"`, `"update"`, `"wkwk"`, `"asdf"`. Ini adalah kejahatan terhadap tim Anda.
2. **JANGAN PERNAH** menekan kode (*push*) langsung ke cabang `master` atau `main` jika Anda bekerja di tim. Selalu buat cabang baru (`git checkout -b fitur-baru`).

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Conventional Commits**: Selalu gunakan awalan: `feat:`, `fix:`, `docs:`, `refactor:`, atau `chore:`. (Contoh: `feat(auth): tambah login dengan google`).
2. **Atomic Commits**: Jangan gabungkan perbaikan *bug database* dan perombakan warna UI ke dalam satu komit yang sama. Pisahkan mereka.

## 🛠 Proses Kerja
1. Jika bekerja dalam tim, jalankan `audit-commit-messages.sh` sebelum *push* untuk memastikan Anda tidak menggunakan kata-kata terlarang.
