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
	}
}

module.exports = {
    Database: Database
}