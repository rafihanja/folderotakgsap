// ==============================================================================
// ELITE RUST PATTERN: OWNERSHIP & BORROWING
// Mengapa Rust bebas dari Memory Leak dan C-style bugs.
// ==============================================================================

fn main() {
    // 1. ATURAN PEMILIKAN (OWNERSHIP)
    let s1 = String::from("Sistem Rust Elite");
    
    // String pindah tangan (Moved). s1 dilarang keras dipanggil lagi setelah ini.
    let s2 = s1; 
    
    // println!("{}", s1); // <-- JIKA DI-UNCOMMENT, COMPILER AKAN MARAH!
    println!("Pemilik baru: {}", s2); 

    // 2. ATURAN PEMINJAMAN (BORROWING)
    // Supaya data tidak usah pindah-pindah tangan, kita meminjamkannya lewat Referensi (&)
    let panjang = ukur_panjang(&s2);
    
    // s2 tetap bisa digunakan karena hanya "dipinjamkan", bukan "diberikan"
    println!("Kalimat '{}' memiliki panjang {} karakter.", s2, panjang);

    // 3. MUTASI AMAN (MUTABLE BORROWING)
    let mut data = String::from("Kode");
    
    // Rust punya aturan mutlak: Anda boleh punya BANYAK peminjam baca (&), 
    // ATAU SATU peminjam tulis (&mut). Tidak boleh keduanya bersamaan! (Anti Data-Race)
    tambah_kata(&mut data);
    println!("Setelah dimutasi: {}", data);
}

// Menerima referensi (meminjam membaca) tanpa merampas kepemilikan
fn ukur_panjang(teks: &String) -> usize {
    teks.len()
}

// Menerima referensi mutable (meminjam untuk mengubah)
fn tambah_kata(teks: &mut String) {
    teks.push_str(" Elite");
}
