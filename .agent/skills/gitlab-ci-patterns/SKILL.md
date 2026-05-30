---
name: gitlab-ci-patterns
description: "Comprehensive GitLab CI/CD pipeline patterns for automated testing, building, and deployment."
risk: high (deployment pipeline)
source: "Elite Agent Operations - Batch 12"
date_updated: "2026-05-30"
---

# 🦊 Elite GitLab CI/CD

Pesaing terberat GitHub Actions di dunia *Enterprise*. GitLab CI menggunakan file `.gitlab-ci.yml` yang sangat bertenaga untuk mengeksekusi tahapan (*Stages*) rilis piranti lunak Anda.

## 🎯 Tujuan Skill
Menguasai pengaturan tahapan (`Stages: build, test, deploy`) menggunakan GitLab *Runners* milik sendiri.

## ⚠️ Kapan Digunakan
- Saat Anda bekerja di lingkungan korporat/pemerintahan yang mewajibkan kode tidak boleh keluar dari *Server* lokal (Self-hosted GitLab).

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** memberikan akses GitLab Runner ke direktori `Root` mesin host tanpa proteksi Docker-in-Docker (*dind*).

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Only/Except Rules**: Atur *Pipeline Deployment* agar hanya berjalan khusus pada cabang `master` atau saat ada penandaan *Tag* baru (contoh: `v1.0.0`).
2. **Artifacts Passing**: Jika tahapan `build` selesai, gunakan `artifacts` agar file hasil kompilasinya tidak hilang dan bisa dipakai di tahapan `deploy`.
