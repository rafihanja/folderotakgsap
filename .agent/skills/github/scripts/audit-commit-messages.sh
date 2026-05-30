#!/bin/bash

# ==============================================================================
# QA AUDIT NOTE
# ==============================================================================
# Membaca 10 commit terakhir untuk mencari pesan sampah (seperti "update", "fix").
# ==============================================================================

echo "🐙 [Elite Git] Memulai Audit Commit: Melacak riwayat sampah..."
echo "Pesan commit adalah dokumentasi abadi. Tulis dengan Conventional Commits."
echo "----------------------------------------------------------------"

# Cek apakah ini repository Git
if [ ! -d ".git" ]; then
    echo "⚠️ Folder ini belum diinisialisasi sebagai repository Git."
    exit 0
fi

echo "🔎 Pengecekan: 10 Pesan Commit Terakhir"

# Regex mendeteksi pesan yang diawali dengan format standar: feat:, fix:, chore:, docs:, refactor:, style:, test:
# Mengabaikan Merge branch
COMMITS=$(git log --oneline -n 10 --no-merges)

VIOLATION=0

while IFS= read -r line; do
    HASH=$(echo "$line" | awk '{print $1}')
    MSG=$(echo "$line" | cut -d' ' -f2-)
    
    if [[ ! "$MSG" =~ ^(feat|fix|chore|docs|refactor|style|test|build|ci|perf)(\(.*\))?: ]]; then
        echo "🚨 [SAMPAH] $HASH: $MSG"
        VIOLATION=1
    else
        echo "✅ [ELITE]  $HASH: $MSG"
    fi
done <<< "$COMMITS"

echo "----------------------------------------------------------------"
if [ $VIOLATION -eq 1 ]; then
    echo "❌ [STATUS] Audit GAGAL. Beberapa pesan commit tidak memenuhi standar."
    echo "Gunakan format: tipe(scope): pesan singkat (Contoh: feat(ui): add button)"
else
    echo "✅ [STATUS] Audit BERHASIL. Riwayat Git Anda sangat rapi."
fi
