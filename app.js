import { saveTransaction, getTransactions, deleteTransaction } from './src/tools/storage.js';
import { exportToCSV } from './src/tools/export.js';

// init
renderTable();
renderSummary();

// event listeners
document.getElementById('btnSend').addEventListener('click', handleInput);
document.getElementById('userInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleInput();
});
document.getElementById('btnExport').addEventListener('click', () => {
  exportToCSV(getTransactions());
});

async function handleInput() {
  const input = document.getElementById('userInput');
  const userText = input.value.trim();
  if (!userText) return;

  setStatus('Memproses...');

  try {
    const BASE_URL = 'https://finance-tracker-agent-production.up.railway.app';
    const res = await fetch(`${BASE_URL}/api/agent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: userText }),
    });

    const parsed = await res.json();

    const transaction = parsed.valid ? parsed : null;

    if (transaction) {
      transaction.date = new Date().toISOString().split('T')[0];
      transaction.id = Date.now().toString();
      saveTransaction(transaction);
      renderTable();
      renderSummary();
      setStatus('Transaksi berhasil ditambahkan.');
    } else {
      setStatus('Input tidak dikenali.');
    }
  } catch (err) {
    console.error(err);
    setStatus('Terjadi error.');
  }

  input.value = '';
}

function renderTable() {
  const transactions = getTransactions();
  const tbody = document.getElementById('txBody');
  const emptyState = document.getElementById('emptyState');
  const txCount = document.getElementById('txCount');

  txCount.textContent = `Menampilkan ${transactions.length} transaksi`;

  if (transactions.length === 0) {
    tbody.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';
  tbody.innerHTML = transactions.map(tx => `
    <tr>
      <td>${tx.date}</td>
      <td>${tx.description}</td>
      <td>${tx.category}</td>
      <td>${tx.type}</td>
      <td>${formatRupiah(tx.amount)}</td>
      <td><button onclick="handleDelete('${tx.id}')">Hapus</button></td>
    </tr>
  `).join('');
}

function renderSummary() {
  const transactions = getTransactions();

  const income = transactions
    .filter(tx => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const expense = transactions
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);

  document.getElementById('totalIncome').textContent = formatRupiah(income);
  document.getElementById('totalExpense').textContent = formatRupiah(expense);
  document.getElementById('totalBalance').textContent = formatRupiah(income - expense);
}

window.handleDelete = function(id) {
  deleteTransaction(id);
  renderTable();
  renderSummary();
}

function setStatus(msg) {
  document.getElementById('agentStatus').textContent = msg;
}

function formatRupiah(amount) {
  return 'Rp ' + amount.toLocaleString('id-ID');
}