# 🩺 K8s Survival Guide (Komando Darurat)

Jika server produksi tumbang, jangan panik. Gunakan komando ini untuk menganalisis masalah sebelum melakukan tindakan impulsif.

## 1. Analisis Status Singkat
Periksa *Pod* mana yang mati atau mengalami *CrashLoopBackOff*:
```bash
kubectl get pods -n <namespace>
```

## 2. Kenapa Pod Tersebut Mati?
Periksa riwayat kejadian (Event) pada *Pod* tersebut (Sangat berguna untuk mencari pesan OOMKilled atau Scheduling Failed):
```bash
kubectl describe pod <nama-pod> -n <namespace>
```
*Gulir ke bagian bawah output (Events).*

## 3. Membaca Log Masa Lalu (Crash)
Jika *Pod* mati seketika dan di-restart (*CrashLoopBackOff*), baca log dari *container* sebelum ia hancur (menggunakan parameter `-p` atau `--previous`):
```bash
kubectl logs <nama-pod> -n <namespace> --previous
```

## 4. Analisis Beban CPU / RAM Secara Langsung
Mengecek apakah aplikasi sedang kelaparan sumber daya:
```bash
kubectl top pods -n <namespace>
```

## 5. Rollback Kilat (Undo)
Jika perilisan (Deployment) terbaru terbukti merusak sistem dan Anda harus segera mengembalikan ke versi sebelumnya:
```bash
kubectl rollout undo deployment/<nama-deployment> -n <namespace>
```
