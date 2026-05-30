#!/bin/bash

# ==============================================================================
# THESIS AUDIT NOTE
# ==============================================================================
# Melacak teks yang terlalu panjang tanpa adanya tanda kutipan (kurung dan tahun)
# ==============================================================================

echo "📚 [Thesis Detector] Memulai Audit Kutipan: Mencari Paragraf Kosong..."
echo "Paragraf panjang tanpa kutipan sangat rawan dianggap opini fiktif."
echo "----------------------------------------------------------------"

TARGET_DIR=${1:-"."}
FILES=$(find "$TARGET_DIR" -type f \( -name "*.md" -o -name "*.txt" \) 2>/dev/null)

if [ -z "$FILES" ]; then
  echo "⚠️ Tidak ada file draf tulisan ditemukan."
  exit 0
fi

echo "🔎 Pengecekan: Paragraf Panjang Tanpa Tanda Kutip '(Tahun)'"

for FILE in $FILES; do
    # Secara kasar mendeteksi apakah dokumen ini tidak memiliki pola (Tahun) misal (2020) atau (2023)
    HAS_CITATION=$(grep -E "\([0-9]{4}[a-z]?\)" "$FILE")
    WORD_COUNT=$(wc -w < "$FILE")
    
    if [ "$WORD_COUNT" -gt 150 ] && [ -z "$HAS_CITATION" ]; then
        echo "🚨 [DANGER] File $FILE memiliki >150 kata tapi TIDAK ADA SAMA SEKALI format sitasi APA (Contoh: (2022))."
        echo "Tambahkan referensi untuk mendukung argumen ini."
    else
        echo "✅ [AMAN] File $FILE: Ditemukan format sitasi."
    fi
done

echo "----------------------------------------------------------------"
echo "Pastikan Anda menggunakan Mendeley / Zotero untuk hasil yang sempurna."
