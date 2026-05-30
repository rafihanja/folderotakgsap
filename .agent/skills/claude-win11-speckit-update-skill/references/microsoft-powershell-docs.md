# 📚 Referensi Windows 11 System Management

Referensi resmi untuk memastikan agen tidak mengarang (hallucinate) perintah PowerShell.

## 1. PowerShell Execution Policies
- **Sumber**: [Microsoft Learn - about_Execution_Policies](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies)
- **Ringkasan**: Secara default, Windows 11 memiliki kebijakan eksekusi `Restricted`. Skrip eksternal tidak akan berjalan. 
- **Relevansi**: Memandu AI agent untuk memberikan instruksi `-ExecutionPolicy Bypass -Scope Process` dengan aman tanpa mengubah *registry* global sistem.

## 2. DISM & SFC (System File Checker)
- **Sumber**: [Microsoft Learn - Repair a Windows Image](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/repair-a-windows-image)
- **Ringkasan**: `sfc /scannow` digunakan untuk memindai *file* sistem yang korup. Jika SFC gagal, DISM (`DISM /Online /Cleanup-Image /RestoreHealth`) digunakan untuk memperbaiki *image* Windows.
- **Relevansi**: Kedua perintah ini adalah *gold standard* untuk memperbaiki Windows 11 tanpa *install* ulang. Namun, keduanya membutuhkan akses Administrator.

## 3. Windows Update Module (PSWindowsUpdate)
- **Sumber**: Modul eksternal paling terpercaya di *PowerShell Gallery*.
- **Ringkasan**: Windows 11 secara bawaan agak sulit di-update via skrip dasar, seringkali memerlukan modul `PSWindowsUpdate`.
- **Relevansi**: AI harus memperingatkan user bahwa mengelola Windows Update secara otomatis melalui skrip memerlukan instalasi modul ekstra (`Install-Module PSWindowsUpdate`).
