#!/bin/bash

# ==============================================================================
# SECURITY AUDIT NOTE
# ==============================================================================
# 1. READ-ONLY: Melakukan grep tanpa menghapus file.
# 2. SAFETY: Mencegah penggunaan tipe `: any` yang berbahaya.
# ==============================================================================

echo "🛑 [Elite Security] Memulai Audit TypeScript: Mencari Tipe 'any'..."
echo "Tipe 'any' adalah virus yang menular dan mematikan fungsi TypeScript."
echo "----------------------------------------------------------------"

TARGET_DIR=${1:-"src"}

if [ ! -d "$TARGET_DIR" ]; then
  echo "⚠️ Direktori $TARGET_DIR tidak ditemukan."
  exit 1
fi

echo "🔎 Pengecekan: Penggunaan eksplisit ': any'"
# Mencari string ": any" (dengan atau tanpa spasi) dalam file ts dan tsx
BAD_ANY=$(grep -rnE ":[ ]*any\b" "$TARGET_DIR" --include=\*.{ts,tsx})

if [ -n "$BAD_ANY" ]; then
    echo "🚨 [DANGER] Ditemukan deklarasi tipe 'any'!"
    echo "Hukum Gantung! Ganti dengan 'unknown', Generics, atau buat Interface yang benar."
    echo ""
    echo "$BAD_ANY"
    echo ""
    echo "❌ [STATUS] Audit GAGAL."
else
    echo "✅ [AMAN] Basis kode 100% bebas dari virus 'any'."
    echo "----------------------------------------------------------------"
    echo "✅ [STATUS] Audit BERHASIL."
fi
