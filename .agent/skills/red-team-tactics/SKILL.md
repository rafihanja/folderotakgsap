---
name: red-team-tactics
description: "Red team tactics principles based on MITRE ATT&CK. Attack phases, detection evasion, reporting."
risk: extreme (penetration testing)
source: "Elite Agent Operations - Batch 14"
date_updated: "2026-05-30"
---

# 🥷 Elite Red Team Tactics (Hacking)

Mengetahui cara membangun benteng pertahanan itu bagus, tapi mengetahui cara meruntuhkannya adalah ilmu level tertinggi. *Red Team* adalah tim "Hacker Putih" yang bertugas membobol perusahaan mereka sendiri sebelum dibobol *Hacker Hitam*.

## 🎯 Tujuan Skill
Memahami siklus *Cyber-Attack* melalui kerangka kerja MITRE ATT&CK (Reconnaissance -> Weaponization -> Delivery -> Exploitation -> Installation -> Command & Control -> Actions on Objective).

## ⚠️ Kapan Digunakan
- Saat menjalankan audit keamanan internal (*Penetration Testing*).

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** melakukan pengujian eksploitasi pada aplikasi/server yang bukan milik Anda tanpa dokumen izin tertulis (*Rules of Engagement*). Itu tindakan kriminal (UU ITE).

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **OSINT (Open Source Intelligence)**: 90% peretasan sukses terjadi bukan karena kelemahan server, tetapi karena kebodohan karyawan (karyawan mengunggah kunci rahasia ke Github publik, atau *password* mudah ditebak). Lakukan intelijen pasif terlebih dahulu.
