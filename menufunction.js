// Disetiap fungsi, reply pengguna dengan pesan yang sesuai :)
// Gunakan context.reply([ListPesanJSON])

async function produk (context) {

	context.reply([
		// Produk Greeting
		{
  			"type": "text",
  			"text": "Halo! Berikut produk yang dapat kamu beli dari Cumcum Salsa!"
		},
		// Produk (Image 1)
		{
		  "type": "image",
		  "originalContentUrl": "https://i.imgur.com/p7cgjwV.jpg",
		  "previewImageUrl": "https://i.imgur.com/p7cgjwV.jpg",
		  "animated": false
		},
		// Produk (Detail 1)
		{
		  "type": "text",
		  "text": "Cumcum Salsa dengan isian rasa :\n1. Stroberi\n2. Pandan\n3. Coklat\n4..\n\nHarga Rp 35.000/ kotak"
		}
	]);
}

async function faq (context) {

	context.reply([
		// FAQ Greeting
		{
		  "type": "text",
		  "text": "Halo! Berikut pertanyaan-pertanyaan yang sering diajukan pengunjung Line Bot Cumcum Salsa ini. Siapa tahu ada pertanyaan kamu."
		},
		// FAQ (Questions)
		{
		  "type": "text",
		  "text": "Q = Pertanyaan\nA = Jawaban\n\nQ : Ada berapa varian Cumcum Salsa?\nA : Untuk saat ini terdapat 1 varian Cumcum Salsa.\n\nQ : Untuk pengiriman dilakukan dengan kurir apa?\nA : Pengiriman dilakukan dengan kurir JNE Reguler.\n\nQ : Berapa lama produk akan sampai setelah konfirmasi?\nA : Kira-kira 3 sampai 5 hari.\n\nQ : Apa pengiriman dapat dipercepat?\nA : Untuk pengiriman express dapat mengontak langsung line Customer Service Cumcum Salsa dengan id CSCumcumSalsa."
		},
		// FAQ (Penutup)
		{
		  "type": "text",
		  "text": "Sekian pertanyaan yang sering ditanyakan pengguna bot line Cumcum Salsa. \nJika pertanyaan kamu tidak ada di atas, dapat langsung mengontak line Customer Service Cumcum Salsa dengan id @CSCumcumSalsa."
		}
	]);
}

async function testimoni (context) {
    
    context.reply([
    	// Testimoni Greeting
		{
		  "type": "text",
		  "text": "Halo! Berikut testimoni dari pelanggan-pelanggan yang puas akan produk Cumcum Salsa."
		},
		//Testimoni (Image 1)
		{
		  "type": "image",
		  "originalContentUrl": "https://i.imgur.com/n3m61Hg.jpg",
		  "previewImageUrl": "https://i.imgur.com/n3m61Hg.jpg",
		  "animated": false
		}
	]);
}

async function kontak (context) {

	// Kontak
    context.reply([
		{
		  "type": "text",
		  "text": "Halo! Jika ada yang ingin ditanyakan langsung, kamu  dapat mengontak line Customer Service Cumcum Salsa dengan detil kontak:\n\nLine id : CSCumcumSalsa\nWhatsapp: 082903984891"
		}
	]);
}