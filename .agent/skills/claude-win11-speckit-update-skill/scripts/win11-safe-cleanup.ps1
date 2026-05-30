<#
.SYNOPSIS
Membersihkan direktori sementara (Temp) di Windows 11 secara aman.

.DESCRIPTION
Skrip ini menghapus file sementara milik user (AppData\Local\Temp).
File yang sedang dikunci oleh sistem (in use) akan dilewati secara otomatis (karena ErrorAction = SilentlyContinue).
Skrip INI TIDAK menggunakan -Force pada direktori sistem inti.

.SECURITY
Diaudit oleh Elite Security Agent.
TIDAK mengubah Registry.
TIDAK menghapus file di direktori Windows.
#>

$ErrorActionPreference = 'Stop'

Write-Host "🧹 [Elite Cleanup] Memulai Pembersihan File Sampah (Temp)..." -ForegroundColor Cyan

# 1. Lokasi Temp User
$userTemp = $env:TEMP

Write-Host "Target: $userTemp"

# Kita hanya mencari file dan folder di dalam Temp, bukan menghapus Temp-nya sendiri
$filesToClean = Get-ChildItem -Path $userTemp -Recurse -File -ErrorAction SilentlyContinue

$deletedCount = 0
$failedCount = 0

foreach ($file in $filesToClean) {
    try {
        # Hapus secara aman tanpa mengubah struktur hak akses
        Remove-Item -Path $file.FullName -ErrorAction Stop
        $deletedCount++
    } catch {
        # File kemungkinan sedang digunakan oleh sistem/aplikasi, aman dilewati
        $failedCount++
    }
}

Write-Host "--------------------------------------------------------"
Write-Host "✅ Selesai!" -ForegroundColor Green
Write-Host "Berhasil dihapus: $deletedCount file."
Write-Host "Dilewati (in-use): $failedCount file."
Write-Host "--------------------------------------------------------"
