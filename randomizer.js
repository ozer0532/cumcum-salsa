// Gunakan fungsi ini untuk mengoutput string dengan 4 karakter random
// Ingat untuk cek availability string tersebut di database

async function string() {
  // List huruf kapital
  let setKapital = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randoms = '';

  // Looping 4x untuk mendapatkan empat huruf
  for (let i = 0; i < 4; i++) {
    //   Math.random menghasilkan nilai desimal (0-1),
    //   kalikan dengan banyaknya jumlah huruf,
    //   lalu dibulatkan kebawah
    let random = Math.floor(Math.random() * setKapital.length);

    // Mengambil satu huruf
    randoms += setKapital.substring(random, random + 1);
  }
  return randoms;
}
