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
		if ((dataPesan.nama.length >= 3) && (dataPesan.nama.length < 100)){
			await pesanJumlah(context);
			dataPesan.step++;
		} else {
			await context.sendText('Silahkan isi dengan nama penerima (3-100 karakter)');
		}

	} else if(dataPesan.step == 2) {
		await prosesJumlah(context);
		if (Number.isInteger(dataPesan.jumlah) && (dataPesan.jumlah > 0) && (dataPesan.jumlah <= 100)){
			await pesanAlamat(context);
			dataPesan.step++;
		} else {
			await context.sendText('Silahkan isi dengan sebuah angka antara 1-100');
		}

	} else if (dataPesan.step == 3) {
		await prosesAlamat(context);
		await pesanKontak(context);
		dataPesan.step++;

	} else if (dataPesan.step == 4) {
		await prosesKontak(context);
		if (Number.isInteger(Number(dataPesan.kontak)) && (dataPesan.kontak.length >= 9) && dataPesan.kontak.length <= 13){
			await pesanWrap(context);
			dataPesan.step++;
		} else {
			await context.sendText('Silahkan isi dengan nomor handphone yang valid');
		}

	} else if (dataPesan.step == 5) {
		await prosesWrap(context);
		if ((dataPesan.wrap == "Ya") || (dataPesan.wrap == "Tidak")){
			await pesanTransfer(context);
			dataPesan.step++;
		} else {
			await pesanWrap(context);
		}

	} else if (dataPesan.step == 7) {
		if (context.event.message.text == "Benar") {
			await pesanInfoRekening(context);
			await pesanTerimaKasih(context);
			await pesanMenuAwal(context);
			dataPesan.kode = await randomString();
			sudahFixed(pushAPI, adminUser, dataPesan);
			dataPesan.step = 200;
		} else if (context.event.message.text == "Salah") {
			await pesanRubah(context);
			dataPesan.step++;
		} else {
			await context.sendText('Silahkan menjawab dengan "Benar" atau "Salah"');
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
			dataPesan.step = 6;
		} else {
			await context.sendText('Silahkan menjawab dengan "Nama", "Jumlah", "Alamat", "Kontak", "Wrap", atau "Transfer"');
		}

	} else if (dataPesan.step == 10) {
		await prosesNama(context);
		if ((dataPesan.nama.length >= 3) && (dataPesan.nama.length < 100)){
			await pesanKonfirmasi(context);
			dataPesan.step = 7;
		} else {
			await context.sendText('Silahkan isi dengan nama penerima (3-100 karakter)');
		}

	} else if (dataPesan.step == 11) {
		await prosesJumlah(context);
		if (Number.isInteger(dataPesan.jumlah) && (dataPesan.jumlah > 0) && (dataPesan.jumlah <= 100)){
			await pesanKonfirmasi(context);
			dataPesan.step = 7;
		} else {
			await context.sendText('Silahkan isi dengan sebuah angka antara 1-100');
		}

	} else if (dataPesan.step == 12) {
		await prosesAlamat(context);
		await pesanKonfirmasi(context);
		dataPesan.step = 7;

	} else if (dataPesan.step == 13) {
		await prosesKontak(context);
		if (Number.isInteger(Number(dataPesan.kontak)) && (dataPesan.kontak.length >= 9) && dataPesan.kontak.length <= 13){
			await pesanKonfirmasi(context);
			dataPesan.step = 7;
		} else {
			await context.sendText('Silahkan isi dengan nomor handphone yang valid');
		}

	} else if (dataPesan.step == 14) {
		await prosesWrap(context);
		if ((dataPesan.wrap == "Ya") || (dataPesan.wrap == "Tidak")){
			await pesanKonfirmasi(context);
			dataPesan.step = 7;
		} else {
			await pesanWrap(context);
		}

	} else if (dataPesan.step == 6) {
		await prosesTransfer(context);
		if ((dataPesan.transfer == "BCA") || (dataPesan.transfer == "BNI") || (dataPesan.transfer == "BRI")){
			await pesanKonfirmasi(context);
			dataPesan.step++;
		} else {
			await pesanTransfer(context);
		}
	} else if (dataPesan.step == 200) {
		await prosesTransfer(context);
		if ((dataPesan.transfer == "BCA") || (dataPesan.transfer == "BNI") || (dataPesan.transfer == "BRI")){
			await pesanKonfirmasi(context);
			dataPesan.step++;
		} else {
			await pesanTransfer(context);
		}
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
	  "text": "Berapa jumlah Cumcum Salsa yang ingin kamu pesan? (Harga Rp 35.000 per kotak)"
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
	  "type": "template",
	  "altText": "Pakai bubble wrap? (tidak ada biaya tambahan)\nBalas dengan (Ya/Tidak)",
	  "template": {
	    "type": "confirm",
	    "actions": [
	      {
	        "type": "message",
	        "label": "Ya",
	        "text": "Ya"
	      },
	      {
	        "type": "message",
	        "label": "Tidak",
	        "text": "Tidak"
	      }
	    ],
	    "text": "Pakai bubble wrap? (tidak ada biaya tambahan)"
	  }
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
	  "type": "template",
	  "altText": "Pilih rekening untuk transfer biaya pesanan kamu(BCA/BNI/BRI)",
	  "template": {
	    "type": "carousel",
	    "actions": [],
	    "columns": [
	      {
	        "text": "Pilih rekening untuk transfer biaya pesanan kamu",
	        "actions": [
	          {
	            "type": "message",
	            "label": "BCA",
	            "text": "BCA"
	          },
	          {
	            "type": "message",
	            "label": "BNI",
	            "text": "BNI"
	          },
	          {
	            "type": "message",
	            "label": "BRI",
	            "text": "BRI"
	          }
	        ]
	      }
	    ]
	  }
	}]);
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
		  "altText": "this is a carousel template",
		  "template": {
		    "type": "carousel",
		    "actions": [],
		    "columns": [
		      {
		        "title": "Bagian mana yang ingin kamu ubah?",
		        "text": "Pilih salah satu bagian di bawah ini",
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
		        ]
		      },
		      {
		        "title": "Bagian mana yang ingin kamu ubah?",
		        "text": "Pilih salah satu bagian di bawah ini",
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
		        ]
		      }
		    ]
		  }
		 }
	]);
}

