import { validateParsed, buildTransaction } from './tools/parser.js';
import 'dotenv/config';

const GROQ_API_KEY = process.env.GROQ_API_KEY;

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

export async function runAgent(userInput) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`,
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
  console.log(data);
  const rawText = data.choices[0].message.content;
  const clean = rawText.replace(/```json|```/g, '').trim();
  const parsed = JSON.parse(clean);

  if (!validateParsed(parsed)) return null;

  return buildTransaction(parsed);
}