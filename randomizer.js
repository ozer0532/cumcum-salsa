// Gunakan fungsi ini untuk mengoutput string dengan 4 karakter random
// Ingat untuk cek availability string tersebut di database

async function string() {
  let charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randoms = '';

  for (let i = 0; i < 4; i++) {
    let random = Math.floor(Math.random() * charSet.length);
    randoms += charSet.substring(random, random + 1);
  }
  return randoms;
}
