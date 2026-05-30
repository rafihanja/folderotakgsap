---
name: kubernetes
description: "The orchestrator of the cloud for containerized applications"
risk: high (requires strict infrastructure compliance)
source: "Elite Agent Operations"
date_updated: "2026-05-30"
---

# ☸️ Elite Kubernetes Orchestrator

Kubernetes (K8s) adalah panglima perang orkestrasi *container*. Kesalahan kecil pada satu konfigurasi bisa menyebabkan efek domino yang mematikan seluruh klaster (*cluster*), menghabiskan seluruh biaya awan (*Cloud Billing*), atau membuka gerbang bagi peretas.

## 🎯 Tujuan Skill
Memastikan setiap rilis/ *Deployment* ke Kubernetes memiliki batasan memori/CPU yang pasti, menggunakan tag *image* spesifik (bukan *latest*), dan dikonfigurasi dengan pemeriksaan kesehatan otomatis (*Health Probes*).

## ⚠️ Kapan Digunakan
- Saat menulis file *Manifest* YAML untuk Kubernetes (`Deployment`, `Service`, `Ingress`).
- Saat mengelola beban kerja komputasi pada penyedia Cloud (EKS/GKE/AKS).
- Saat menyelidiki (*troubleshooting*) kontainer yang tumbang (OOMKilled atau CrashLoopBackOff).

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** merilis *Deployment* tanpa menetapkan batas memori dan CPU (`resources.limits`). Tanpa batas, satu *Pod* bocor bisa mencekik dan mematikan satu *Node* *server* utuh!
2. **JANGAN PERNAH** menggunakan tag gambar `:latest` (`image: myapp:latest`). Saat node melakukan rilis ulang (*restart*), ia mungkin mengunduh versi yang tidak sesuai secara diam-diam.
3. **JANGAN PERNAH** menjalankan K8s *Deployment* tanpa *Liveness Probe*. Jika aplikasi membeku (*deadlock*), Kubernetes harus tahu kapan harus "membunuhnya" dan menggantinya.

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Resource Requests & Limits**: Deklarasikan `requests` (garansi minimum) dan `limits` (pagar maksimum) pada setiap *Container*.
2. **Probes**: Implementasikan `livenessProbe` (untuk mematikan *pod* mati/beku) dan `readinessProbe` (agar lalu lintas tidak masuk sebelum aplikasi benar-benar siap melayani permintaan).
3. **Immutable Tags**: Gunakan nomor versi semantik (contoh: `:v1.2.3`) atau *SHA Hash* pada gambar (*Image*).

## 🛠 Proses Kerja
1. Gunakan templat `deployment-elite.yaml` sebagai rujukan.
2. Saat terjadi darurat sistem, buka `k8s-survival-guide.md`.
3. Validasi berkas YAML menggunakan *script* `audit-k8s-latest-tag.sh` sebelum diunggah (*apply*).
