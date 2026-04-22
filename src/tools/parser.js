// validasi struktur JSON dari Gemini
export function validateParsed(parse) {
  return (
    parse.valid === true &&
    typeof parse.amount === 'number' &&
    typeof parse.type === 'string' &&
    typeof parse.category === 'string' &&
    typeof parse.description === 'string'
  );
}

// ubah hasil parse jadi object transaksi siap simpan
export function buildTransaction(parse) {
  return {
    id: Date.now().toString(),
    date: new Date().toLocaleDateString('id-ID'),
    type: parse.type,
    amount: parse.amount,
    category: parse.category,
    description: parse.description,
  };
}