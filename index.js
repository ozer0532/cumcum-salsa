// Dependencies
const { LineBot, LineHandler } = require('bottender');
const { createServer } = require('bottender/express');
const { Line, LineClient } = require('messaging-api-line');

const config = require('./bottender.config.js').line;

const { produk, faq, testimoni, kontak } = require('./menufunction.js');
const { sudahFixed, sedangPacking, sedangPengiriman } = require('./clientpushmessage.js');
const { pesan } = require('./pesan.js');
const { randomString } = require('./randomizer.js');
const { Database } = require('./database.js');

const replyAPI = new LineBot({
  accessToken: config.accessToken,
  channelSecret: config.channelSecret,
});
const pushAPI = LineClient.connect({
  accessToken: config.accessToken,
  channelSecret: config.channelSecret,
});

const adminUser = "";

// Berisi data pemesanan user
daftar_pesanan = [];

// Main Process
const MainHandler = new LineHandler()
  .onText(async context => {
    let userId = context.event.source.userId;
    let dataPesan = null;
    for(var i = 0; i < daftar_pesanan.length; i++){
      if(daftar_pesanan[i].userId === userId){
        dataPesan = daftar_pesanan[i];
        
        console.log("Eh ketemu, ada di list ke" + i);
        dataPesan.log();
      }
    }
    if (dataPesan == null){
      dataPesan = new Database(userId);
      daftar_pesanan.push(dataPesan);

      console.log("Tidak ditemukan data dengan userId: " + userId);
      console.log("Dibuat database baru dengan:");
      dataPesan.log();
    }
    
    if (userId == adminUser) {
    //kodeahsjdahd
    if (context.event.message.text == "Sedang Proses") {
      
    }
    //
    pushAPI.push(adminUser, [{
      "type": "template",
      "altText": "this is a carousel template",
      "template": {
        "type": "carousel",
        "actions": [],
        "columns": [
          {
            "text": "Ubah Status Pesanan",
            "actions": [
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
    }])
    } else {
      if (dataPesan.step == 0) {
        if (context.event.message.type == "text") {
          if (context.event.message.text == "Pesan") {
            dataPesan = await pesan(context, dataPesan);
          } else if (context.event.message.text == "Produk") {
            await produk(context);
            await context.push([menuCarousel]);
          } else if (context.event.message.text == "FAQ") {
            await faq(context);
            await context.push([menuCarousel]);
          } else if (context.event.message.text == "Testimoni") {
            await testimoni(context);
            await context.push([menuCarousel]);
          } else if (context.event.message.text == "Kontak") {
            await kontak(context);
            await context.push([menuCarousel]);
          } else {
            // Invalid command message
            await context.sendText("Terima kasih telah menggunakan Line bot ini. Saat ini kami tidak dapat memproses perintah tersebut. Silahkan memilih salah satu perintah dibawah ini!");
            await context.push([menuCarousel]);
          }
        }
      } else {
        console.log(dataPesan.nama);
        dataPesan.log();
        dataPesan = pesan(context, dataPesan);
      }
    }
  })
  .onFollow(async context => {
    await context.push([
      {
        "type": "text",
        "text": "Haloo! Selamat datang di Line Bot Cumcum Salsa!\nSilahkan menggunakan layanan yang kami sediakan di bot ini dengan cara mengklik salah satu menu di bawah.\n\nKamu dapat mengetik \"Menu\" tanpa tanda petik untuk melihat pesan ini lagi."
      },
      menuCarousel
    ]);
  })
  .onJoin(async context => {
    await context.sendText('Terima kasih telah menggunakan Line Bot Cumcum Salsa. Untuk saat ini, bot ini tidak dapat digunakan pada grup ataupun di multi-person chat. Bot ini akan meninggalkan grup/chat ini');
    await context.leave();
  })
  .onEvent(async context => {
    await context.sendText("Terima kasih telah menggunakan Line bot ini. Saat ini kami tidak dapat memproses pesan tersebut. Silahkan memilih salah satu perintah dibawah ini!");
    await context.push([menuCarousel]);
  })

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


// Connection Handling
replyAPI.onEvent(MainHandler);

const server = createServer(replyAPI);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
