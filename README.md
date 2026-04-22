# Finance Agent
AI-powered personal finance tracker that understands natural language input.

__Overview__ • __Tech Stack__ • __Project Structure__ • __Development__

## Overview
Finance Agent adalah tools keuangan pribadi berbasis AI yang memungkinkan kamu mencatat pemasukan dan pengeluaran menggunakan kalimat bebas bahasa Indonesia. Cukup ketik seperti *"masukkan 50rb pemasukan dari freelance"* atau *"keluar 25000 buat makan siang"*, dan agent akan otomatis memparsing, mencatat, dan menampilkannya dalam tabel yang rapi.

Data tersimpan di localStorage sehingga tidak hilang saat halaman di-refresh, dan bisa diekspor ke CSV kapan saja.

## Tech Stack
- **HTML5** - Semantic markup
- **CSS3** - Custom styles dengan CSS variables
- **JavaScript (ES Modules)** - Vanilla JS tanpa framework
- **Ollama** - Local LLM runner untuk menjalankan model AI secara offline
- **llama3.2** - Model AI yang digunakan untuk parsing natural language
- **External Dependencies:**
  - Google Fonts (Cormorant Garamond, Inter)

## Project Structure

## Features
- **Natural Language Input** — Input transaksi pakai kalimat bebas bahasa Indonesia
- **Auto Parsing** — Agent otomatis ekstrak nominal, kategori, dan tipe transaksi
- **Summary Cards** — Ringkasan total pemasukan, pengeluaran, dan saldo
- **Persistent Storage** — Data tersimpan di localStorage, tidak hilang saat refresh
- **Export CSV** — Export semua transaksi ke file CSV dengan satu klik
- **Responsive** — Tampilan menyesuaikan di desktop maupun mobile
- **Offline** — Berjalan sepenuhnya lokal, tidak perlu koneksi internet setelah setup

## Development

> [!TIP]
> Pastikan Ollama sudah terinstall dan berjalan sebelum membuka aplikasi.

### Setup

1. Install Ollama
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

2. Pull model
```bash
ollama pull llama3.2
```

3. Jalankan Ollama dengan CORS diizinkan
```bash
OLLAMA_ORIGINS=* ollama serve
```

4. Buka `views/index.html` menggunakan Live Server di VS Code atau:
```bash
npx serve .
```
Lalu akses `http://localhost:3000/views/index.html`

### Contoh Input
| Input | Hasil |
|---|---|
| `masukkan 50rb pemasukan freelance` | income • Rp 50.000 • Freelance |
| `keluar 25000 buat makan siang` | expense • Rp 25.000 • Makan |
| `bayar listrik 150k` | expense • Rp 150.000 • Utilitas |

### Browser Support
| Browser | Status |
|---|---|
| Chrome | Latest |
| Firefox | Latest |
| Safari | Latest |
| Edge | Latest |