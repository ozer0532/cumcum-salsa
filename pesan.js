// Fungsi ini memroses segala pemesanan oleh pengguna, termasuk input dan output
// Fungsi mengambil data state dari database, kemudian memproses data dan mengirimkan pesan.
// Gunakan fungsi-fungsi tambahan dibawah untuk mempermudah pekerjaan
async function pesan (context, dataPesan) {
	if (dataPesan.nama 		== "") 		await pesanNama(context);
	if (dataPesan.jumlah 	== 0) 		await pesanJumlah(context);
	if (dataPesan.alamat 	== "") 		await pesanAlamat(context);
	if (dataPesan.kontak 	== "") 		await pesanKontak(context);
	if (dataPesan.wrap 		== false) 	await pesanWrap(context);
	if (dataPesan.transfer 	== "") 		await pesanTransfer(context);
}

// Semua fungsi ini mengirim pesan sesuai namanya
async function pesanNama (context) {
	await context.push([
	{
	  "type": "text",
	  "text": "Siapa nama kamu?"
	}
	]);
	dataPesan.nama = context.event.message.text;
}

async function pesanJumlah (context) {
	await context.push([
	{
	  "type": "text",
	  "text": "Berapa jumlah Cumcum Salsa yang kamu pesan? (dalam kotak)"
	}
	]);
	dataPesan.jumlah = context.event.message.text;
}

async function pesanAlamat (context) {
	await context.push([
	{
	  "type": "text",
	  "text": "Di mana alamat kamu? Usahakan lengkap dengan RT/ RW dan kode pos ya."
	}
	]);
	dataPesan.alamat = context.event.message.text;
}

async function pesanKontak (context) {
	await context.push([
	{
	  "type": "text",
	  "text": "Nomor yang bisa kami hubungi untuk pesanan ini?"
	}
	]);
	dataPesan.kontak = context.event.message.text;
}

async function pesanWrap (context) {
	await context.push([
	{
	  "type": "text",
	  "text": "Apakah kamu mau pakai bubble wrap? (Ya/ Tidak)\nPemakaian tidak dikenakan tambahan biaya."
	}
	]);
	dataPesan.wrap = context.event.message.text;
}

async function pesanTransfer (context) {
	await context.push([
	{
	  "type": "text",
	  "text": "Untuk harga total yang harus dibayarkan adalah Rp ${2*dataPesan.jumlah+8000} dengan rincian:\nCumcum Salsa x ${dataPesan.jumlah} = Rp ${dataPesan.jumlah}\nBiaya pengiriman    = Rp 8000"
	},
	{
	  "type": "text",
	  "text": "Silahkan memilih rekening untuk mentransfer biaya pesanan kamu.\n1. BCA\n2. BNI\n3. BRI"
	}
	]);
	dataPesan.total = 2*dataPesan.jumlah + 8000;
	dataPesan.transfer = context.event.message.text;
}

async function pesanKonfirmasi (context) {
	// pastikan data sudah benar
	await context.push([
	{
	  "type": "text",
	  "text": "Terima kasih telah mengisi data pesanan kamu.\nBerikut rincian pesanan kamu.\nSilahkan pastikan data pesanan kamu sudah benar."
	},
	// rincian data:
	{
	  "type": "text",
	  "text": "Nama pemesan : ${dataPesan.nama}\nJumlah pesanan : ${dataPesan.jumlah}\nAlamat tujuan : ${dataPesan.alamat}\nKontak pemesan : ${dataPesan.kontak}\nPakai bubble warp? : ${dataPesan.wrap}\nHarga total : Rp ${dataPesan.total}\nPilihan pembayaran : ${dataPesan.transfer}"
	},
	// konfirmasi benar/salah
	{
	  "type": "text",
	  "text": "Terima kasih telah mengisi data pesanan kamu.\nBerikut rincian pesanan kamu.\nSilahkan pastikan data pesanan kamu sudah benar."
	}
	]);
}

// Semua fungsi yang berhubungan dengan pemrosesan input
async function prosesNama (context) {

}

async function prosesJumlah (context) {

}

async function prosesAlamat (context) {

}

async function prosesKontak (context) {

}

async function prosesWrap (context) {

}

async function prosesTransfer (context) {

}

async function prosesKonfirmasiBenar (context) {

}

async function prosesKonfirmasiSalah (context) {

}

module.exports = {
    pesan: pesan
}