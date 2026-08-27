Berikut struktur lengkap `soal.js`, plus penjelasan kenapa 2 kesalahan yang harus di hindari supaya ke depannya bisa dihindari.

## 1. Struktur Besar File

```javascript
window.QUIZ_META = {
  title: "...",
  subtitle: "..."
};

window.questionsData = [
  { ... soal 1 ... },
  { ... soal 2 ... },
  // dst
];
```

Cuma ada 2 hal yang didefinisikan: judul kuis (`QUIZ_META`) dan daftar soal (`questionsData`). Keduanya **wajib** ditempel ke `window`, bukan pakai `const`/`let`, karena file ini dimuat lewat `<script src="soal.js">` terpisah dari mesin kuis — kalau pakai `const`, akan bentrok dengan deklarasi lain di scope global (ini yang bikin error "already declared" kemarin).

## 2. Struktur Satu Soal

Setiap item di dalam array `questionsData` adalah object dengan 7 field wajib:

```javascript
{
  id: 1,                              // angka, unik, urut 1,2,3,...
  section: 1,                         // angka, nomor bagian/kategori
  sectionName: "Bagian 1: Nama Bab",  // teks nama bagian (harus sama persis untuk soal 1 section)
  question: "Teks pertanyaan?",       // teks pertanyaan
  options: [                          // array berisi 4 pilihan jawaban
    "Pilihan A",
    "Pilihan B",
    "Pilihan C",
    "Pilihan D"
  ],
  answer: 1,                          // index jawaban benar: 0=A, 1=B, 2=C, 3=D
  discussion: "Penjelasan jawaban."   // teks pembahasan
}
```

| Field | Tipe | Aturan |
|---|---|---|
| `id` | number | Unik, sebaiknya urut 1 sampai N tanpa lompat/duplikat |
| `section` | number | Boleh sama untuk beberapa soal (jadi satu kategori) |
| `sectionName` | string | Harus **identik** (huruf besar/kecil, spasi) untuk semua soal dengan `section` yang sama |
| `question` | string | Teks pertanyaan |
| `options` | array of string | Idealnya 4 pilihan |
| `answer` | number | Index (0-3), bukan teks jawabannya |
| `discussion` | string | Muncul setelah soal dijawab |

## 3. Penyebab Error Kemarin (dan cara menghindarinya)

**Masalah #1 — tanda kutip `"` di dalam string yang juga pakai kutip `"`**

Salah:
```javascript
question: "Seperti `<`, `>`, `&`, `"`, `'`) menjadi...",
```
Ini bikin JavaScript mengira string sudah selesai di kutip ketiga, sisanya jadi kode acak → syntax error.

Benar — kasih backslash `\"` di depan kutip yang ada di dalam:
```javascript
question: "Seperti `<`, `>`, `&`, `\"`, `'`) menjadi...",
```

**Aturan sederhana: kalau di dalam teks soal ada tanda kutip ganda (`"`), selalu tulis `\"` di depannya.**

**Masalah #2 — menulis kode contoh sebagai bagian dari string tanpa disadari membentuk operasi JavaScript**

Salah:
```javascript
question: "...seperti `WHERE username = '" + userInput + "'` berisiko...",
```
Ini terlihat seperti teks biasa, tapi karena ada kutip yang menutup string lalu `+ userInput +`, JavaScript membacanya sebagai **penjumlahan string dengan variabel `userInput`** yang tidak pernah didefinisikan → error.

Benar — kalau maksudnya menampilkan teks kode `$userInput` atau semacamnya sebagai bagian dari kalimat, tulis sebagai teks biasa (bukan variabel nyata), dan escape kutipnya:
```javascript
question: "...seperti `WHERE username = '\" + userInput + \"'` berisiko...",
```
Atau, jauh lebih aman dan gampang dibaca — pakai backtick untuk contoh kode dan hindari simbol `+` di dalam kutipan kalau memang bukan operasi sungguhan:
```javascript
question: "...seperti WHERE username = '<input_user>' berisiko...",
```

## 4. Tips Praktis Supaya Tidak Salah Lagi

1. **Hindari menaruh karakter kutip (`"`) mentah di dalam teks yang menggunakan kutip ganda.** Kalau soal Anda banyak mengandung kode/contoh dengan tanda kutip, lebih aman gunakan backtick (`` ` ``) untuk kode, dan hindari kutip ganda literal sama sekali dalam teks tersebut.
2. **Jangan pernah menulis `" + sesuatu + "` di dalam teks soal**, kecuali Anda memang sengaja melakukan operasi penggabungan string dengan variabel yang benar-benar ada (yang di file soal ini tidak akan pernah terjadi — semuanya harus teks statis).
3. **Setelah edit, cek dulu sebelum dipakai** — kalau Anda punya Node.js terinstall, jalankan ini di folder soal.js:
   ```
   node --check soal.js
   ```
   Kalau ada error sintaks, akan langsung terlihat baris & posisinya, sebelum sempat dibuka di browser.
4. **Pastikan setiap soal diakhiri koma `,`** kecuali soal terakhir dalam array.
5. **`id` tidak boleh ada yang duplikat** — kalau menambah soal baru, lanjutkan angka dari yang terakhir (misal sudah ada 100, soal baru mulai dari 101).
