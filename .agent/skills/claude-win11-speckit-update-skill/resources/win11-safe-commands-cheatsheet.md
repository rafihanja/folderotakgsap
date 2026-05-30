# 🛡️ Win11 Safe Commands Cheatsheet

Daftar perintah CLI/PowerShell ini telah diaudit dan dijamin 100% aman (Read-Only) untuk mendiagnosa Windows 11 tanpa risiko mengubah sistem operasi. AI Agent diizinkan langsung menjalankan perintah ini.

## 💻 Informasi Sistem Dasar
Menampilkan detail lengkap tentang OS, versi build, dan arsitektur:
```powershell
Get-ComputerInfo | Select-Object OsName, OsVersion, OsArchitecture, WindowsVersion
```

## 🌐 Diagnosa Jaringan
Memeriksa koneksi internet ke DNS Google tanpa *timeout* panjang:
```powershell
Test-NetConnection 8.8.8.8
```

## 🔄 Status Windows Update
Melihat daftar update yang baru saja diinstal:
```powershell
Get-HotFix | Sort-Object InstalledOn -Descending | Select-Object -First 5
```

## 🚀 Performa dan Proses
Melihat 5 proses paling rakus CPU (tanpa mematikan proses):
```powershell
Get-Process | Sort-Object CPU -Descending | Select-Object -First 5 Name, CPU, WorkingSet
```

## 🛡️ Cek Uptime Komputer
Melihat kapan terakhir kali PC di-restart:
```powershell
Get-CimInstance Win32_OperatingSystem | Select-Object LastBootUpTime
```

> **Aturan Keamanan:** Semua perintah di atas adalah READ-ONLY. Perintah destruktif seperti `Stop-Process` atau `Remove-Item` wajib dihindari kecuali diminta eksplisit oleh *user* setelah peringatan keras.
