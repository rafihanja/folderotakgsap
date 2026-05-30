#!/bin/bash

# ==============================================================================
# SECURITY AUDIT NOTE
# ==============================================================================
# 1. READ-ONLY: Melakukan grep tanpa mengubah file.
# 2. SAFETY: Melacak indikasi password atau rahasia yang ter-hardcode.
# ==============================================================================

echo "🔐 [Elite Security] Memulai Audit Rahasia: Melacak Hardcoded Secrets..."
echo "Mencari string statis yang dicurigai sebagai Password, Token, atau Secret."
echo "----------------------------------------------------------------"

TARGET_DIR=${1:-"src"}

if [ ! -d "$TARGET_DIR" ]; then
  echo "⚠️ Direktori $TARGET_DIR tidak ditemukan."
  exit 1
fi

echo "🔎 Pengecekan: Hardcoded Passwords / API Keys / JWT Secrets"

# Regex mendeteksi nama variabel umum (password, secret, token, key) yang diberi nilai string mentah
BAD_SECRETS=$(grep -rnE "(password|secret|token|api_key|apikey)[ ]*[:=][ ]*['\"][A-Za-z0-9\-_]{5,}['\"]" "$TARGET_DIR" --include=\*.{ts,js,json,yml,yaml,go,py})

if [ -n "$BAD_SECRETS" ]; then
    echo "🚨 [DANGER] Ditemukan potensi kebocoran Rahasia di dalam source code!"
    echo "Segera pindahkan nilai string statis tersebut ke file .env (Variabel Lingkungan)."
    echo ""
    echo "$BAD_SECRETS"
    echo ""
    echo "❌ [STATUS] Audit GAGAL. Tingkat Ancaman: KRITIS."
else
    echo "✅ [AMAN] Tidak ada rahasia harcode yang terdeteksi dengan pola dasar."
    echo "Catatan: Lakukan juga pemindaian alat otomatis seperti GitGuardian."
    echo "----------------------------------------------------------------"
    echo "✅ [STATUS] Audit BERHASIL."
fi
