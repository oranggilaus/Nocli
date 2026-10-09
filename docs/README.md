# Nocli AI UI

Selamat datang di **Nocli AI UI** - Alat AI yang menggunakan provider sendiri dengan berbagai fitur canggih.

## Fitur

✨ **Provider AI Sendiri** - Tidak bergantung pada provider eksternal
🎯 **5 Mode AI** - Default, Low, LowFast, Max, SuperMax
🔄 **Switch Model dengan Animasi** - Ganti model dengan drag animation
💬 **Chat Interface** - Antarmuka chat yang intuitif
🎨 **Animasi Context Windows** - Animasi yang menarik untuk context
⚡ **Performa Tinggi** - Optimasi untuk kecepatan dan akurasi

## Mode AI

| Mode | Kecepatan | Akurasi | Resource | Use Case |
|------|----------|---------|----------|----------|
| Default | Medium | High | Medium | Usage sehari-hari |
| Low | Low | Medium | Low | Tugas sederhana |
| LowFast | High | Medium-Low | Low | Prototyping cepat |
| Max | Medium-High | Very High | High | Tugas kompleks |
| SuperMax | High | Maximum | Maximum | Analisis mendalam |

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Installation

```bash
# Clone repository
git clone https://github.com/oranggilaus/Nocli.git

# Masuk ke direktori
cd Nocli

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

### Usage

1. Buka browser ke `http://localhost:3000`
2. Pilih mode AI yang diinginkan
3. Mulai chat dengan AI
4. Ganti model dengan drag animation
5. Nikmati pengalaman AI yang powerful

## Struktur Proyek

```
nocli-ui/
├── src/
│   ├── components/          # Komponen React
│   │   ├── ChatInterface.tsx
│   │   ├── ModelSwitcher.tsx
│   │   ├── ModeSelector.tsx
│   │   ├── ContextWindow.tsx
│   │   └── ...
│   ├── hooks/              # Custom hooks
│   ├── types/              # TypeScript types
│   ├── utils/              # Utility functions
│   ├── styles/             # Styling
│   └── main.tsx            # Entry point
├── docs/                   # Dokumentasi
├── public/                 # Static files
└── package.json            # Dependencies
```

## Komponen Utama

### ChatInterface
Komponen utama untuk berinteraksi dengan AI melalui chat.

### ModelSwitcher
Komponen untuk mengganti model AI dengan animasi drag.

### ModeSelector
Selektor mode AI dengan drag animation (bukan button).

### ContextWindow
Sistem context dengan animasi yang menarik.

## Customization

### Menambahkan Model Baru

```typescript
// Dalam file konfigurasi
const models = {
  ...existingModels,
  newModel: {
    name: "New Model",
    description: "Deskripsi model baru",
    capabilities: ["fitur1", "fitur2"],
    performance: "high"
  }
};
```

### Mengkonfigurasi Mode

```typescript
const modes = {
  default: { speed: "medium", accuracy: "high", resource: "medium" },
  low: { speed: "low", accuracy: "medium", resource: "low" },
  lowfast: { speed: "high", accuracy: "medium-low", resource: "low" },
  max: { speed: "medium-high", accuracy: "very-high", resource: "high" },
  supermax: { speed: "high", accuracy: "maximum", resource: "maximum" }
};
```

## Animasi

### Drag Animation untuk Mode Switch
```typescript
import { motion } from 'framer-motion';

const dragAnimation = {
  initial: { scale: 1 },
  whileDrag: { scale: 1.1, zIndex: 50 },
  onDragEnd: { scale: 1, zIndex: 1 }
};
```

### Context Window Animation
```typescript
const contextAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};
```

## Kontribusi

Kami menyambut kontribusi dari developer lainnya. Silakan buka Pull Request untuk:
- Bug fixes
- Fitur baru
- Peningkatan dokumentasi
- Optimasi performa

## Lisensi

Proyek ini dilisensikan di bawah **MIT License**.

## Kontak

- **Email**: support@nocli.ai
- **GitHub**: [oranggilaus/Nocli](https://github.com/oranggilaus/Nocli)
- **Website**: https://nocli.ai

---

Made with ❤️ by Nocli Team
