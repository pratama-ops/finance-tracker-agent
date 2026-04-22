const STORAGE_KEY = 'finance_transactions';

export function getTransactions() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveTransaction(tx) {
  const transactions = getTransactions();
  transactions.push(tx);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

export function deleteTransaction(id) {
  const transactions = getTransactions().filter(
    tx => String(tx.id) !== String(id)
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}