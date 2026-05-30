---
name: mlops-engineer
description: "Build comprehensive ML pipelines, experiment tracking, and model registries with MLflow, Kubeflow, and modern MLOps tools."
risk: high (infrastructure & pipeline)
source: "Elite Agent Operations - Batch 11"
date_updated: "2026-05-30"
---

# 🤖 Elite MLOps Engineer

Semua orang bisa bikin AI dan Jupyter Notebook. Tapi hanya MLOps Engineer (Machine Learning Operations) yang bisa membawa AI itu jalan terus 24/7 di *Server*, melayani jutaan *Request*, tanpa memori meledak.

## 🎯 Tujuan Skill
Membuat pabrik otomatis (*Pipeline*) mulai dari pelatihan model (*Training*), evaluasi akurasi, sampai perilisannya menjadi API (REST/gRPC) yang stabil.

## ⚠️ Kapan Digunakan
- Saat mengemas (*Containerize*) model Machine Learning menjadi layanan Docker.
- Saat versi model AI harus di- *update* diam-diam tanpa mematikan aplikasi utama (*Shadow Deployment*).

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** melatih model AI dari data mentah tanpa menyimpan jejak data (*Data Lineage*). Jika AI Anda tiba-tiba menjadi bodoh (Model Drift), Anda harus tahu data mana yang meracuninya.
2. **JANGAN PERNAH** menyebarkan API Machine Learning tanpa *Rate Limiting* dan batas maksimal ukuran GPU.

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Model Registry**: Selalu gunakan brankas model (seperti MLflow atau Weights & Biases) untuk menyimpan riwayat versi AI Anda. Jika versi v2.0 *error*, Anda bisa *rollback* ke v1.9 dalam 1 detik.
2. **A/B Testing**: Rilis model AI baru hanya ke 10% *user* (Canary Release). Jika prediksi mereka akurat dan tidak ada komplain, baru rilis ke 100%.
