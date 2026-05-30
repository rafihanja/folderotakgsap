---
name: crewai
description: "Multi-agent framework to orchestrate role-playing AI agents"
risk: medium (AI orchestration)
source: "Elite Agent Operations - The Grand Finale"
date_updated: "2026-05-30"
---

# 🎭 Elite CrewAI Orchestrator

CrewAI adalah pustaka (*framework*) yang mensimulasikan ruang rapat virtual berisi berbagai AI yang memainkan peran (*Role-playing*). Ada AI yang jadi Bos, ada yang jadi Penulis, ada yang jadi Editor.

## 🎯 Tujuan Skill
Menyatukan agen-agen spesialis agar dapat berdiskusi dan menyelesaikan tugas kompleks yang tidak bisa diselesaikan oleh satu pikiran AI saja.

## ⚠️ Kapan Digunakan
- Saat membangun skrip otomatisasi tingkat tinggi menggunakan Python.
- Saat tugas membutuhkan tahapan bertingkat: Riset -> Penulisan -> Pengecekan Kualitas.

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** menggabungkan peran. (Contoh buruk: Satu agen disuruh meriset sekaligus nulis kode sekaligus *testing*).
2. **JANGAN PERNAH** menggunakan LLM yang lambat untuk agen manajer. Sang Bos harus menggunakan model terpintar (GPT-4 / Gemini Pro).

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Backstory**: Beri setiap agen latar belakang karakter yang kuat. (Contoh: "Kamu adalah Senior Developer yang sarkastis dan benci kode berantakan"). Ini terbukti meningkatkan kualitas hasil AI.
2. **Sequencial vs Hierarchical**: Jika tugasnya lurus, gunakan aliran *Sequential* (A -> B -> C). Jika butuh mikir bareng, gunakan *Hierarchical* (Ada manajer yang bagi tugas).

## 🛠 Proses Kerja
1. Pelajari contoh implementasinya di `multi-agent-setup.py`.
