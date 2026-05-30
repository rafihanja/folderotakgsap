# ⚡ Elite PowerShell Aliases (Profil)

Tempel kode ini ke dalam file profil PowerShell Anda.
Cara buka file profil: ketik `notepad $PROFILE` di terminal.

```powershell
# ==========================================
# ELITE ALIASES BUNDLE
# Mengubah PowerShell agar terasa seperti Bash Linux
# ==========================================

# 1. Navigasi & File System Cepat
Set-Alias ll Get-ChildItemColor # Asumsi Anda sudah menginstall modul Get-ChildItemColor
function md { New-Item -ItemType Directory -Name $args[0] }
function touch { New-Item -ItemType File -Name $args[0] }
function grep { Select-String $args }

# 2. Git Supercepat (Jangan buang waktu mengetik)
Set-Alias gs git status
Set-Alias ga git add .
function gc { git commit -m "$args" }
Set-Alias gp git push
Set-Alias gl git log --oneline --graph --decorate

# 3. Docker (Membunuh semua kontainer sekaligus)
function dkillall { docker stop (docker ps -a -q) }
function dcleanall { docker rm (docker ps -a -q) }

# 4. Utilities
function myip { (Invoke-WebRequest ifconfig.me/ip).Content }
function killport {
    param([int]$port)
    $process = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($process) {
        Stop-Process -Id $process.OwningProcess -Force
        Write-Host "Port $port berhasil dimatikan!" -ForegroundColor Green
    } else {
        Write-Host "Tidak ada aplikasi di port $port" -ForegroundColor Yellow
    }
}
```