async function pesanInfoRekening (context) {
	await context.sendText("Silakan transfer sejumlah Rp " + dataPesan.total + " ke nomor rekening di bawah ini:");
	if (dataPesan.transfer == "BCA"){
		await context.sendText("BCA 777777777 a.n. UD Salam Sayang");
	} else if (dataPesan.transfer == "BNI"){
		await context.sendText("BNI 555555555 a.n. UD Salam Sayang");
	} else {
		await context.sendText("BRI 333333333 a.n. UD Salam Sayang");
	}
}

async function pesanTerimaKasih (context) {
	await context.sendText("Terima kasih sudah berbelanja menggunakan bot ini.\nSilahkan kirim bukti foto ke CS kami.\nID Line: CSCumcumSalsa");
}

async function pesanMenuAwal (context) {
	await context.push([
      {
        "type": "text",
        "text": "Haloo! Selamat datang di Line Bot Cumcum Salsa!\nSilahkan menggunakan layanan yang kami sediakan di bot ini dengan cara mengklik salah satu menu di bawah.\n\nKamu dapat mengetik \"Menu\" tanpa tanda petik untuk melihat pesan ini lagi."
      },
      menuCarousel
    ]);
}
		

// Semua fungsi yang berhubungan dengan pemrosesan input
async function prosesNama (context) {
	dataPesan.nama = context.event.message.text;
}

