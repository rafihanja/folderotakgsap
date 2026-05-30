---
name: elite-gsap-react-architecture
description: Standar mutlak untuk penggunaan GSAP di React/Next.js menggunakan hook useGSAP untuk mencegah memory leak.
---

# 🚀 Elite GSAP React Architecture

Skill ini wajib dipanggil setiap kali AI agent atau developer diminta untuk membuat animasi GSAP di dalam ekosistem React (termasuk Next.js).

## 🎯 Tujuan Skill
Memastikan semua animasi berjalan *smooth* pada 60fps, terhindar dari *memory leak* akibat *Strict Mode* React 18, dan menggunakan praktik terbaik *cleanup* memori.

## ⚠️ Kapan Digunakan
- Saat membuat animasi `gsap.to()`, `gsap.from()`, `gsap.timeline()`.
- Saat mengimplementasikan `ScrollTrigger` di komponen React.
- Saat ada bug animasi yang *flicker* atau berjalan dua kali.

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** menggunakan `useEffect` mentah untuk memanggil GSAP tanpa mekanisme `cleanup` yang spesifik (`ctx.revert()`).
2. **JANGAN PERNAH** menganimasikan `width`, `height`, `top`, `left`, `margin`, `padding` secara intensif. (Haram hukumnya karena memicu *layout thrashing* / *reflow*).
3. **JANGAN PERNAH** lupa mendaftarkan plugin (contoh: `gsap.registerPlugin(ScrollTrigger)`).

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Gunakan `@gsap/react`**: Selalu gunakan hook `useGSAP` sebagai pengganti `useEffect`. Hook ini secara otomatis menangani *cleanup*.
2. **Gunakan `transform` & `opacity`**: Untuk animasi pergerakan, gunakan `x`, `y`, `scale`, `rotation`, dan `opacity` (hanya memicu komposit GPU, sangat ringan).
3. **Gunakan `useRef`**: Selalu referensikan elemen DOM menggunakan `useRef`, jangan menggunakan *string selector* (seperti `".box"`) kecuali scopingnya dijamin tertutup di dalam komponen.

## 🛠 Proses Kerja
1. Import `gsap` dan `useGSAP`.
2. Buat referensi DOM dengan `useRef`.
3. Tulis animasi di dalam blok `useGSAP()`.

## 💡 Contoh Singkat
```tsx
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

export default function Box() {
  const boxRef = useRef(null);

  useGSAP(() => {
    // Animasi aman, otomatis cleanup saat unmount!
    gsap.to(boxRef.current, { x: 100, rotation: 360, duration: 1 });
  });

  return <div ref={boxRef} className="box">Kotak</div>;
}
```
