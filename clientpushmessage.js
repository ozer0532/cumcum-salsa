// Gunakan pushAPI.push(userID, [ListPesanJSON]) untuk mengirimkan pesan ke user tersebut

async function sudahFixed (pushAPI, userID, dataPesan) {
	await pushAPI.push(userID, [{
		"type": "text",
		"text": "[Pesanan Baru]\nNama pemesan : " + dataPesan.nama + "\nJumlah pesanan : " + dataPesan.jumlah + "\nAlamat tujuan : " + dataPesan.alamat + "\nKontak pemesan : " + dataPesan.kontak + "\nPakai bubble wrap? : " + dataPesan.wrap + "\nHarga total : Rp " + dataPesan.total + "\nPilihan pembayaran : " + dataPesan.transfer + "\nKode transaksi : " + dataPesan.kode
	}])
}

async function sedangPacking (pushAPI, userID, dataPesan) {
	await pushAPI.push(userID, [{
		"type": "text",
		"text": "Halo " + dataPesan.nama + "!\nPesanan kamu dengan kode transaksi " + dataPesan.kode + " telah dikonfirmasi dan sedang dalam proses packing.\nMohon menunggu 3 - 5 hari kerja untuk pengiriman pesanan.\nTerima kasih telah membeli produk Cumcum Salsa!"
	}])
}

async function sedangPengiriman (pushAPI, userID, dataPesan) {
	await pushAPI.push(userID, [{
		"type": "text",
		"text": "Halo " + dataPesan.nama + "!\nPesanan kamu dengan kode transaksi " + dataPesan.kode + " sedang dalam pengiriman.\nNomor resi pengiriman pesanan kamu adalah" + dataPesan.noresi +"\nTerima kasih banyak telah membeli produk Cumcum Salsa."
	}])
}

module.exports = {
    sudahFixed: sudahFixed,
    sedangPacking: sedangPacking,
    sedangPengiriman: sedangPengiriman
}