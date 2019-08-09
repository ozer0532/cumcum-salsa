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
			if ((daftar_pesanan[i].step == 6) && (daftar_pesanan[i].status == 0)){
				empty = false;
				var column_json = column_json_template;
				column_json.title = daftar_pesanan[i].nama;
				column_json.text = daftar_pesanan[i].jumlah + "box, akan dikirim ke " + daftar_pesanan[i].alamat;

				var action_json = action_json_template;
				action_json.label = "Proses " + daftar_pesanan[i].kode;
				action_json.text = "Proses " + daftar_pesanan[i].kode;
				
				column_json.actions.push(action_json);
				final_json.template.columns.push(column_json);
			}
		}
	} else if (context.event.message.text == "Sedang Proses") {
		for (var i = 0; i < Math.min(10, daftar_pesanan.length); i++){
			if ((daftar_pesanan[i].step == 6) && (daftar_pesanan[i].status == 1)){
				empty = false;
				var column_json = column_json_template;
				column_json.title = daftar_pesanan[i].nama;
				column_json.text = daftar_pesanan[i].jumlah + "box, akan dikirim ke " + daftar_pesanan[i].alamat;

				var action_json = action_json_template;
				action_json.label = "Kirim " + daftar_pesanan[i].kode;
				action_json.text = "Kirim " + daftar_pesanan[i].kode;

				column_json.actions.push(action_json);
				final_json.template.columns.push(column_json);
			}
		}
	} else if (context.event.message.text == "Sedang Kirim") {
		for (var i = 0; i < Math.min(10, daftar_pesanan.length); i++){
			if ((daftar_pesanan[i].step == 6) && (daftar_pesanan[i].status == 2)){
				empty = false;
				var column_json = column_json_template;
				column_json.title = daftar_pesanan[i].nama;
				column_json.text = daftar_pesanan[i].jumlah + "box, sedang dikirim ke " + daftar_pesanan[i].alamat;

				var action_json = action_json_template;
				column_json.actions.push(action_json);
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
	          
	          console.log("Berhasil Proses. Detil Pesanan:");
	          dataPesan.log();

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
	          
	          console.log("Berhasil kirim. Detil Pesanan:");
	          dataPesan.log();

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
	    } else {
			final_json = {
				"type": "text",
				"text": "Silakan pilih menu di bawah, atau ketik:\n - Belum Proses\n - Sedang Proses\n - Sedang Kirim\nuntuk melihat data pemesan."
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