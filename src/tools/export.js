export function exportToCSV(transaction) {
    if(transaction.length == 0) {
        alert('Belum ada transaksi untuk di export');
        return;
    }

    //definisikan nama kolom untuk di export
    const header = ['Tanggal', 'Deskripsi', 'Kategori', 'Tipe', 'Jumlah'];

    //mengubah bentuk data supaya bisa di export jadi csv sesuai header yg dibikin
    const rows = transaction.map(tx => [
        tx.date,
        `"${tx.description}"`,
        tx.category,
        tx.type === 'income' ? 'pemasukan' : 'pengeluaran',
        tx.amount,
    ]);

    //menggabungkan header dan row jadi satu string csv
    const csv = [header, ...rows]
    .map(row => row.join(','))
    .join('\n');

    //mengubah string csv jadi file dan bikin url temporary untuk download
    const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    //bikin link download dan trigger klik otomatis
    const a = document.createElement('a');
    a.href = url;
    a.download = `transaksi_${getDateStamp()}.csv`;
    a.click()

    //bersihkan url
    URL.revokeObjectURL(url);
}

//ngambil tanggal hari ini
function getDateStamp() {
    return new Date().toISOString().slice(0, 10);
}