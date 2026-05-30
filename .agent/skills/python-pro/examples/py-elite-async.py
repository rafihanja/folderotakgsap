# ==============================================================================
# ELITE PYTHON PATTERN: ASYNCIO & TYPE HINTS
# Bagaimana memproses jaringan dengan kecepatan tinggi, menghindari blokir GIL.
# ==============================================================================
import asyncio
import time
from typing import List, Dict

# TYPE HINTS: Memperjelas bahwa fungsi ini menerima integer dan mengembalikan kamus (Dict)
async def fetch_data(id: int) -> Dict[str, str]:
    print(f"📡 Mulai mengunduh data ID: {id}...")
    
    # Bayangkan ini adalah request ke Database atau API luar (Contoh lambat 1 detik)
    # Wajib menggunakan await agar fungsi ini minggir dulu (Yield) dan ngasih jalan
    # ke proses lain selagi nunggu balasan server.
    await asyncio.sleep(1) 
    
    print(f"✅ Data ID: {id} selesai diunduh.")
    return {"id": str(id), "status": "Elite Success"}

async def main() -> None:
    start_time = time.time()
    
    # ❌ CARA LAMBAT (Synchronous / Blocking)
    # Kalau kita nunggu satu per satu, 5 request x 1 detik = 5 Detik total!
    
    # ✅ CARA ELITE (Asynchronous Concurrent)
    # Kita panggil kelimanya secara serentak (Parallel-like behavior)
    tasks: List[asyncio.Task] = []
    
    for i in range(1, 6):
        # Mendaftarkan pekerjaan ke dalam antrian mesin asyncio
        task = asyncio.create_task(fetch_data(i))
        tasks.append(task)
        
    # Tunggu semuanya kelar secara BERSAMAAN
    results = await asyncio.gather(*tasks)
    
    end_time = time.time()
    print("\n--- HASIL AKHIR ---")
    print(results)
    
    # Waktu eksekusi hanya butuh ~1 Detik karena mereka jalan serentak!
    print(f"⏱️ Total Waktu: {end_time - start_time:.2f} detik")

# Titik masuk aplikasi
if __name__ == "__main__":
    asyncio.run(main())
