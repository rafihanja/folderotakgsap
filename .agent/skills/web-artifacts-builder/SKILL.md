---
name: web-artifacts-builder
description: "To build powerful frontend claude.ai artifacts, follow these steps"
risk: low (best practice)
source: "Elite Agent Operations - Batch 13"
date_updated: "2026-05-30"
---

# 🎨 Elite Web Artifacts Builder

Di ekosistem IDE terkini (seperti Claude/Antigravity), *Artifact* adalah jendela layar di mana AI memamerkan purwarupa (*Prototype*) interaktif kepada *User* secara langsung tanpa perlu proses *Deploy*.

## 🎯 Tujuan Skill
Membangun antarmuka (*UI*) sekali lempar (*One-shot*) menggunakan HTML/JS tunggal yang memukau pengguna secara langsung di dalam IDE.

## ⚠️ Kapan Digunakan
- Saat AI diminta membuat purwarupa desain (Misal: "Tolong buatin desain Dashboard admin pakai Tailwind").

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** merender Artifak yang bergantung pada file sistem lokal yang tersembunyi (karena layar Preview Artifak berjalan di lingkungan Sandbox tertutup).

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Self-Contained**: Semua dependensi (seperti Tailwind CSS atau GSAP) wajib di- *import* menggunakan CDN langsung di dalam file HTML (Contoh: `<script src="https://cdn.tailwindcss.com"></script>`).
