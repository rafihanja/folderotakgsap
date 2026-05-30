---
name: senior-architect
description: "Complete toolkit for senior architect with modern tools and best practices."
risk: low (best practice)
source: "Elite Agent Operations - Batch 10"
date_updated: "2026-05-30"
---

# 🏛️ Elite Senior Architect

Seorang *Senior Architect* tidak lagi berdebat tentang nama variabel. Mereka merancang cetak biru kota (Sistem) agar tidak hancur saat diguncang gempa (Trafik jutaan *user*).

## 🎯 Tujuan Skill
Memandu perancangan *Microservices*, pemilihan *Database* (SQL vs NoSQL), dan pola komunikasi antar layanan (Sinkron vs Asinkron).

## ⚠️ Kapan Digunakan
- Saat mendirikan proyek baru dari nol (Tahap *Bootstrapping*).
- Saat aplikasi *Monolith* mulai melambat dan harus dipecah menjadi layanan terpisah.

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** merancang arsitektur terdistribusi (*Microservices*) jika perusahaan Anda belum memiliki sistem DevOps dan Log (*Observability*) yang matang.
2. **JANGAN PERNAH** menghubungkan dua buah *Microservice* secara langsung pada satu *Database* yang sama (*Shared Database Anti-Pattern*).

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **API Gateway**: Gunakan Gerbang API untuk memusatkan Autentikasi dan *Rate Limiting* sebelum *request* menyentuh layanan internal.
2. **Event-Driven**: Jika layanan A ingin memberi tahu layanan B bahwa ada pesanan masuk, jangan gunakan API (REST). Gunakan *Message Broker* (Kafka/RabbitMQ) agar tahan banting jika layanan B sedang mati.
