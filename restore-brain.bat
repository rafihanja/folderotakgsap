@echo off
title Restore Otak Antigravity Elite
color 0A

echo =======================================================
echo MENGAKTIFKAN PROTOKOL KEBANGKITAN AGEN ELITE...
echo =======================================================
echo.
echo Menarik memori dari antigravity_brain_backup.zip...

powershell -Command "if (-not (Test-Path '%USERPROFILE%\.gemini\antigravity-ide')) { New-Item -ItemType Directory -Force -Path '%USERPROFILE%\.gemini\antigravity-ide' | Out-Null }; Expand-Archive -Path '.\antigravity_brain_backup.zip' -DestinationPath '%USERPROFILE%\.gemini\antigravity-ide' -Force"

echo.
echo =======================================================
echo 100%% SELESAI! OTAK ELITE BERHASIL DIPASANG.
echo Silakan tutup jendela ini dan buka Antigravity IDE.
echo =======================================================
pause
