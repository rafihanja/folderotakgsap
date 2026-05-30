---
name: gitops-workflow
description: "Complete guide to implementing GitOps workflows with ArgoCD and Flux for automated Kubernetes deployments."
risk: extreme (infrastructure control)
source: "Elite Agent Operations - Batch 12"
date_updated: "2026-05-30"
---

# ☸️ Elite GitOps Workflow (ArgoCD/Flux)

"Git is the Single Source of Truth". Anda dilarang login ke Server / Kubernetes untuk mengubah pengaturan secara manual (`kubectl apply`). Semua perubahan server harus terjadi lewat *Pull Request* di Git.

## 🎯 Tujuan Skill
Memastikan server *Production* bisa dihancurkan dan dibangun kembali dalam 5 menit persis seperti kondisi terakhir, cukup dengan membaca riwayat Git.

## ⚠️ Kapan Digunakan
- Saat mengelola kluster Kubernetes yang masif.

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** mengetik perintah `kubectl edit deployment` langsung di server. Server Anda akan berbeda isinya dengan konfigurasi yang ada di Git. Fenomena ini disebut **Configuration Drift**.

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Reconciliation Loop**: Biarkan agen GitOps (seperti ArgoCD) di dalam kluster memantau repository Git Anda setiap 3 menit. Jika ada perbedaan, ArgoCD akan "menarik" konfigurasi terbaru dari Git secara otomatis (Pull-based CI/CD).
