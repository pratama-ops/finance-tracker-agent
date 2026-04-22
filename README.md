# Finance Agent

AI-powered personal finance tracker yang memahami input bahasa natural Indonesia.

**Overview** • **Tech Stack** • **Project Structure** • **Development**

---

## Overview

Finance Agent adalah tools keuangan pribadi berbasis AI yang memungkinkan kamu mencatat pemasukan dan pengeluaran menggunakan kalimat bebas.

Contoh:

* *"terima uang jajan 15000"*
* *"bayar makan 25rb"*

Aplikasi akan:

* Memproses input menggunakan AI (Groq + Llama 3)
* Mengekstrak data transaksi
* Menyimpan ke localStorage
* Menampilkan dalam tabel & summary

⚠️ Sekarang menggunakan **backend Express** untuk menjaga keamanan API key.

---

## Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript (Vanilla ES Modules)

### Backend

* Node.js
* Express.js
* dotenv
* cors

### AI

* Groq API
* Llama 3.1 8B Instant

---

## Project Structure

```
finance-agent/
├── server.js              ← backend (API & AI processing)
├── .env                   ← API key (tidak di-commit)
├── package.json
├── src/
│   └── tools/
│       ├── storage.js     ← localStorage logic
│       └── export.js      ← export CSV
├── views/
│   └── index.html
├── style.css
└── app.js                ← frontend logic (UI & fetch API)
```

---

## Features

* **Natural Language Input**
  Input transaksi dengan bahasa bebas

* **AI Parsing (Backend)**
  Parsing dilakukan di server (lebih aman)

* **Accurate Amount Handling**
  Nominal diambil langsung dari input (anti halusinasi AI)

* **Summary Dashboard**
  Total pemasukan, pengeluaran, dan saldo

* **Persistent Storage**
  Data disimpan di localStorage

* **Delete Transaction**
  Hapus transaksi dengan satu klik

* **Export CSV**
  Download data transaksi

---

## Development

### 1. Clone & Install

```bash
npm install
```

---

### 2. Setup Environment Variable

Buat file `.env`:

```env
GROQ_API_KEY=API_KEY_KAMU
```

⚠️ Jangan commit file ini ke GitHub

---

### 3. Jalankan Backend

```bash
npm run dev
```

atau

```bash
node server.js
```

Server akan berjalan di:

```
http://localhost:3000
```

---

### 4. Jalankan Frontend

Gunakan Live Server (VS Code)
atau:

```bash
npx serve .
```

Akses:

```
http://127.0.0.1:5500
```

---

## API Endpoint

### POST `/api/agent`

Request:

```json
{
  "input": "beli kopi 15000"
}
```

Response:

```json
{
  "valid": true,
  "type": "expense",
  "amount": 15000,
  "category": "Makanan",
  "description": "beli kopi"
}
```

---

## Contoh Input

| Input                     | Output               |
| ------------------------- | -------------------- |
| `terima uang jajan 15000` | income • Rp 15.000   |
| `beli makan 25rb`         | expense • Rp 25.000  |
| `bayar listrik 150k`      | expense • Rp 150.000 |

---

## Catatan Penting

* API key **tidak disimpan di frontend**
* Semua request AI melalui backend
* Gunakan `.env` untuk keamanan

---

## Browser Support

| Browser | Status |
| ------- | ------ |
| Chrome  | Latest |
| Firefox | Latest |
| Safari  | Latest |
| Edge    | Latest |
