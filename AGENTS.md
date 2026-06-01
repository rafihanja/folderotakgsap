# Agent Instructions

Gunakan instruksi ini untuk semua pekerjaan di repository ini, terutama saat bekerja dengan Antigravity dan folder `.agent`.

## Anti-Hallucination Rules

- Jangan mengklaim isi file, dependency, command, framework, error, atau hasil test tanpa membaca file atau menjalankan command yang relevan.
- Jika informasi belum dicek, katakan bahwa itu asumsi atau belum diverifikasi.
- Jika kebutuhan ambigu, tanyakan maksimal 3 pertanyaan penting. Jika user meminta langsung lanjut, tulis asumsi singkat lalu lanjut.
- Jangan membuat fitur, data, credential, endpoint, API key, atau konteks palsu.
- Jangan menyatakan "sudah berhasil" sebelum ada bukti dari command, build, test, lint, browser check, atau pemeriksaan file.
- Saat memberi rekomendasi, pisahkan fakta yang sudah diverifikasi dari saran engineering.

## Evidence Workflow

1. Baca struktur project dan file yang relevan sebelum mengedit.
2. Tentukan source of truth: file lokal, manifest, package config, test output, dokumentasi resmi, atau jawaban user.
3. Edit hanya file yang dibutuhkan.
4. Jalankan validasi yang tersedia.
5. Laporkan file yang diubah, command yang dijalankan, hasil penting, dan risiko yang tersisa.

## `.agent` Workflow

- `.agent/skills` adalah knowledge base skill yang sengaja disimpan di Git.
- `.agents/rules` adalah aturan workspace Antigravity-native yang memuat guardrail utama.
- Jangan hapus, untrack, atau memindahkan `.agent` tanpa perintah eksplisit user.
- Setelah mengubah `.agent`, jalankan:

```bash
node .agent/scripts/validate-agent-skills.mjs
node .agent/scripts/agent-doctor.mjs
```

- Untuk pekerjaan yang menyangkut `.agent`, commit dan push perubahan ke GitHub jika user sudah meminta sinkronisasi GitHub.
- Saat stack project belum jelas, jalankan:

```bash
node .agent/scripts/detect-project.mjs
```

## Hybrid Mode

- Gunakan bukti lokal dulu: file, manifest, package config, dan output command.
- Gunakan `.agent/skill-router.json` untuk memilih skill, bukan menebak dari ingatan.
- Gunakan dokumentasi resmi saat perilaku tools bisa berubah, terutama Antigravity, framework, deploy, package manager, dan security.
- Jangan memberi jawaban generik: sebutkan file yang dicek, skill yang relevan, command validasi, dan risiko yang tersisa.

## Professional Standard

- Ikuti `.agents/rules/professional-engineering.md`.
- Gunakan `.agent/core/professional-engineering-standards.md` sebagai quality bar utama.
- Untuk security, gunakan cara pikir OWASP ASVS.
- Untuk UI web, gunakan WCAG 2.2 sebagai baseline aksesibilitas.
- Untuk dependency/build/release, gunakan prinsip supply-chain safety seperti SLSA.
- Jangan menyelesaikan task tanpa menyebut evidence, validasi, dan risiko tersisa.

## Safety Boundaries

- Jangan menjalankan script dari `.agent/skills` secara otomatis. Baca `SKILL.md` dan script terkait dulu.
- Jangan commit credential, `.env` asli, token, private key, atau output build/cache yang tidak perlu.
- Jangan menyentuh folder untracked atau perubahan user yang tidak terkait dengan task.
- Untuk Antigravity, gunakan mode/setting aman untuk project yang belum dipercaya: terminal command review, workspace isolation, dan Strict Mode jika tersedia.
