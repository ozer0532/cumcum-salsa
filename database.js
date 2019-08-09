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
		this.kode = "";
		this.status = 0;
		this.noresi = "";
	}

	log(){
		console.log("uid: " + this.userId);
		console.log("nama: " + this.nama);
		console.log("qty: " + this.jumlah);
		console.log("alamat: " + this.alamat);
		console.log("kontak: " + this.kontak);
		console.log("wrap: " + this.wrap);
		console.log("trf: " + this.transfer);
		console.log("total: " + this.total);
		console.log("STEP: " + this.step);
		console.log("kode: " + this.kode);
		console.log("status: " + this.status);
		console.log("noresi: " + this.noresi);
		console.log();
	}
}

module.exports = {
    Database: Database
}