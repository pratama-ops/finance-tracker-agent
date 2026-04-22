import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai@0.15.0";
import { validateParsed, buildTransaction } from './tools/parser.js';

const genAI = new GoogleGenerativeAI('AIzaSyCe28xmhp8pEoulZLPwFf2Z_NZm1MIN03c');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

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
Jika bukan transaksi keuangan, return { "valid": false }.`;

export async function runAgent(userInput) {
    const prompt = `${SYSTEM_PROMPT}\n\nInput user: "${userInput}"`;
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const clean = text.replace(/```json|```/g, '').trim();
    const parse = JSON.parse(clean);

    if(!validateParsed(parse)) return null;

    return buildTransaction(parse);
}