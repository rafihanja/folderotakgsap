# @ts-nocheck
# Contoh Elite: Setup 3 Agen Kolaborasi Menggunakan CrewAI (Python)
from crewai import Agent, Task, Crew, Process

# =========================================================
# 1. DEKLARASI AGEN (Aktor)
# =========================================================

# Aktor 1: Si Jenius Riset
researcher = Agent(
  role='Senior Technology Researcher',
  goal='Menemukan teknologi database paling cepat di tahun ini',
  backstory='Anda adalah peneliti gila data yang tidak mudah percaya hype marketing. Anda hanya percaya pada metrik dan angka nyata.',
  verbose=True,
  allow_delegation=False
)

# Aktor 2: Sang Penulis Ahli
writer = Agent(
  role='Technical Lead Writer',
  goal='Menulis artikel panduan teknis yang sangat mudah dipahami',
  backstory='Anda adalah mantan CTO yang kini senang mengajar. Bahasa Anda tegas, tidak bertele-tele, namun mudah dimengerti pemula.',
  verbose=True,
  allow_delegation=False
)

# =========================================================
# 2. DEKLARASI TUGAS (Misi)
# =========================================================

# Tugas 1 (Diberikan ke Researcher)
task1 = Task(
  description='Lakukan riset mendalam tentang performa Vector Database (Pinecone vs Milvus vs Weaviate). Kumpulkan data benchmark.',
  expected_output='Tabel perbandingan benchmark kecepatan baca/tulis dalam bentuk poin-poin.',
  agent=researcher
)

# Tugas 2 (Diberikan ke Writer)
task2 = Task(
  description='Berdasarkan hasil riset, tulis blog post 500 kata yang merekomendasikan database terbaik untuk pemula AI.',
  expected_output='Artikel blog siap rilis berformat Markdown.',
  agent=writer
)

# =========================================================
# 3. PENYATUAN KRU (Orkestrasi)
# =========================================================
# Mereka akan bekerja berurutan. Hasil dari Peneliti akan dilempar ke Penulis.
tech_crew = Crew(
  agents=[researcher, writer],
  tasks=[task1, task2],
  process=Process.sequential 
)

# Mulai bekerja!
print("🔥 Memulai Orkestrasi Multi-Agent...")
result = tech_crew.kickoff()
print("Selesai! Hasil Akhir:")
print(result)
