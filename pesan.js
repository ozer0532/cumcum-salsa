// Fungsi ini memroses segala pemesanan oleh pengguna, termasuk input dan output
// Fungsi mengambil data state dari database, kemudian memproses data dan mengirimkan pesan.
// Gunakan fungsi-fungsi tambahan dibawah untuk mempermudah pekerjaan

const { randomString } = require('./randomizer.js');
const { sudahFixed, sedangPacking, sedangPengiriman } = require('./clientpushmessage.js');
const adminUser = "U6fed2386f03b7f753116b0874fe36c6b";

let dataPesan;
async function pesan (context, dp, pushAPI) {
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
	} else if (dataPesan.step == 7) {
		if (context.event.message.text == "Benar") {
			await context.push([
				{
					"type": "text",
					"text": "Terima kasih telah menggunakan Line Bot Cumcum Salsa!\nDatang kembali!"
				}
			])
			dataPesan.kode = await randomString();
			sudahFixed(pushAPI, adminUser, dataPesan);
			dataPesan.step = 6;
		} else if (context.event.message.text == "Salah") {
			await pesanRubah(context);
			dataPesan.step++;
		} else {
			await context.sendText('Silahkan menjawab dengan "Benar" atau "Salah"')
		}
	} else if (dataPesan.step == 8) {
		if (context.event.message.text == "Nama") {
			await pesanNama(context);
			dataPesan.step = 10;
		} else if (context.event.message.text == "Jumlah") {
			await pesanJumlah(context);
			dataPesan.step = 11;
		} else if (context.event.message.text == "Alamat") {
			await pesanAlamat(context);
			dataPesan.step = 12;
		} else if (context.event.message.text == "Kontak") {
			await pesanKontak(context);
			dataPesan.step = 13;
		} else if (context.event.message.text == "Wrap") {
			await pesanWrap(context);
			dataPesan.step = 14;
		} else if (context.event.message.text == "Transfer") {
			await pesanTransfer(context);
			dataPesan.step = 15;
		} else {
			await context.sendText('Silahkan menjawab dengan "Nama", "Jumlah", "Alamat", "Kontak", "Wrap", atau "Transfer"');
		}
	} else if (dataPesan.step == 10) {
		await prosesNama(context);
		await pesanKonfirmasi(context);
		dataPesan.step = 7;
	} else if (dataPesan.step == 11) {
		await prosesJumlah(context);
		await pesanKonfirmasi(context);
		dataPesan.step = 7;
	} else if (dataPesan.step == 12) {
		await prosesAlamat(context);
		await pesanKonfirmasi(context);
		dataPesan.step = 7;
	} else if (dataPesan.step == 13) {
		await prosesKontak(context);
		await pesanKonfirmasi(context);
		dataPesan.step = 7;
	} else if (dataPesan.step == 14) {
		await prosesWrap(context);
		await pesanKonfirmasi(context);
		dataPesan.step = 7;
	} else if (dataPesan.step == 15) {
		await prosesTransfer(context);
		await pesanKonfirmasi(context);
		dataPesan.step = 7;
	} else if (dataPesan.step == 6) {
		await prosesTransfer(context);
		await pesanKonfirmasi(context);
		dataPesan.step++;
	}
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
	  "text": "Berapa kotak Cumcum Salsa yang kamu pesan? (Rp 35.000/kotak)"
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
	  "text": "Untuk harga total yang harus dibayarkan adalah Rp "+ dataPesan.total +" dengan rincian:\nCumcum Salsa x "+ dataPesan.jumlah + " = Rp "+ (dataPesan.total-8000) +"\nBiaya pengiriman      = Rp 8000"
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
		"type": "template",
		"altText": "Apakah data di atas sudah benar? (Benar/Salah)",
		"template": {
			"type": "buttons",
			"actions": [
			{
				"type": "message",
				"label": "Benar",
				"text": "Benar"
			},
			{
				"type": "message",
				"label": "Salah",
				"text": "Salah"
			}
			],
			"title": "Apakah data di atas sudah benar?",
			"text": "Pencet \"Salah\" untuk merubah data"
		}
	}
	]);
}

async function pesanBatal (context) {
	await context.push([
		{
			"type": "text",
			"text": "Pesanan kamu telah dibatalkan."
		}
	]);
}

async function pesanRubah (context) {
	await context.push([
		{
			"type": "template",
			"altText": "Pilih salah satu bagian di bawah ini(Nama/Jumlah/Alamat)",
			"template": {
			  "type": "buttons",
			  "actions": [
				{
				  "type": "message",
				  "label": "Nama",
				  "text": "Nama"
				},
				{
				  "type": "message",
				  "label": "Jumlah",
				  "text": "Jumlah"
				},
				{
				  "type": "message",
				  "label": "Alamat",
				  "text": "Alamat"
				}
			  ],
			  "title": "Bagian mana yang ingin kamu rubah?",
			  "text": "Pilih salah satu bagian di bawah ini"
			}
		  },
		  {
			"type": "template",
			"altText": "Pilih salah satu bagian di bawah ini(Kontak/Wrap/Transfer)",
			"template": {
			  "type": "buttons",
			  "actions": [
				{
				  "type": "message",
				  "label": "Kontak",
				  "text": "Kontak"
				},
				{
				  "type": "message",
				  "label": "Bubble Wrap",
				  "text": "Wrap"
				},
				{
				  "type": "message",
				  "label": "Pilihan Pembayaran",
				  "text": "Transfer"
				}
			  ],
			  "title": "Bagian mana yang ingin kamu rubah?",
			  "text": "Pilih salah satu bagian di bawah ini"
			}
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