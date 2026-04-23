import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({
    origin: '*'
}));
app.use(express.json());

const SYSTEM_PROMPT = `Kamu adalah parser transaksi keuangan.
User akan input kalimat bebas bahasa Indonesia.
Return HANYA JSON dengan format:
{
  "valid": true atau false,
  "type": "income" atau "expense",
  "amount": angka dalam rupiah,
  "category": string singkat,
  "description": string
}

Aturan menentukan type:
- "income" = uang MASUK ke kamu (terima pembayaran, dp, gaji, bonus, transfer masuk)
- "expense" = uang KELUAR dari kamu (beli sesuatu, bayar sesuatu, transfer keluar)

Contoh:
- "terima dp projek 500rb" → type: "income"
- "beli kopi 15000" → type: "expense"
- "client transfer 2jt" → type: "income"
- "bayar hosting 100rb" → type: "expense"

Jika bukan transaksi keuangan, return { "valid": false }.
Jangan tambahkan teks apapun selain JSON.`;

function extractAmount(text) {
    const match = text.match(/\d+/);
    return match ? parseInt(match[0]) : null;
}

app.get('/', (req, res) => {
    res.send('API is running');
});

// endpoint API
app.post('/api/agent', async (req, res) => {
    console.log('kena hit!', req.body);
    try {
        const userInput = req.body.input;

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: userInput },
                ],
            }),
        });

        const data = await response.json();

        const rawText = data.choices[0].message.content;
        const clean = rawText.replace(/```json|```/g, '').trim();
        let parsed;
        try {
            parsed = JSON.parse(clean);
        } catch {
            return res.json({ valid: false });
        }

        const realAmount = extractAmount(userInput);
        if (realAmount) {
            parsed.amount = realAmount
        };

        res.json(parsed);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server jalan di port ${PORT}`);
});