// Fungsi ini memroses segala pemesanan oleh pengguna, termasuk input dan output
// Fungsi mengambil data state dari database, kemudian memproses data dan mengirimkan pesan.
// Gunakan fungsi-fungsi tambahan dibawah untuk mempermudah pekerjaan

let dataPesan;
async function pesan (context, dp) {
	dataPesan = dp;
	if (dataPesan.step == 0) {
		await pesanNama(context);
		dataPesan.step++;
	} else if (dataPesan.step == 1) {
		await prosesNama(context);
		await pesanJumlah(context);
		dataPesan.step++;
	} else if(dataPesan.step == 2) {
		await prosesJumlah(context);
		await pesanAlamat(context);
		dataPesan.step++;
	} else if (dataPesan.step == 3) {
		await prosesAlamat(context);
		await pesanKontak(context);
		dataPesan.step++;
	} else if (dataPesan.step == 4) {
		await prosesKontak(context);
		await pesanWrap(context);
		dataPesan.step++;
	} else if (dataPesan.step == 5) {
		await prosesWrap(context);
		await pesanTransfer(context);
		dataPesan.step++;
	} else {
		await prosesTransfer(context);
		await pesanKonfirmasi(context);
		dataPesan.step++;
	}
	dataPesan.step = dataPesan.step;
	console.log(dataPesan.step);
	return dataPesan;
}

// Semua fungsi ini mengirim pesan sesuai namanya
async function pesanNama (context) {
	await context.push([
	{
	  "type": "text",
	  "text": "Siapa nama kamu?"
	}
	]);
}

async function pesanJumlah (context) {
	await context.push([
	{
	  "type": "text",
	  "text": "Berapa jumlah Cumcum Salsa yang kamu pesan? (dalam kotak)"
	}
	]);
}

async function pesanAlamat (context) {
	await context.push([
	{
	  "type": "text",
	  "text": "Di mana alamat kamu? Usahakan lengkap dengan RT/ RW dan kode pos ya."
	}
	]);
}

async function pesanKontak (context) {
	await context.push([
	{
	  "type": "text",
	  "text": "Nomor yang bisa kami hubungi untuk pesanan ini?"
	}
	]);
}

async function pesanWrap (context) {
	await context.push([
	{
	  "type": "text",
	  "text": "Apakah kamu mau pakai bubble wrap? (Ya/ Tidak)\nPemakaian tidak dikenakan tambahan biaya."
	}
	]);
}

async function pesanTransfer (context) {
	await context.push([
	{
	  "type": "text",
	  "text": "Untuk harga total yang harus dibayarkan adalah Rp "+ dataPesan.total +" dengan rincian:\nCumcum Salsa x "+ dataPesan.jumlah + " = Rp "+ dataPesan.total-8000 +"\nBiaya pengiriman      = Rp 8000"
	},
	{
	  "type": "text",
	  "text": "Silahkan memilih rekening untuk mentransfer biaya pesanan kamu.\n1. BCA\n2. BNI\n3. BRI"
	}
	]);
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
	  "text": "Nama pemesan : "+ dataPesan.nama +"\nJumlah pesanan : "+ dataPesan.jumlah +"\nAlamat tujuan : "+ dataPesan.alamat +"\nKontak pemesan : "+ dataPesan.kontak +"\nPakai bubble warp? : "+ dataPesan.wrap +"\nHarga total : Rp "+ dataPesan.total +"\nPilihan pembayaran : "+ dataPesan.transfer
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
	dataPesan.nama = context.event.message.text;
}

async function prosesJumlah (context) {
	dataPesan.jumlah = context.event.message.text;
	dataPesan.total = 35000*dataPesan.jumlah + 8000;
}

async function prosesAlamat (context) {
	dataPesan.alamat = context.event.message.text;
}

async function prosesKontak (context) {
	dataPesan.kontak = context.event.message.text;
}

async function prosesWrap (context) {
	dataPesan.wrap = context.event.message.text;
}

async function prosesTransfer (context) {
	dataPesan.transfer = context.event.message.text;
}

async function prosesKonfirmasiBenar (context) {

}

async function prosesKonfirmasiSalah (context) {

}

module.exports = {
    pesan: pesan
}