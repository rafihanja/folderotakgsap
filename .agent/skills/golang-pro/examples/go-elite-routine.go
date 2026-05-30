package main

import (
	"fmt"
	"sync"
	"time"
)

// ==============================================================================
// ELITE GOLANG PATTERN: WORKER POOL
// Mencegah server mati (OOM) karena memutar jutaan fungsi sekaligus.
// ==============================================================================

// worker adalah fungsi yang akan dikerjakan oleh masing-masing "Karyawan" (Goroutine)
func worker(id int, jobs <-chan int, results chan<- int, wg *sync.WaitGroup) {
	// Menandakan bahwa Goroutine ini selesai saat fungsinya berakhir
	defer wg.Done()

	for j := range jobs {
		fmt.Printf("👷 Pekerja %d mulai mengeksekusi Tugas #%d\n", id, j)
		time.Sleep(time.Millisecond * 500) // Simulasi kerja berat
		fmt.Printf("✅ Pekerja %d SELESAI Tugas #%d\n", id, j)
		
		results <- j * 2 // Kirim hasil kerja melalui Pipa (Channel)
	}
}

func main() {
	const numJobs = 10
	const numWorkers = 3 // Kita hanya sewa 3 pekerja untuk 10 tugas agar RAM aman!

	jobs := make(chan int, numJobs)
	results := make(chan int, numJobs)
	var wg sync.WaitGroup

	// 1. Rekrut pekerja (Spawn Goroutines)
	for w := 1; w <= numWorkers; w++ {
		wg.Add(1)
		go worker(w, jobs, results, &wg)
	}

	// 2. Beri mereka pekerjaan (Kirim data ke Channel)
	for j := 1; j <= numJobs; j++ {
		jobs <- j
	}
	close(jobs) // Tutup pipa pekerjaan agar pekerja tahu tidak ada tugas baru

	// 3. Tunggu sampai semua pekerja selesai (Sinkronisasi)
	go func() {
		wg.Wait()
		close(results) // Tutup pipa hasil
	}()

	// 4. Ambil hasil karya mereka
	for a := range results {
		fmt.Printf("📬 Hasil diterima: %d\n", a)
	}
	
	fmt.Println("🚀 Semua tugas selesai dengan mulus.")
}
