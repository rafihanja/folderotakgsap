#!/bin/bash

# ==============================================================================
# SECURITY AUDIT NOTE
# ==============================================================================
# 1. READ-ONLY: Melakukan grep tanpa mengubah file.
# 2. SAFETY: Melacak tidak adanya deklarasi USER (Root secara default) di Dockerfile.
# ==============================================================================

echo "🐳 [Elite Security] Memulai Audit Docker: Melacak Hak Akses Root..."
echo "Container yang berjalan sebagai root adalah sasaran empuk eksploitasi (Container Breakout)."
echo "----------------------------------------------------------------"

TARGET_DIR=${1:-"."}
DOCKERFILES=$(find "$TARGET_DIR" -type f -name "Dockerfile" 2>/dev/null)

if [ -z "$DOCKERFILES" ]; then
  echo "⚠️ Tidak ada file Dockerfile ditemukan di $TARGET_DIR."
  exit 0
fi

VIOLATION_FOUND=0

echo "🔎 Pengecekan: Deklarasi 'USER' pada Dockerfile"

for FILE in $DOCKERFILES; do
    # Mengecek apakah ada deklarasi 'USER' di Dockerfile (kecuali USER root)
    HAS_SAFE_USER=$(grep -rniE "^USER[[:space:]]+(?!root)[a-zA-Z0-9_]+" "$FILE")
    
    if [ -z "$HAS_SAFE_USER" ]; then
        echo "🚨 [DANGER] Dockerfile: $FILE TIDAK membatasi hak akses root!"
        echo "Tambahkan 'USER nama_user' (contoh: USER node) di bagian bawah file."
        VIOLATION_FOUND=1
    else
        echo "✅ [AMAN] Dockerfile: $FILE telah menurunkan hak akses root dengan benar."
    fi
done

echo "----------------------------------------------------------------"
if [ $VIOLATION_FOUND -eq 1 ]; then
    echo "❌ [STATUS] Audit GAGAL. Tingkat Ancaman: TINGGI."
else
    echo "✅ [STATUS] Audit BERHASIL. Lingkungan Container Anda terkunci rapat."
fi
