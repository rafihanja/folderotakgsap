---
name: github-automation
description: "Automate issue triaging, PR labeling, dependency updates (Dependabot), and stale branch cleanup."
risk: medium (repository control)
source: "Elite Agent Operations - Batch 17"
date_updated: "2026-05-30"
---

# 🧹 Elite GitHub Automation (The Janitor)

Sebagai *Solo Founder*, lu nggak punya waktu buat beresin PR, hapus *branch* yang nggak kepake, atau ngupdate *library* npm satu-satu. Suruh robot yang ngerjain!

## 🎯 Tujuan Skill
Membuat repositori proyek (Terutama proyek Skripsi / *Web Development* lu) mengurus dirinya sendiri.

## ⚠️ Kapan Digunakan
- Saat kode repositori mulai berantakan dan dependensi (NPM) lu mulai kadaluarsa.

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** mengizinkan *Dependabot* untuk nge- *merge* otomatis (*Auto-merge*) pembaruan versi *Major* (misal dari React 17 ke React 18). Itu berisiko besar merusak aplikasi lu saat lu lagi tidur!

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Stale Bot**: Aktifkan robot pembersih. Jika ada *Issue* atau *Pull Request* yang tidak disetuh selama 30 hari, suruh robot menutupnya otomatis dengan tag "Wasted/Stale".
2. **Label Otomatis**: Jika lu *Push* kode dengan awalan `fix: ...`, robot harus otomatis menempelkan stiker merah "Bug Fix" di *Commit* tersebut, sehingga riwayat perubahan (*Changelog*) akhir Skripsi lu nanti rapi dan gampang dibaca Dosen.
