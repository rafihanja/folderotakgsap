# 🛡️ OWASP Top 10 Security Checklist

Kerentanan paling umum di internet. Hindari semua ini untuk menyelamatkan reputasi Anda.

## 1. Broken Access Control
- [ ] Mencegah pengguna memanipulasi ID di URL untuk mengakses data orang lain. (Selalu cek apakah `req.user.id == targetData.userId`).
- [ ] Membatasi akses *admin dashboard* dengan peran (*role*) yang kuat.

## 2. Cryptographic Failures (Kebocoran Data Sensitif)
- [ ] **Ya**: Meng-hash password menggunakan `bcrypt` atau `argon2` sebelum disimpan.
- [ ] **Tidak**: Jangan pernah menyimpan API Key atau JWT Secret di *front-end* (React/Browser).

## 3. Injection (SQL & Command)
- [ ] **Ya**: Menggunakan ORM (Prisma/Drizzle) atau Kueri Berparameter (Parameterized Query) untuk mencegah *hacker* menyisipkan perintah SQL ilegal.

## 4. Insecure Design
- [ ] **Ya**: Menerapkan validasi ketat (*Rate Limiting*) pada titik rute yang rawan seperti Login atau Lupa Password untuk mencegah *Bot Brute-Force*.

## 5. Security Misconfiguration
- [ ] **Ya**: Menonaktifkan pesan *Error Stack Trace* (pesan error merah panjang yang berisi lokasi folder server) saat berada di mode *Production*.
