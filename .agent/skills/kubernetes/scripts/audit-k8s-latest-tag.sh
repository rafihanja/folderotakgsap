#!/bin/bash

# ==============================================================================
# SECURITY AUDIT NOTE
# ==============================================================================
# 1. READ-ONLY: Melakukan grep tanpa mengubah file YAML.
# 2. SAFETY: Melacak indikasi penggunaan tag image ':latest' yang sangat rawan.
# ==============================================================================

echo "☸️ [Elite Security] Memulai Audit Kubernetes: Melacak ':latest' Tag..."
echo "Penggunaan tag ':latest' di k8s adalah dosa besar infrastruktur."
echo "----------------------------------------------------------------"

TARGET_DIR=${1:-"."}

if [ ! -d "$TARGET_DIR" ]; then
  echo "⚠️ Direktori $TARGET_DIR tidak ditemukan."
  exit 1
fi

echo "🔎 Pengecekan: Tag image ':latest'"

# Regex mendeteksi baris yang berisi 'image: ' diakhiri dengan ':latest'
BAD_TAGS=$(grep -rniE "image:[[:space:]]+.*:latest" "$TARGET_DIR" --include=\*.{yaml,yml})

if [ -n "$BAD_TAGS" ]; then
    echo "🚨 [DANGER] Ditemukan file manifest K8s yang menggunakan tag ':latest'!"
    echo "Ganti dengan Semantic Versioning (contoh: :v1.0.0) atau hash spesifik."
    echo ""
    echo "$BAD_TAGS"
    echo ""
    echo "❌ [STATUS] Audit GAGAL. Risiko inkonsistensi rilis sangat tinggi."
else
    echo "✅ [AMAN] Anda adalah SRE sejati. Semua tag gambar telah dikunci."
    echo "----------------------------------------------------------------"
    echo "✅ [STATUS] Audit BERHASIL."
fi
