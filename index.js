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
pemesanan = [];

// Main Process
const MainHandler = new LineHandler()
  .onText(async context => {
    let userId = context.event.source.userId;
    let dataPesan = null; // Isi dengan fungsi get pemesanan dari userId pengguna
    let stepPemesanan = 0; // Isi dengan properti step dari data pemesanan
    if (userId == adminUser) {

    } else {
      if (stepPemesanan == 0) {
        if (context.event.message.type == "text") {
          if (context.event.message.text == "Pesan") {
            await pesan(context, dataPesan);
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
            console.log(context.event.message.text);
          }
        }
      } else {
        pesan(context, dataPesan);
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
