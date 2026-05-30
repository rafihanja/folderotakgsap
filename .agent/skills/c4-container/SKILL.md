---
name: c4-container
description: "Expert C4 Container-level documentation specialist."
risk: low (documentation)
source: "Elite Agent Operations - Batch 10"
date_updated: "2026-05-30"
---

# 🏗️ Elite C4 Architecture (Container)

Diagram C4 (Context, Containers, Components, Code) adalah cara *Engineer* level Dewa menjelaskan sistem ke CEO maupun ke Developer Baru tanpa membuat mereka pusing.

## 🎯 Tujuan Skill
Menggambar diagram arsitektur level "Container" (Aplikasi Mobile, API Backend, Database, Cloud Storage) dan hubungannya menggunakan bahasa panah yang jelas.

## ⚠️ Kapan Digunakan
- Saat mempresentasikan desain sistem ke *Stakeholder*.
- Saat ada anggota tim baru yang butuh peta (*Map*) letak servis-servis perusahaan.

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** menggambar diagram kotak-kotak awan tanpa label yang jelas. Panah tanpa penjelasan adalah dosa besar.
2. **JANGAN PERNAH** mencampur adukkan diagram bisnis dengan diagram kode (*Class Diagram*) di satu gambar yang sama.

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Pola Panah C4**: Setiap panah harus memiliki deskripsi tindakan dan protokol. Contoh: `[Mobile App] --(Membaca data riwayat belanja JSON/HTTPS)--> [API Gateway]`.
2. **PlantUML / Mermaid**: Jangan menggambar menggunakan alat manual seperti Visio. Gunakan kode deklaratif (seperti Mermaid.js) agar diagram bisa disimpan di Git dan di- *review* lewat PR.
