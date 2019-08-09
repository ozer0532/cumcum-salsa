// Gunakan pushAPI.push(userID, [ListPesanJSON]) untuk mengirimkan pesan ke user tersebut

async function sudahFixed (pushAPI, userID, dataPesan) {
  console.log("NIH MAMAM FIX");
  dataPesan.log();
  console.log(userID);
await pushAPI.push(userID, [{
    "type": "text",
    "text": "[FIXED]\nNama pemesan : " + dataPesan.nama + "\nJumlah pesanan : " + dataPesan.jumlah + "\nAlamat tujuan : " + dataPesan.alamat + "\nKontak pemesan : " + dataPesan.kontak + "\nPakai bubble wrap? : " + dataPesan.wrap + "\nHarga total : Rp " + dataPesan.total + "\nPilihan pembayaran : " + dataPesan.transfer + "\nNomor pesanan : " + dataPesan.kode
  }])
}

async function sedangPacking (pushAPI, userID, dataPesan) {
await pushAPI.push(userID, [{
        "type": "text",
        "text": "Halo " + dataPesan.nama + "!\nPesanan kamu telah dikonfirmasi dan sedang dalam proses packing.\nMohon menunggu 3 - 5 hari kerja untuk pengiriman pesanan.\nTerima kasih telah membeli produk Cumcum Salsa!"
    }])
}

async function sedangPengiriman (pushAPI, userID, dataPesan) {
await pushAPI.push(userID, [{
    "type": "text",
    "text": "Halo " + dataPesan.nama + "!\nPesanan kamu sedang dalam pengiriman.\nNomor resi pengiriman pesanan kamu adalah" + dataPesan.noresi +"\nTerima kasih banyak telah membeli produk Cumcum Salsa."
  }])
}

module.exports = {
    sudahFixed: sudahFixed,
    sedangPacking: sedangPacking,
    sedangPengiriman: sedangPengiriman
}