async function prosesJumlah (context) {
	dataPesan.jumlah = Number(context.event.message.text);
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

module.exports = {
    pesan: pesan
}

// Daftar pesan yang dapat dikirim
const menuCarousel = {
  "type": "flex",
  "altText": "Flex Message",
  "contents": {
    "type": "carousel",
    "contents": [
      {
        "type": "bubble",
        "direction": "ltr",
        "hero": {
          "type": "image",
          "url": "https://i.imgur.com/BMaCDdl.jpg",
          "align": "center",
          "gravity": "top",
          "size": "full",
          "aspectRatio": "16:9",
          "aspectMode": "cover",
          "backgroundColor": "#FFFFFF"
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "Pesan",
              "size": "xxl",
              "align": "center",
              "weight": "bold",
              "color": "#000000"
            },
            {
              "type": "text",
              "text": "Untuk memesan produk Cumcum Salsa",
              "size": "md",
              "align": "center",
              "gravity": "top",
              "weight": "regular",
              "wrap": true
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "button",
              "action": {
                "type": "message",
                "label": "Pesan",
                "text": "Pesan"
              },
              "color": "#DFAD14",
              "style": "primary"
            }
          ]
        }
      },
      {
        "type": "bubble",
        "direction": "ltr",
        "hero": {
          "type": "image",
          "url": "https://i.imgur.com/PPY2PfZ.jpg",
          "align": "center",
          "gravity": "top",
          "size": "full",
          "aspectRatio": "16:9",
          "aspectMode": "cover",
          "backgroundColor": "#FFFFFF"
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "Produk",
              "size": "xxl",
              "align": "center",
              "weight": "bold",
              "color": "#000000"
            },
            {
              "type": "text",
              "text": "Untuk melihat produk Cumcum Salsa",
              "size": "md",
              "align": "center",
              "gravity": "top",
              "wrap": true
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "button",
              "action": {
                "type": "message",
                "label": "Produk",
                "text": "Produk"
              },
              "color": "#DFAD14",
              "style": "primary"
            }
          ]
        }
      },
      {
        "type": "bubble",
        "direction": "ltr",
        "hero": {
          "type": "image",
          "url": "https://i.imgur.com/HOX2vmO.jpg",
          "align": "center",
          "gravity": "top",
          "size": "full",
          "aspectRatio": "16:9",
          "aspectMode": "cover",
          "backgroundColor": "#FFFFFF"
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "FAQ",
              "size": "xxl",
              "align": "center",
              "weight": "bold",
              "color": "#000000"
            },
            {
              "type": "text",
              "text": "Untuk melihat pertanyaan yang sering ditanyakan",
              "size": "md",
              "align": "center",
              "gravity": "top",
              "wrap": true
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "button",
              "action": {
                "type": "message",
                "label": "FAQ",
                "text": "FAQ"
              },
              "color": "#DFAD14",
              "style": "primary"
            }
          ]
        }
      },
      {
        "type": "bubble",
        "direction": "ltr",
        "hero": {
          "type": "image",
          "url": "https://i.imgur.com/fTxiqmF.jpg",
          "align": "center",
          "gravity": "top",
          "size": "full",
          "aspectRatio": "16:9",
          "aspectMode": "cover",
          "backgroundColor": "#FFFFFF"
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "Testimoni",
              "size": "xxl",
              "align": "center",
              "weight": "bold",
              "color": "#000000"
            },
            {
              "type": "text",
              "text": "Untuk melihat testimoni pelanggan yang puas dengan produk Cumcum Salsa",
              "size": "md",
              "align": "center",
              "gravity": "top",
              "wrap": true
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "button",
              "action": {
                "type": "message",
                "label": "Testimoni",
                "text": "Testimoni"
              },
              "color": "#DFAD14",
              "style": "primary"
            }
          ]
        }
      },
      {
        "type": "bubble",
        "direction": "ltr",
        "hero": {
          "type": "image",
          "url": "https://i.imgur.com/xwmCfFN.jpg",
          "align": "center",
          "gravity": "top",
          "size": "full",
          "aspectRatio": "16:9",
          "aspectMode": "cover",
          "backgroundColor": "#FFFFFF"
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "Kontak",
              "size": "xxl",
              "align": "center",
              "weight": "bold",
              "color": "#000000"
            },
            {
              "type": "text",
              "text": "Untuk mengontak langsung Customer Service CumcumSalsa",
              "size": "md",
              "align": "center",
              "gravity": "top",
              "wrap": true
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "button",
              "action": {
                "type": "message",
                "label": "Kontak",
                "text": "Kontak"
              },
              "color": "#DFAD14",
              "style": "primary"
            }
          ]
        }
      }
    ]
  }
}
