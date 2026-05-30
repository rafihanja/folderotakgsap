# 🚫 Elite `.dockerignore` Template

Mencegah file sampah, kredensial lokal, dan modul membengkakkan *Docker Image* Anda. Simpan file ini di *root* proyek.

```text
# Kredensial & Lingkungan Lokal
.env
.env.local
.env.development
.env.production
.env.*

# Direktori Modul Lokal (Akan diinstal ulang di dalam Docker)
node_modules/
.npm/

# Direktori Build Output Lokal
dist/
build/
.next/
out/

# Log Files
npm-debug.log
yarn-error.log
*.log

# Konfigurasi Editor / OS
.vscode/
.idea/
.DS_Store
Thumbs.db

# Direktori Git
.git/
.gitignore

# Skrip Docker Compose
docker-compose.yml
docker-compose.*.yml
```
