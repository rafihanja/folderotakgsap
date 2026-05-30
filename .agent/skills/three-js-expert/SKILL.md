---
name: three-js-expert
description: "3D WebGL library for advanced graphics"
risk: high (GPU/Memory overload)
source: "Elite Agent Operations - Batch 8"
date_updated: "2026-05-30"
---

# 🧊 Elite Three.js Expert

Membawa grafis PS4 ke dalam *Browser*. WebGL (Three.js) adalah pedang bermata dua: ia bisa memberikan efek WOW yang luar biasa, namun jika tidak dioptimalkan, ia bisa membuat *browser* (bahkan OS) *crash* karena kehabisan VRAM (Memori Kartu Grafis).

## 🎯 Tujuan Skill
Memastikan pengaturan *Scene*, *Camera*, dan *Renderer* berjalan di 60 FPS, serta menjaga memori GPU tetap stabil melalui pengelolaan (*Disposal*) yang ketat.

## ⚠️ Kapan Digunakan
- Saat me-*render* model 3D (GLTF/OBJ), sistem partikel, atau *Shader* kustom (GLSL).
- Saat membangun dunia *Virtual Reality* (WebXR) atau interaksi 3D tingkat lanjut.

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** merender ulang material atau geometri baru di dalam *Render Loop* (`requestAnimationFrame`). Selalu deklarasikan objek di luar *loop*.
2. **JANGAN PERNAH** membiarkan Scene 3D menumpuk di memori ketika *user* pindah halaman. Objek WebGL TIDAK dibersihkan secara otomatis oleh *Garbage Collector* Javascript.
3. **JANGAN PERNAH** memuat tekstur resolusi 4K untuk aplikasi web biasa. Kompres menjadi `.webp` atau maksimal 1K.

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Manual Disposal**: Anda WAJIB memanggil `.dispose()` secara manual pada setiap `Geometry`, `Material`, dan `Texture` saat komponen dihapus.
2. **Instanced Mesh**: Jika Anda merender 1000 kubus yang sama, gunakan `THREE.InstancedMesh`. Jangan membuat 1000 objek *Mesh* terpisah. (Ini meningkatkan performa dari 5 FPS menjadi 60 FPS).
3. **PixelRatio Limit**: Batasi *pixel ratio* layar maksimal 2 (`renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))`) agar HP *flagship* tidak kepanasan me-render resolusi absurd.

## 🛠 Proses Kerja
1. Ikuti ketat `threejs-optimization-checklist.md` sebelum *deployment*.
