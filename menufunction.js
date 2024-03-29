// Disetiap fungsi, reply pengguna dengan pesan yang sesuai :)
// Gunakan context.reply([ListPesanJSON])
const { sudahFixed, sedangPacking, sedangPengiriman } = require('./clientpushmessage.js');
const { Database } = require('./database.js');

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
		  "text": "Cumcum Salsa dengan isian rasa :\n1. Stroberi\n2. Pandan\n3. Coklat\n\nHarga Rp 35.000/ kotak"
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

async function menuadmin (context, daftar_pesanan, pushAPI) {
	var adminUser = context.event.source.userId;
	
	var action_json_template =
	{
      "type": "message",
      "label": "Action 1",
      "text": "Action 1"
    }
    var column_json_template = 
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

	var empty = true;
	if (context.event.message.text == "Belum Proses") {
		for (var i = 0; i < Math.min(10, daftar_pesanan.length); i++){
			console.log(daftar_pesanan[i].step, daftar_pesanan[i].status);
			if ((daftar_pesanan[i].step == 200) && (daftar_pesanan[i].status == 0)){
				empty = false;
				var column_json = JSON.parse(JSON.stringify(column_json_template));
				column_json.title = daftar_pesanan[i].nama;
				column_json.text = daftar_pesanan[i].jumlah + " kotak, akan dikirim ke " + daftar_pesanan[i].alamat;

				var action_json_proses = JSON.parse(JSON.stringify(action_json_template));
				action_json_proses.label = "Proses";
				action_json_proses.text = "Proses " + daftar_pesanan[i].kode;
				column_json.actions.push(action_json_proses);

				var action_json_cek = JSON.parse(JSON.stringify(action_json_template));
				action_json_cek.label = "Cek Detil Pesanan";
				action_json_cek.text = "Cek " + daftar_pesanan[i].kode;
				column_json.actions.push(action_json_cek);

				final_json.template.columns.push(column_json);
			}
		}
	} else if (context.event.message.text == "Sedang Proses") {
		for (var i = 0; i < Math.min(10, daftar_pesanan.length); i++){
			if ((daftar_pesanan[i].step == 200) && (daftar_pesanan[i].status == 1)){
				empty = false;
				var column_json = JSON.parse(JSON.stringify(column_json_template));
				column_json.title = daftar_pesanan[i].nama;
				column_json.text = daftar_pesanan[i].jumlah + " kotak, akan dikirim ke " + daftar_pesanan[i].alamat;

				var action_json_kirim = JSON.parse(JSON.stringify(action_json_template));
				action_json_kirim.label = "Kirim";
				action_json_kirim.text = "Kirim " + daftar_pesanan[i].kode;
				column_json.actions.push(action_json_kirim);

				var action_json_cek = JSON.parse(JSON.stringify(action_json_template));
				action_json_cek.label = "Cek Detil Pesanan";
				action_json_cek.text = "Cek " + daftar_pesanan[i].kode;
				column_json.actions.push(action_json_cek);

				final_json.template.columns.push(column_json);
			}
		}
	} else if (context.event.message.text == "Sedang Kirim") {
		for (var i = 0; i < Math.min(10, daftar_pesanan.length); i++){
			if ((daftar_pesanan[i].step == 200) && (daftar_pesanan[i].status == 2)){
				empty = false;
				var column_json = JSON.parse(JSON.stringify(column_json_template));
				column_json.title = daftar_pesanan[i].nama;
				column_json.text = daftar_pesanan[i].jumlah + " kotak, sedang dikirim ke " + daftar_pesanan[i].alamat;

				var action_json_cek = JSON.parse(JSON.stringify(action_json_template));
				action_json_cek.label = "Cek Detil Pesanan";
				action_json_cek.text = "Cek " + daftar_pesanan[i].kode;
				column_json.actions.push(action_json_cek);

				final_json.template.columns.push(column_json);
			}
		}
	} else {
		empty = false;
		let command = context.event.message.text.split(" ");
		let dataPesan = new Database(adminUser);
		var kodeValid = false;
	    if (command[0] == "Proses"){
	      for(var i = 0; i < daftar_pesanan.length; i++){
	        if(daftar_pesanan[i].kode === command[1]){
				kodeValid = true;
	          dataPesan = daftar_pesanan[i];

	          final_json = {
			    "type": "text",
			    "text": "Berhasil Proses."
			  }
	        }
		  }
		  if (kodeValid){
			  sedangPacking (pushAPI, dataPesan.userId, dataPesan);
		  } else {
			final_json = {
				"type": "text",
				"text": "Kode tidak valid."
			}
		  }
	      dataPesan.status = 1;
	    } else if (command[0] == "Kirim"){
	      for(var i = 0; i < daftar_pesanan.length; i++){
	        if(daftar_pesanan[i].kode === command[1]){
				kodeValid = true;
	          dataPesan = daftar_pesanan[i];

	          final_json = {
			    "type": "text",
			    "text": "Berhasil Kirim."
			  }
	        }
	      }
		  
		  if (kodeValid){
			  sedangPengiriman (pushAPI, dataPesan.userId, dataPesan);
		  } else {
			final_json = {
				"type": "text",
				"text": "Kode tidak valid."
			}
		  }
	      dataPesan.status = 2;
	    } else if (command[0] == "Cek") {
	    	for(var i = 0; i < daftar_pesanan.length; i++){
	      		if(daftar_pesanan[i].kode === command[1]){
					kodeValid = true;
	          		dataPesan = daftar_pesanan[i];

			        await context.sendText("Nama pemesan : " + dataPesan.nama + "\nJumlah pesanan : " + dataPesan.jumlah + "\nAlamat tujuan : " + dataPesan.alamat + "\nKontak pemesan : " + dataPesan.kontak + "\nPakai bubble wrap? : " + dataPesan.wrap + "\nHarga total : Rp " + dataPesan.total + "\nPilihan pembayaran : " + dataPesan.transfer + "\nNomor pesanan : " + dataPesan.kode);

			        final_json = {
						"type": "text",
					    "text": "Berhasil Cek."
					}
				}
	        }
	        if (kodeValid){
			  	
		  	} else {
				final_json = {
					"type": "text",
					"text": "Kode tidak valid."
				}
		  	}

	      } else {
			final_json = {
				"type": "template",
				"altText": "this is a carousel template",
				"template": {
				  "type": "carousel",
				  "actions": [],
				  "columns": [
					{
					  "text": "Cek Daftar Pesanan",
					  "actions": [
						{
						  "type": "message",
						  "label": "Belum Proses",
						  "text": "Belum Proses"
						},
						{
						  "type": "message",
						  "label": "Sedang Proses",
						  "text": "Sedang Proses"
						},
						{
						  "type": "message",
						  "label": "Sedang Kirim",
						  "text": "Sedang Kirim"
						}
					  ]
					}
				  ]
				}
			  }
		}
	}

	console.log(final_json);
	if (empty){
		final_json = {
			"type": "text",
			"text": "Kosong"
		}
	}
	await context.reply([
		final_json
	]);
}

module.exports = {
    produk: produk,
    faq: faq,
    testimoni: testimoni,
	kontak: kontak,
	menuadmin: menuadmin
}