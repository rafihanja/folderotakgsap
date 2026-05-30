<#
.SYNOPSIS
Memeriksa kesehatan sistem Windows 11 dasar.

.DESCRIPTION
Contoh skrip PowerShell yang aman (Read-Only) untuk memeriksa status disk dan memori.
Tidak memerlukan akses Administrator untuk membaca info umum.

.EXAMPLE
.\check-sys-health.ps1
#>

$ErrorActionPreference = 'Stop'

Write-Host "🔍 [Elite System Check] Memeriksa Kesehatan Windows 11..." -ForegroundColor Cyan
Write-Host "--------------------------------------------------------"

# 1. Cek Ruang Disk (Drive C)
$driveC = Get-CimInstance Win32_LogicalDisk -Filter "DeviceID='C:'"
$freeSpaceGB = [math]::Round($driveC.FreeSpace / 1GB, 2)
$totalSpaceGB = [math]::Round($driveC.Size / 1GB, 2)

Write-Host "💾 Ruang Drive C: $freeSpaceGB GB Tersedia dari $totalSpaceGB GB"

if ($freeSpaceGB -lt 10) {
    Write-Warning "Sisa penyimpanan sangat rendah (<10 GB)! Disarankan melakukan cleanup."
} else {
    Write-Host "✅ Kapasitas penyimpanan aman." -ForegroundColor Green
}

# 2. Cek Penggunaan Memori Fisik
$mem = Get-CimInstance Win32_OperatingSystem
$totalMem = [math]::Round($mem.TotalVisibleMemorySize / 1MB, 2)
$freeMem = [math]::Round($mem.FreePhysicalMemory / 1MB, 2)
$usedMemPercent = [math]::Round((($totalMem - $freeMem) / $totalMem) * 100, 2)

Write-Host "🧠 Penggunaan RAM: $usedMemPercent% (Tersisa $freeMem GB)"

Write-Host "--------------------------------------------------------"
Write-Host "Selesai."
