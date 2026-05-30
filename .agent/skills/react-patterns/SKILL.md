---
name: react-patterns
description: "Elite React 18+ Architecture and Performance Patterns"
risk: low (safe structural patterns)
source: "Elite Agent Operations"
date_updated: "2026-05-30"
---

# ⚛️ Elite React Patterns

Skill ini mengatur fondasi mutlak tentang bagaimana kode React harus ditulis di dalam *workspace* ini. Segala pembuatan UI, pengelolaan *state*, dan pemanggilan API harus tunduk pada arsitektur modern (Functional Components & Hooks).

## 🎯 Tujuan Skill
Memastikan komponen React bebas dari *anti-pattern* yang sering dilakukan *junior developer*, mengoptimalkan performa V-DOM, dan mempertahankan separasi yang jelas antara "Logika" dan "Tampilan".

## ⚠️ Kapan Digunakan
- Saat membuat atau me-*refactor* komponen `.jsx` / `.tsx`.
- Saat mengelola aliran data (props, state, context).
- Saat melakukan pemanggilan *side-effects* (API fetch, event listener).

## ⛔ Larangan Keras (NEVER DO THIS)
1. **JANGAN PERNAH** menggunakan `index` dari array sebagai `key` dalam perulangan `.map()` jika urutan *item* berpotensi berubah. (Ini menghancurkan performa dan *state* internal React).
2. **JANGAN PERNAH** memasukkan seluruh logika *fetching* API dan perhitungan berat ke dalam komponen UI langsung.
3. **JANGAN PERNAH** menggunakan `useEffect` tanpa array dependensi (kecuali benar-benar disengaja untuk *re-render* tiap frame, yang mana hampir selalu salah).

## ✅ Aturan Wajib (ALWAYS DO THIS)
1. **Separation of Concerns**: Pisahkan *business logic* ke dalam `Custom Hooks` (contoh: `useUserData`). Biarkan komponen `.tsx` hanya mengurus Presentasi (UI).
2. **Memoization by Default (Untuk Objek/Fungsi)**: Jika Anda mengirim *object* atau *function* sebagai *props* ke komponen *child* yang berat, bungkus dengan `useMemo` atau `useCallback`.
3. **Error Boundaries**: Seluruh akar aplikasi wajib dibungkus `ErrorBoundary` agar aplikasi tidak menampilkan "Layar Putih Kematian" saat *render error*.

## 🛠 Proses Kerja
1. Pikirkan struktur komponen (Presentational vs Container).
2. Gunakan *custom hooks* untuk mengikat logika.
3. Terapkan validasi tipe menggunakan TypeScript (*interface/type*).
