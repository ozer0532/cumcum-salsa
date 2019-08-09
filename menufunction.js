// Disetiap fungsi, reply pengguna dengan pesan yang sesuai :)
// Gunakan context.reply([ListPesanJSON])

async function produk (context) {

	await context.reply([
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

	await context.reply([
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
    
    await context.reply([
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
    await context.reply([
		{
		  "type": "text",
		  "text": "Halo! Jika ada yang ingin ditanyakan langsung, kamu  dapat mengontak line Customer Service Cumcum Salsa dengan detil kontak:\n\nLine id : CSCumcumSalsa\nWhatsapp: 082903984891"
		}
	]);
}

async function menuadmin (context, daftar_pesanan) {
	await showRichMenu(context);
		
	var action_json =
	{
      "type": "message",
      "label": "Action 1",
      "text": "Action 1"
    }
    var column_json = 
    {
      "title": "Title",
	  "text": "Text",
	  "actions": []
    }
	var final_json =
	{
	  "type": "template",
	  "altText": "this is a carousel template",
	  "template": {
	    "type": "carousel",
	    "actions": [],
	    "columns": []
	  }
	}

	if (context.event.message.text == "Belum Proses") {
		for (var i = 0; i < min(10, daftar_pesanan.length); i++){
			if (daftar_pesanan[i].status == 0){
				column_json.title = dataPesan[i].nama;
				column_json.text = dataPesan[i].jumlah + "box, akan dikirim ke " + dataPesan[i].alamat;
				action_json.label = "Proses Barang";
				action_json.text = "Proses Barang";
				column_json.actions.push(action_json);
				final_json.columns.push(column_json);
			}
		}
	} else if (context.event.message.text == "Sedang Proses") {
		for (var i = 0; i < min(10, daftar_pesanan.length); i++){
			if (daftar_pesanan[i].status == 1){
				column_json.title = dataPesan[i].nama;
				column_json.text = dataPesan[i].jumlah + "box, akan dikirim ke " + dataPesan[i].alamat;
				action_json.label = "Kirim Barang";
				action_json.text = "Kirim Barang";
				column_json.actions.push(action_json);
				final_json.columns.push(column_json);
			}
		}
	} else if (context.event.message.text == "Sedang Kirim") {
		for (var i = 0; i < min(10, daftar_pesanan.length); i++){
			if (daftar_pesanan[i].status == 2){
				column_json.title = dataPesan[i].nama;
				column_json.text = dataPesan[i].jumlah + "box, sedang dikirim ke " + dataPesan[i].alamat;
				column_json.actions.push(action_json);
				final_json.columns.push(column_json);
			}
		}
	} else {
		final_json = {
		  "type": "text",
		  "text": "Silakan pilih menu di bawah, atau ketik:\n - Belum Proses\n - Sedang Proses\n - Sedang Kirim\nuntuk melihat data pemesan."
		}
	}

	await context.reply([
		final_json
	]);
}

async function showRichMenu (context) {
	await context.reply([
		{
		  "size": {
		    "width": 2500,
		    "height": 843
		  },
		  "selected": true,
		  "name": "AdminConsole",
		  "chatBarText": "Bulletin",
		  "areas": [
		    {
		      "bounds": {
		        "x": 13,
		        "y": 13,
		        "width": 1216,
		        "height": 1220
		      },
		      "action": {
		        "type": "message",
		        "text": "Sedang Proses"
		      }
		    },
		    {
		      "bounds": {
		        "x": 1271,
		        "y": 17,
		        "width": 1212,
		        "height": 1203
		      },
		      "action": {
		        "type": "message",
		        "text": "Sedang Kirim"
		      }
		    }
		  ]
		}
	]);
}

module.exports = {
    produk: produk,
    faq: faq,
    testimoni: testimoni,
    kontak: kontak
}