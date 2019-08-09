# Bot Line Cumcum Salsa
Bot line cumcum salsa akan memudahkan proses order cumcum salsa secara online melalui platform chatting Line

## Getting Started
Ikuti langkah-langkah di bawah untuk menjalankan Line Bot di perangkat anda.

### Prerequisites
#### Windows/Mac/Linux
````
1. Line Bot Designer (https://developers.line.biz/en/services/bot-designer/)
2. Node.JS (https://nodejs.org/en/)
3. Bottender (bottender.js.org/docs/GettingStarted)
4. Ngrok (https://ngrok.com/download)
5. Github Desktop / Git Bash (https://desktop.github.com/) (https://git-scm.com/downloads)

Setelah install, jangan lupa untuk meng-clone repository git ke local storage
````

#### Android / iPhone
````
Install Line pada perangkat yang ingin mencoba Line Bot
````

### Installing
#### Windows/Mac/Linux
Install Line Bot Designer
````
run LINE Bot Designer Setup 1.2.0.exe
````
Install Node.JS
````
run node-v10.16.1-x64.msi
````
Install Bottender
````
run command npm install -g bottender
````
Install ngrok
````
unzip ngrok.zip and taruh di folder bot
*langkah ini bisa dilewatkan karena ngrok sudah disediakan pada repository
````
Install Github Desktop / Git Bash
````
1. run GitHubDesktopSetup.exe or Git-2.22.0-64-bit.exe
2. clone repository ini (https://github.com/ozer0532/cumcum-salsa.git) ke local storage
````

#### Android / iPhone
Download dan install Line
````
Buka Play Store atau App Store untuk mendownload dan menginstall aplikasi Line
````

### Features Testing
#### Menjalankan Line Bot
```
1. Pastikan ngrok sudah berjalan di port yang seharusnya (http 5000) dan webhook url bot sudah dikonfigurasi sesuai ngrok
2. Jalankan command npm run dev pada command prompt terpisah di folder cumcum-salsa
3. Add @118jndpb (Cumcum) / @545foyu (Cumcum2) / @112zlxni (Cumcum3) pada device Line yang ingin mencoba bot
Bot yang di-add disesuaikan pada kapabilitas menerima pesan, jika bot pertama sudah tidak bisa mengirim dan menerima pesan karena
limitasi bulanan, disarankan add bot kedua ataupun ketiga. Hal ini dapat diketahui pada console cmd saat bot berjalan.
4. Jika sudah muncul Greeting Message dan Menu Carousel berarti Line Bot sudah berjalan
```

#### Membuka Menu
````
Kirim pesan "Menu" pada Line Bot untuk memunculkan kembali Menu Carousel yang dapat dipilih
````

#### Pesan
```
1. Pilih menu Pesan pada Menu Carousel
2. Isi data-data yang diperlukan
3. Jika data salah, akan ada pilihan untuk mengganti saat konfirmasi akhir.
4. Jika data sudah dikonfirmasi benar, data akan disubmit ke akun admin Cumcum Salsa untuk didata
```

#### Produk
```
Pilih menu Produk pada Menu Carousel
```

#### FAQ
```
Pilih menu FAQ pada Menu Carousel
```

#### Testimoni
```
Pilih menu Testimoni pada Menu Carousel
```

#### Kontak
```
Pilih menu Kontak pada Menu Carousel
```

## Tools, Library and Reference
* [Line Bot Designer](https://developers.line.biz/en/services/bot-designer/) - untuk implementasi awal
* [Node.JS](https://nodejs.org/en/) - untuk install bottender dan compiler javascript
* [Bottender](http://bottender.js.org/docs/GettingStarted) - platform pembuatan bot
* [Ngrok](https://ngrok.com/download) - web service dan webhook gratis ke line bot
* [bottender.js.org](https://bottender.js.org/docs/APIReference-LineContext) - referensi fitur-fitur bottender khususnya untuk line bot
* [Notion](https://www.notion.so/Line-Bot-19f68b9a527248d2b7352788c8981076) - layouting line bot

## Contributing
Terdapat log act yang mencantumkan kontribusi kami masing-masing dalam proyek ini.

## Versioning
Kami menggunakan github untuk version control, serta pertemuan langsung secara tatap muka.

## PIC
* **Adi Hendro** - PJ Line Bot Kelompok 2 - [adihendro](https://github.com/adihendro)

cek [kontributor](https://docs.google.com/document/d/1liWSbPbjdCybE40tjTHKcpNfbiDAxUY-/edit#) untuk lebih lengkapnya.

## Acknowledgements
* Line Bot ini dibuat untuk memenuhi tugas SPARTA 2018 sebagai MVP dari tugas Tech Consultant Milestone 2

