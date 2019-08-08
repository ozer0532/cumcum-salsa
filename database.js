// Buatlah kelas berisi Nama, Jumlah pesanan, Alamat, Kontak telepon, Bubble wrap, Harga total, Pembayaran, dan Kode pemesanan
// Kelas tersebut harus ada fungsi insert, serta fungsi get berdasarkan id

class Database {
	constructor(userId) {
		this.userId = userId;
		this.nama = "";
		this.jumlah = 0;
		this.alamat = "";
		this.kontak = "";
		this.wrap = false;
		this.transfer = "";
		this.total = 0;
		this.step = 0;
	}

	log(){
		console.log(this.userId);
		console.log(this.nama);
		console.log(this.jumlah);
		console.log(this.alamat);
		console.log(this.kontak);
		console.log(this.wrap);
		console.log(this.transfer);
		console.log(this.total);
	}
}

module.exports = {
    Database: Database
}