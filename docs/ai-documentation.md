# Nocli AI Documentation

## Overview
Nocli AI adalah alat AI yang menggunakan provider sendiri untuk memproses permintaan dan memberikan respons. Platform ini dirancang untuk memberikan pengalaman AI yang fleksibel dan powerful.

## Fitur Utama

### 1. Provider AI Sendiri
- Menggunakan infrastructure AI custom
- Tidak bergantung pada provider eksternal
- Kontrol penuh atas data dan pemrosesan

### 2. Mode AI
Platform menyediakan berbagai mode AI yang dapat disesuaikan dengan kebutuhan:

- **Default**: Mode standar untuk penggunaan sehari-hari
- **Low**: Mode hemat resource, cocok untuk tugas sederhana
- **LowFast**: Mode cepat dengan resource rendah
- **Max**: Mode performa tinggi dengan resource maksimal
- **SuperMax**: Mode ultimate untuk tugas-tugas kompleks

### 3. Switch Model
- Dapat berganti model AI dengan animasi drag
- Transisi yang mulus antar model
- Konfigurasi model yang fleksibel

### 4. Context Windows
- Sistem context yang canggih
- Animasi yang menarik untuk context windows
- Manajemen context yang efisien

## Arsitektur

### Komponen Utama

1. **Chat Interface**: Antarmuka chat untuk berinteraksi dengan AI
2. **Model Switcher**: Komponen untuk mengganti model AI
3. **Mode Selector**: Selektor mode AI dengan drag animation
4. **Context Manager**: Manajemen context dengan animasi

### Alur Kerja

```
User Input -> Context Processing -> Model Selection -> AI Processing -> Response Generation -> Output Display
```

## Konfigurasi Mode AI

### Default Mode
- Balance antara performa dan resource
- Cocok untuk sebagian besar penggunaan
- Kecepatan: Medium
- Akurasi: High

### Low Mode
- Resource minimal
- Kecepatan: Low
- Akurasi: Medium
- Cocok untuk: Tugas sederhana, testing

### LowFast Mode
- Resource rendah tetapi cepat
- Kecepatan: High
- Akurasi: Medium-Low
- Cocok untuk: Prototyping, iterasi cepat

### Max Mode
- Resource maksimal
- Kecepatan: Medium-High
- Akurasi: Very High
- Cocok untuk: Tugas kompleks, production

### SuperMax Mode
- Semua resource tersedia
- Kecepatan: High
- Akurasi: Maximum
- Cocok untuk: Tugas kritis, analisis mendalam

## API Reference

### Endpoint Utama
- POST `/api/chat` - Kirim pesan chat
- GET `/api/models` - Daftar model tersedia
- PUT `/api/mode` - Ganti mode AI
- GET `/api/context` - Dapatkan context saat ini

### Request Format

```json
{
  "message": "string",
  "model": "string",
  "mode": "default|low|lowfast|max|supermax",
  "context": "array"
}
```

### Response Format

```json
{
  "response": "string",
  "model": "string",
  "mode": "string",
  "processing_time": "number",
  "tokens_used": "number"
}
```

## Best Practices

1. **Mode Selection**: Pilih mode yang sesuai dengan kebutuhan tugas
2. **Context Management**: Kelola context dengan bijak untuk hasil optimal
3. **Model Switching**: Ganti model sesuai dengan jenis tugas
4. **Resource Optimization**: Gunakan mode yang efisien untuk menghemat resource

## Troubleshooting

### Masalah Umum
- **Respons Lambat**: Coba gunakan mode LowFast atau kurangi context
- **Akurasi Rendah**: Coba gunakan mode Max atau SuperMax
- **Memory Issue**: Gunakan mode Low atau LowFast

### Debugging
- Aktifkan logging untuk melacak permintaan
- Periksa konfigurasi mode dan model
- Verifikasi context yang digunakan

## Contoh Penggunaan

### Contoh 1: Chat Sederhana
```javascript
// Menggunakan mode default
const response = await nocli.chat({
  message: "Jelaskan tentang AI",
  mode: "default"
});
```

### Contoh 2: Analisis Kompleks
```javascript
// Menggunakan mode SuperMax untuk tugas kompleks
const analysis = await nocli.chat({
  message: "Analisis data ini secara mendalam",
  mode: "supermax",
  model: "advanced-analyzer"
});
```

### Contoh 3: Prototyping Cepat
```javascript
// Menggunakan mode LowFast untuk iterasi cepat
const prototype = await nocli.chat({
  message: "Buatkan prototipe untuk fitur X",
  mode: "lowfast",
  model: "prototype-generator"
});
```

## Security Considerations

1. **Data Privacy**: Semua data diproses secara lokal
2. **Authentication**: Sistem otentikasi yang aman
3. **Rate Limiting**: Perlindungan terhadap abuse
4. **Input Validation**: Validasi input untuk mencegah injection

## Future Enhancements

- [ ] Integrasi dengan provider eksternal (opsional)
- [ ] Sistem plugin untuk extend functionality
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Collaborative features

## License

Nocli AI adalah software proprietary. Semua hak cipta dilindungi.

## Kontak

Untuk pertanyaan dan dukungan, hubungi:
- Email: support@nocli.ai
- Website: https://nocli.ai
- Documentation: https://docs.nocli.ai
