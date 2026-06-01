# Agent Skills Workspace

Folder ini disimpan di Git supaya setup skill AI agent bisa dipulihkan saat pindah device. Isi utamanya ada di `skills/`: kumpulan `SKILL.md`, referensi, script, template, dan aset pendukung.

## Tujuan

- Menjaga skill yang sudah dikurasi tetap ikut repository.
- Membuat skill GSAP/frontend langsung tersedia setelah clone.
- Menghindari pengulangan instalasi manual saat pindah device.
- Memberi cara validasi cepat untuk memastikan manifest dan isi disk sinkron.
- Mengurangi halusinasi agent dengan aturan evidence-first.

## Anti-Hallucination

Guardrail utama ada di:

- `../AGENTS.md`: aturan kerja root untuk agent di repository ini.
- `../.agents/rules/evidence-first.md`: rule native Antigravity untuk kerja berbasis bukti.
- `../.agents/rules/hybrid-router.md`: rule native Antigravity untuk routing skill dan validasi.
- `core/anti-hallucination.md`: aturan bukti, asumsi, validasi, dan red flags.
- `core/hybrid-agent-policy.md`: policy hybrid lokal + riset resmi + skill routing.
- `core/safe-commands.md`: registry command aman, butuh izin, dan berisiko tinggi.

Prinsipnya sederhana: agent harus membaca file atau menjalankan command yang relevan sebelum mengklaim sesuatu. Kalau belum dicek, agent wajib menyebutnya sebagai asumsi atau meminta klarifikasi.

## Profil Skill Utama

Untuk project GSAP/frontend, skill yang paling dominan dipakai:

- `gsap-core`: tween dasar, transform, opacity, easing, stagger.
- `gsap-timeline`: sequencing animasi dengan timeline.
- `gsap-scrolltrigger`: scroll animation, pinning, scrub, refresh.
- `gsap-plugins`: plugin GSAP seperti Flip, SplitText, MorphSVG, DrawSVG, ScrollTo.
- `gsap-utils`: helper seperti clamp, mapRange, random, snap, toArray.
- `gsap-react`: pola React/Next.js dengan `useGSAP`, refs, scope, cleanup.
- `gsap-frameworks`: pola lifecycle untuk Vue, Svelte, dan framework lain.
- `gsap-performance`: optimasi 60fps, hindari layout thrashing.
- `elite-gsap-react-architecture`: standar tambahan untuk GSAP di React/Next.js.

Skill pendukung yang sering berguna:

- `three-js-expert`
- `react-three-fiber`
- `framer-motion`
- `lottie-web`
- `lenis-scroll`
- `locomotive-scroll`
- `split-type`
- `web-mobile-joystick`
- `playwright`

## Restore Di Device Baru

1. Clone repository seperti biasa.
2. Pastikan folder `.agent/skills` ikut terambil.
3. Jalankan validasi:

```bash
node .agent/scripts/validate-agent-skills.mjs
node .agent/scripts/agent-doctor.mjs
```

Jika validasi lolos, skill manifest sudah cocok dengan isi disk dan skill GSAP utama tersedia.

Untuk mendeteksi stack project dan skill yang relevan:

```bash
node .agent/scripts/detect-project.mjs
```

## Catatan Keamanan

Jangan menjalankan script di dalam `skills/` secara otomatis. Banyak skill berisi contoh automation, installer, scanner, dan integrasi eksternal yang mungkin membutuhkan dependency, token, atau akses jaringan. Baca `SKILL.md` dan script terkait sebelum menjalankan apa pun.
