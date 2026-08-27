/* =====================================================================
   FILE SOAL — ini satu-satunya file yang perlu diganti kalau mau
   ganti topik kuis. Jangan sentuh file HTML template.

   - QUIZ_META      : judul & subjudul yang tampil di header kuis
   - questionsData  : daftar soal, setiap item WAJIB punya field:
       id            -> nomor urut unik (angka)
       section       -> nomor bagian/kategori (angka)
       sectionName   -> nama bagian yang tampil di dropdown & hasil
       question      -> teks pertanyaan
       options       -> array pilihan jawaban (4 pilihan)
       answer        -> index jawaban benar (0 = pilihan A, 1 = B, dst)
       discussion    -> teks pembahasan yang muncul setelah dijawab
   ===================================================================== */

   window.QUIZ_META = {
    title: "Latihan Soal Keamanan Aplikasi Web",
    subtitle: "100 Soal Interaktif SQL Injection, Autentikasi, & Password Security"
  };
  
  window.questionsData = [
    // SECTION 1: SQL Injection (SQLi) & Proteksi Data
    {
      id: 1,
      section: 1,
      sectionName: "Bagian 1: SQL Injection (SQLi) & Proteksi Data",
      question: "Dalam konteks SQL Injection, mengapa teknik String Concatenation seperti `WHERE username = '\" + userInput + \"'` berisiko fatal meskipun developer telah menerapkan input validation sederhana berbasis regex pada karakter spasi?",
      options: [
        "Penyerang masih dapat memanfaatkan karakter newline, komentar SQL (-- atau /* */), atau tanda kurung untuk memisahkan klausa tanpa membutuhkan karakter spasi.",
        "Database MySQL secara otomatis mengabaikan validasi regex yang dikirimkan melalui protokol HTTP.",
        "String Concatenation akan mengubah tipe data kolom menjadi TEXT secara otomatis saat dieksekusi.",
        "Validasi regex di sisi backend selalu gagal membaca input bertipe UTF-8 dari form HTML."
      ],
      answer: 0,
      discussion: "Bypass validasi spasi pada SQL Injection sangat umum dilakukan dengan mengganti spasi menggunakan komentar SQL (misal: `SELECT/**/username/**/FROM...`) atau karakter kontrol lain, sehingga String Concatenation tetap mengeksekusi payload berpenyusup."
    },
    {
      id: 2,
      section: 1,
      sectionName: "Bagian 1: SQL Injection (SQLi) & Proteksi Data",
      question: "Bagaimana mekanisme Prepared Statement secara teknis mencegah eksekusi payload SQL Injection pada level protokol Database Management System (DBMS)?",
      options: [
        "Mengenkripsi seluruh data yang dikirimkan menggunakan kunci privat yang hanya dimiliki oleh koneksi database.",
        "Memisahkan fase kompilasi/parsing AST (Abstract Syntax Tree) kueri SQL dengan fase pengiriman data parameter, sehingga parameter tidak dapat merusak struktur AST.",
        "Menghapus semua karakter khusus SQL secara otomatis di memori RAM server sebelum kueri dikirimkan.",
        "Mengubah seluruh input pengguna menjadi bilangan bulat (integer) secara otomatis sebelum dieksekusi."
      ],
      answer: 1,
      discussion: "Prepared Statement mengompilasi struktur kueri terlebih dahulu di DBMS. Parameter yang dikirim belakangan hanya dianggap sebagai literal data, bukan token sintaksis yang bisa mengubah struktur Abstract Syntax Tree (AST) kueri."
    },
    {
      id: 3,
      section: 1,
      sectionName: "Bagian 1: SQL Injection (SQLi) & Proteksi Data",
      question: "Di bawah ini manakah kode CakePHP ORM Query Builder yang SANGAT RENTAN terhadap serangan SQL Injection?",
      options: [
        "$articles->find()->where(['title LIKE' => '%' . $userInput . '%']);",
        "$articles->find()->where(['id IN' => $userArray]);",
        "$articles->find()->where([\"status = 'active' AND title = '\" . $userInput . \"'\"]);",
        "$articles->find()->where(['created >=' => new DateTime('now')]);"
      ],
      answer: 2,
      discussion: "Memasukkan variabel `$userInput` secara langsung ke dalam string mentah di dalam array `where()` mematikan fitur parameter binding otomatis CakePHP dan menyebabkan kueri rentan disisipi payload SQL."
    },
    {
      id: 4,
      section: 1,
      sectionName: "Bagian 1: SQL Injection (SQLi) & Proteksi Data",
      question: "Mengapa penggunaan ORM (seperti GORM atau CakePHP ORM) TIDAK SEPENUHNYA menjamin aplikasi 100% bebas dari risiko SQL Injection?",
      options: [
        "ORM tidak mendukung koneksi terenkripsi SSL ke database server.",
        "Developer masih bisa menggunakan fitur Raw SQL expression/literal method yang membungkus input mentah tanpa parameter binding.",
        "ORM mengonversi semua perintah kueri menjadi file JSON yang mudah dibaca oleh penyerang.",
        "ORM hanya bekerja pada database PostgreSQL dan tidak efektif pada MySQL."
      ],
      answer: 1,
      discussion: "ORM memberikan perlindungan bawaan untuk method berparameter. Namun, jika developer menggunakan method seperti `$query->where(new QueryExpression(...))` atau raw SQL tanpa bind parameter, celah SQL Injection tetap dapat terjadi."
    },
    {
      id: 5,
      section: 1,
      sectionName: "Bagian 1: SQL Injection (SQLi) & Proteksi Data",
      question: "Seorang peretas mengirimkan payload `' UNION SELECT NULL, table_name FROM information_schema.tables--` pada parameter pencarian. Jenis serangan SQL Injection apakah ini dan apa tujuannya?",
      options: [
        "Blind SQLi berbasis waktu untuk memperlambat respon server.",
        "Error-based SQLi untuk memaksa database mencetak jejak kesalahan (stack trace).",
        "In-band / UNION-based SQLi untuk mengekstraksi skema dan struktur tabel dari database.",
        "Out-of-band SQLi untuk mengeksekusi perintah sistem operasi pada server database."
      ],
      answer: 2,
      discussion: "UNION-based SQL Injection menggabungkan hasil kueri asli dengan kueri tambahan penyerang untuk mengekstraksi data struktur (seperti tabel dan kolom) dari tabel metadata database."
    },
    {
      id: 6,
      section: 1,
      sectionName: "Bagian 1: SQL Injection (SQLi) & Proteksi Data",
      question: "Manakah cara terbaik mengeksekusi Raw SQL pada driver database jika kueri kompleks terpaksa tidak menggunakan abstraksi CakePHP ORM Query Builder?",
      options: [
        "Menggunakan fungsi `eval()` PHP untuk menyaring karakter berbahaya sebelum dieksekusi.",
        "Membuat koneksi PDO baru dan menyambungkan string kueri menggunakan `sprintf()`.",
        "Menggunakan `Connection::execute()` dengan menyertakan placeholder positional (`?`) atau named (`:param`) beserta array parameternya.",
        "Menyimpan kueri ke dalam file `.txt` lalu membacanya secara langsung dari server."
      ],
      answer: 2,
      discussion: "Menggunakan `Connection::execute()` dengan named/positional placeholder memastikan bahwa meskipun menggunakan Raw SQL, kueri tetap dieksekusi melalui teknik parameter binding PDO yang aman."
    },
    {
      id: 7,
      section: 1,
      sectionName: "Bagian 1: SQL Injection (SQLi) & Proteksi Data",
      question: "Apa risiko keamanan terbesar jika nama kolom untuk klausa `ORDER BY` diambil langsung dari query parameter URL (`?sort=...`) tanpa whitelisting?",
      options: [
        "Parameter `ORDER BY` tidak mendukung prepared statement/parameter binding pada kebanyakan DBMS, sehingga rentan disisipi SQL Injection.",
        "Aplikasi akan mengalami kerusakan memori (segmentation fault) pada level PHP.",
        "Database akan otomatis menghapus indeks pada tabel terkait.",
        "Browser korban akan secara otomatis mengeksekusi skrip JavaScript berbahaya."
      ],
      answer: 0,
      discussion: "Nama tabel dan kolom pada klausa `ORDER BY` tidak dapat di-bind sebagai parameter dalam PDO standar. Tanpa metode whitelisting (memvalidasi daftar kolom yang diizinkan), klausa `ORDER BY` rentan terhadap SQLi."
    },
    {
      id: 8,
      section: 1,
      sectionName: "Bagian 1: SQL Injection (SQLi) & Proteksi Data",
      question: "Manakah teknik yang paling efektif digunakan penyerang ketika aplikasi tidak menampilkan data maupun pesan kesalahan SQL sama sekali (Blind SQL Injection)?",
      options: [
        "Mengirimkan payload JavaScript via `alert(document.cookie)`.",
        "Menginjeksikan fungsi penguji kondisi dengan delay waktu seperti `SLEEP()` atau `BENCHMARK()`.",
        "Menggunakan permintaan HTTP DELETE untuk menghapus tabel database secara langsung.",
        "Mengubah ekstensi URL menjadi `.php.bak` untuk mengunduh kode sumber."
      ],
      answer: 1,
      discussion: "Time-based Blind SQL Injection mengukur selisih waktu respon server saat diinjeksikan fungsi penunda waktu (misal `SLEEP(5)`) untuk menebak kebenaran data huruf demi huruf secara inferensial."
    },
    {
      id: 9,
      section: 1,
      sectionName: "Bagian 1: SQL Injection (SQLi) & Proteksi Data",
      question: "Mengapa pembersihan input menggunakan fungsi `addslashes()` atau `mysqli_real_escape_string()` saja dianggap KURANG AMAN dibandingkan Prepared Statement?",
      options: [
        "Fungsi tersebut memakan penggunaan CPU server hingga 100%.",
        "Fungsi escape dapat dibypass jika terdapat perbedaan encoding karakter (seperti GBK / multibyte charset) antara koneksi database dan aplikasi.",
        "Fungsi escape secara otomatis mematikan fitur transaksi pada database.",
        "Fungsi tersebut hanya dapat digunakan pada aplikasi berbasis bahasa Python."
      ],
      answer: 1,
      discussion: "Serangan berbasis multibyte character encoding (misal GBK) dapat mengeksploitasi cara `addslashes()` menyisipkan backslash (`\\`), sehingga backslash dikonsumsi menjadi karakter multibyte dan tanda petik tunggal (`'`) tetap lolos."
    },
    {
      id: 10,
      section: 1,
      sectionName: "Bagian 1: SQL Injection (SQLi) & Proteksi Data",
      question: "Dalam prinsip Least Privilege untuk database, tindakan apa yang harus dilakukan terkait akun database yang digunakan oleh aplikasi backend CakePHP?",
      options: [
        "Memberikan akses `GRANT ALL PRIVILEGES` agar ORM dapat melakukan skema migrasi otomatis kapan saja.",
        "Menggunakan akun `root` database untuk semua koneksi backend agar tidak terjadi kendala izin akses.",
        "Membatasi hak akses akun database aplikasi hanya pada operasi DML (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) dan mencabut hak DDL (`DROP`, `ALTER`).",
        "Mematikan autentikasi password pada server database lokal."
      ],
      answer: 2,
      discussion: "Dengan menerapkan Least Privilege, jika celah SQL Injection tetap terjadi, penyerang tidak akan dapat melakukan tindakan destruktif skema database seperti `DROP TABLE` atau `ALTER USER` karena terhalang hak akses DDL."
    },
    {
      id: 11,
      section: 1,
      sectionName: "Bagian 1: SQL Injection (SQLi) & Proteksi Data",
      question: "Apa bahayanya jika metode `query()` mentah di ORM digunakan dengan mengombinasikan `sprintf('SELECT * FROM users WHERE id = %d', $id)` tetapi variabel `$id` tidak ditransformasi menjadi integer eksplisit?",
      options: [
        "Tidak ada bahaya karena `%d` pada `sprintf` otomatis mengonversi variabel menjadi tipe bilangan bulat (integer).",
        "Jika variabel `$id` berbentuk string bertipe payload, `%d` tetap memaksa konversi ke integer (misal bernilai 0), namun kueri menjadi invalid.",
        "Jika formatter salah ditulis menjadi `%s`, input string mentah dapat disisipkan tanpa sanitasi.",
        "Jawaban B dan C benar."
      ],
      answer: 3,
      discussion: "Penggunaan `sprintf` dengan `%s` rentan SQLi jika input tidak disanitasi. Walaupun `%d` mengasumsikan integer, kesalahan penulisan formatter menjadi `%s` secara tidak sengaja membuka celah eksekusi string SQL mentah."
    },
    {
      id: 12,
      section: 1,
      sectionName: "Bagian 1: SQL Injection (SQLi) & Proteksi Data",
      question: "Manakah di antara jenis tipe data parameter binding PDO berikut yang paling tepat digunakan untuk mengikat nilai boolean pada prepared statement?",
      options: [
        "PDO::PARAM_STR",
        "PDO::PARAM_INT",
        "PDO::PARAM_BOOL",
        "PDO::PARAM_LOB"
      ],
      answer: 2,
      discussion: "Menentukan tipe parameter binding secara presisi menggunakan `PDO::PARAM_BOOL` memastikan nilai yang dikirim dikonversi secara akurat oleh driver database tanpa ada kesalahan penafsiran tipe data."
    },
    {
      id: 13,
      section: 1,
      sectionName: "Bagian 1: SQL Injection (SQLi) & Proteksi Data",
      question: "Bagaimana kueri `SELECT * FROM products WHERE category = :cat` berperilaku jika nilai `:cat` yang dikirimkan oleh parameterized query berisi string `' electronics OR 1=1 '`?",
      options: [
        "Database menampilkan seluruh baris produk dari semua kategori.",
        "Database mencari produk yang kolom kategorinya secara literal bernilai string ' electronics OR 1=1 '.",
        "Database melemparkan eksepsi kerentanan keamanan.",
        "Database berhenti bekerja secara mendadak."
      ],
      answer: 1,
      discussion: "Pada parameterized query, seluruh isi string dikirimkan sebagai operand literal. Database mencarinya secara eksak sebagai string teks, bukan sebagai klausa logika SQL `OR 1=1`."
    },
    {
      id: 14,
      section: 1,
      sectionName: "Bagian 1: SQL Injection (SQLi) & Proteksi Data",
      question: "Mengapa menyimpan prosedur terkompilasi (Stored Procedure) di database tidak secara otomatis membebaskan aplikasi dari celah SQL Injection?",
      options: [
        "Stored Procedure tidak mendukung penggunaan variabel.",
        "Jika di dalam Stored Procedure terdapat eksekusi SQL dinamis (seperti `PREPARE stmt FROM` dengan penggabungan string), SQLi tetap dapat terjadi di dalam database.",
        "Stored Procedure selalu berjalan di luar memori utama database.",
        "Stored Procedure tidak bisa dipanggil melalui bahasa PHP."
      ],
      answer: 1,
      discussion: "Stored Procedure hanya aman jika parameter di dalamnya digunakan secara statis. Jika di dalam kode prosedur terdapat konstruksi SQL dinamis berbasis string concatenation, celah SQL Injection berpindah ke dalam Stored Procedure."
    },
    {
      id: 15,
      section: 1,
      sectionName: "Bagian 1: SQL Injection (SQLi) & Proteksi Data",
      question: "Apa fungsi utama dari fitur log kueri (Database Query Logging) dalam konteks investigasi insiden SQL Injection?",
      options: [
        "Menghapus payload serangan secara otomatis dari tabel database.",
        "Mencatat seluruh teks kueri mentah yang dikirimkan ke database untuk merekonstruksi teknik penyusupan penyerang.",
        "Mematikan koneksi jaringan saat terdeteksi karakter tanda petik tunggal.",
        "Mengubah kata sandi akun database secara berkala."
      ],
      answer: 1,
      discussion: "Query Logging merekam jejak kueri mentah yang masuk ke DBMS, sangat krusial untuk analisis forensik insiden guna mengetahui titik injeksi, waktu kejadian, dan data yang berhasil diakses penyerang."
    },
    {
      id: 16,
      section: 1,
      sectionName: "Bagian 1: SQL Injection (SQLi) & Proteksi Data",
      question: "Manakah dari opsi berikut yang merupakan mekanisme terbaik untuk menangani klausa `IN()` dengan jumlah parameter dinamis pada Prepared Statement?",
      options: [
        "Menggabungkan array elemen menggunakan `implode(',', $array)` langsung ke dalam string kueri tanpa binding.",
        "Membuat placeholder `?` sejumlah elemen array secara dinamis (misal `IN (?, ?, ?)`) lalu mengeksekusi parameter binding untuk setiap elemen.",
        "Mengubah kueri menjadi klausa `LIKE` berbasis wildcard.",
        "Menyimpan array ke dalam cookie browser sebelum dikirimkan ke database."
      ],
      answer: 1,
      discussion: "Penanganan klausa `IN()` yang aman memerlukan pembuatan jumlah placeholder `?` yang sesuai secara dinamis sesuai ukuran array, kemudian mengikat masing-masing variabel secara individual."
    },
    {
      id: 17,
      section: 1,
      sectionName: "Bagian 1: SQL Injection (SQLi) & Proteksi Data",
      question: "Apakah dampak dari pengaturan `PDO::ATTR_EMULATE_PREPARES => true` pada driver PDO MySQL terhadap keamanan aplikasi?",
      options: [
        "Secara penuh meningkatkan keamanan dengan mengenkripsi parameter.",
        "Memaksa PDO melakukan sanitasi string secara lokal di PHP daripada mengirimkan prepared statement sejati ke MySQL server, yang pada versi tua dapat memicu celah bypass.",
        "Mematikan seluruh fungsi koneksi database pada PHP 8.",
        "Menghapus kebutuhan akan penggunaan kata sandi database."
      ],
      answer: 1,
      discussion: "Saat `ATTR_EMULATE_PREPARES` aktif, PDO mensimulasikan prepared statement di tingkat PHP (bukan native server-side prepared statement), yang memiliki keterbatasan analisis sintaksis dibanding server MySQL asli."
    },
    {
      id: 18,
      section: 1,
      sectionName: "Bagian 1: SQL Injection (SQLi) & Proteksi Data",
      question: "Serangan Second-Order SQL Injection terjadi ketika:",
      options: [
        "Penyerang menginjeksikan payload yang langsung dieksekusi pada respon HTTP saat itu juga.",
        "Payload berbahaya disimpan terlebih dahulu di database sebagai data valid, lalu dieksekusi secara tidak aman oleh kueri SQL SECONDARY di lokasi/fitur lain.",
        "Penyerang menyerang dua server database yang berbeda secara bersamaan.",
        "Penyerang menggunakan dua komputer untuk mengirimkan paket data."
      ],
      answer: 1,
      discussion: "Second-Order SQLi terjadi saat data tersimpan (yang berisikan karakter injeksi) diambil dari database dan dimasukkan ke dalam kueri SQL kedua tanpa parameter binding, mengeksekusi payload secara tertunda."
    },
    {
      id: 19,
      section: 1,
      sectionName: "Bagian 1: SQL Injection (SQLi) & Proteksi Data",
      question: "Dalam CakePHP 4.x/5.x, bagaimana cara membuat ungkapan kueri kustom yang kompleks namun tetap aman dari SQL Injection?",
      options: [
        "Memakai `$query->newExpr('custom SQL ' . $val)` tanpa menggunakan pemanggilan fungsi pengikat.",
        "Menggunakan callback fungsi `where()` dengan objek `QueryExpression` dan memanfaatkan parameter binding bawaan.",
        "Menulis variabel langsung di file `config/app.php`.",
        "Menghapus kelas Table dan menggunakan file teks mentah."
      ],
      answer: 1,
      discussion: "Objek `QueryExpression` pada CakePHP menyediakan API untuk mengomposisi ekspresi kueri kompleks sambil secara ketat mempertahankan pengikatan tipe data dan pemisahan parameter."
    },
    {
      id: 20,
      section: 1,
      sectionName: "Bagian 1: SQL Injection (SQLi) & Proteksi Data",
      question: "Di bawah ini, manakah yang merupakan tindakan terbaik jika kueri database Anda harus menerima masukan nama tabel secara dinamis dari user?",
      options: [
        "Melakukan parameter binding pada nama tabel menggunakan `PDO::PARAM_STR`.",
        "Menggunakan Whitelisting kaku di sisi backend (mencocokkan input dengan daftar nama tabel resmi yang diizinkan).",
        "Mengenkripsi nama tabel di sisi browser menggunakan JavaScript.",
        "Menggunakan fungsi `urlencode()` pada nama tabel."
      ],
      answer: 1,
      discussion: "Prepared Statement PDO TIDAK mengizinkan pengikatan nama tabel/kolom sebagai parameter. Oleh karena itu, satu-satunya cara aman untuk masukan nama tabel dinamis adalah dengan teknik Whitelisting kaku."
    },
  
    // SECTION 2: Cross-Site Scripting (XSS) & Content Security Policy (CSP)
    {
      id: 21,
      section: 2,
      sectionName: "Bagian 2: Cross-Site Scripting (XSS) & CSP",
      question: "Apakah perbedaan mendasar antara serangan Stored XSS dan DOM-based XSS dari segi lokasi eksekusi dan alur pemrosesan data?",
      options: [
        "Stored XSS terjadi di server, sedangkan DOM-based XSS terjadi di database.",
        "Stored XSS mengeksekusi payload yang tersimpan di server/database saat HTML dirender, sedangkan DOM-based XSS terjadi sepenuhnya di browser karena skrip client-side memanipulasi DOM menggunakan sumber input yang tidak aman (sink).",
        "DOM-based XSS memerlukan hak akses administrator server, sedangkan Stored XSS tidak.",
        "Tidak ada perbedaan, keduanya adalah nama lain untuk serangan CSRF."
      ],
      answer: 1,
      discussion: "DOM XSS tidak membutuhkan keterlibatan respon server secara langsung dalam memuat payload. Serangan terjadi murni di lingkungan browser (Client-side) akibat pemrosesan JavaScript yang tidak aman dari Source (misal `location.hash`) ke Sink (misal `element.innerHTML`)."
    },
    {
      id: 22,
      section: 2,
      sectionName: "Bagian 2: Cross-Site Scripting (XSS) & CSP",
      question: "Dalam fungsi bawaan CakePHP `h($string)`, mekanisme apa yang sebenarnya dijalankan untuk mengamankan variabel saat dicetak di file Template View?",
      options: [
        "Menghapus seluruh karakter bukan huruf dari variabel.",
        "Mengonversi karakter khusus HTML (seperti `<`, `>`, `&`, `\"`, `'`) menjadi entitas HTML aman (`&lt;`, `&gt;`, dsb.).",
        "Mengenkripsi string menggunakan algoritma AES-256.",
        "Mengubah teks menjadi huruf kapital seluruhnya."
      ],
      answer: 1,
      discussion: "Fungsi `h()` di CakePHP adalah pembungkus (*wrapper*) untuk `htmlspecialchars()`. Ini mengonversi karakter khusus menjadi HTML Entities sehingga browser memperlakukannya murni sebagai data tekstual, bukan elemen tag yang dapat dieksekusi."
    },
    {
      id: 23,
      section: 2,
      sectionName: "Bagian 2: Cross-Site Scripting (XSS) & CSP",
      question: "Di bawah ini, manakah sintaks JavaScript client-side yang beroperasi sebagai DOM XSS 'Sink' berbahaya jika dimasukkan variabel dari `location.search` tanpa sanitasi?",
      options: [
        "element.textContent = userInput;",
        "element.setAttribute('data-id', userInput);",
        "element.innerHTML = userInput;",
        "console.log(userInput);"
      ],
      answer: 2,
      discussion: "Property `.innerHTML` mengevaluasi dan merender string input sebagai elemen HTML/JS aktif. Jika disisipi tag seperti `<img src=x onerror=alert(1)>`, browser akan langsung mengeksekusi JavaScript tersebut."
    },
    {
      id: 24,
      section: 2,
      sectionName: "Bagian 2: Cross-Site Scripting (XSS) & CSP",
      question: "Mengapa mengamankan aplikasi dari XSS HANYA menggunakan teknik sanitasi berbasis 'Blacklisting' (seperti memfilter kata '<script>') terbukti TIDAK EFEKTIF?",
      options: [
        "Penyerang dapat memanfaatkan berbagai vektor alternatif tanpa tag `<script>`, seperti event handler HTML (`<img src=x onerror=...>`, `<svg onload=...>`, `<a href=\"javascript:...\">`).",
        "Kata `<script>` merupakan perintah wajib pada setiap halaman web HTML5.",
        "Blacklisting memakan ruang penyimpanan database hingga dua kali lipat.",
        "Sistem filter Blacklisting akan dimatikan otomatis oleh browser modern."
      ],
      answer: 0,
      discussion: "JavaScript dapat dieksekusi melalui puluhan tag HTML dan atribut event handler lain (SVG, IMG, IFRAME, onload, onerror, onmouseover) serta skema URL `javascript:`, sehingga melarang tag `<script>` saja sangat mudah dibypass."
    },
    {
      id: 25,
      section: 2,
      sectionName: "Bagian 2: Cross-Site Scripting (XSS) & CSP",
      question: "Konfigurasi HTTP Header Content Security Policy (CSP) berikut dirancang untuk melarang eksekusi skrip inline dan hanya mengizinkan skrip dari domain sendiri: `Content-Security-Policy: script-src 'self'`. Apa konsekuensi penerapan header ini?",
      options: [
        "Seluruh perintah `<script>alert(1)</script>` yang ditulis langsung di dalam file HTML akan diblokir oleh browser.",
        "Semua cookie otomatis terhapus dari browser pengguna.",
        "Pengguna tidak dapat mengunduh gambar dari server lokal.",
        "Situs web tidak dapat diakses menggunakan protokol HTTPS."
      ],
      answer: 0,
      discussion: "Directives `script-src 'self'` membatasi sumber eksekusi JavaScript murni hanya dari file `.js` terpisah yang di-host pada origin yang sama, serta memblokir seluruh inline script dan event handler inline secara otomatis."
    },
    {
      id: 26,
      section: 2,
      sectionName: "Bagian 2: Cross-Site Scripting (XSS) & CSP",
      question: "Jika aplikasi Anda harus menerima input berformat Rich Text (HTML) dari WYSIWYG editor, mekanisme sanitasi manakah yang paling aman untuk diterapkan sebelum konten dicetak ke layar?",
      options: [
        "Menggunakan `htmlspecialchars()` pada seluruh input.",
        "Menggunakan pustaka HTML Sanitizer berbasis Whitelist kaku (seperti HTMLPurifier) yang membuang tag dan atribut berbahaya.",
        "Mengubah semua tanda petik menjadi tanda koma.",
        "Menyimpan input dalam format enkripsi Base64 dan memanggil `eval()` di browser."
      ],
      answer: 1,
      discussion: "Untuk mengizinkan subset HTML tertentu (misal `<b>`, `<i>`), `htmlspecialchars()` akan merusak format tampilan. Maka solusi terbaik adalah HTML Sanitizer (seperti HTMLPurifier) yang menyeleksi tag secara whitelist dan membuang atribut eksploitasi."
    },
    {
      id: 27,
      section: 2,
      sectionName: "Bagian 2: Cross-Site Scripting (XSS) & CSP",
      question: "Apa fungsi dari parameter `'unsafe-inline'` pada arahan `script-src` di header Content Security Policy (CSP)?",
      options: [
        "Meningkatkan keamanan aplikasi dari serangan Brute Force.",
        "Mengizinkan eksekusi elemen skrip inline dan event handler HTML, yang sayangnya melemahkan perlindungan CSP terhadap XSS.",
        "Memaksa semua permintaan HTTP beralih ke HTTPS.",
        "Memblokir semua permintaan AJAX lintas domain."
      ],
      answer: 1,
      discussion: "Menambahkan `'unsafe-inline'` memberikan izin kepada browser untuk menjalankan skrip inline. Hal ini secara signifikan menurunkan efektivitas CSP sebagai mitigasi terhadap XSS."
    },
    {
      id: 28,
      section: 2,
      sectionName: "Bagian 2: Cross-Site Scripting (XSS) & CSP",
      question: "Seorang penyerang berhasil menyisipkan payload `<iframe src=\"javascript:alert(document.cookie)\"></iframe>` ke dalam profilnya. Jenis XSS apakah ini jika pengguna lain yang melihat profil tersebut langsung terdampak?",
      options: [
        "Reflected XSS",
        "Stored XSS",
        "DOM-based XSS",
        "Blind CSRF"
      ],
      answer: 1,
      discussion: "Karena payload tersimpan di database (bagian data profil) dan dieksekusi pada browser setiap pengunjung yang membuka halaman profil tersebut, ini adalah klasifikasi Stored (Persistent) XSS."
    },
    {
      id: 29,
      section: 2,
      sectionName: "Bagian 2: Cross-Site Scripting (XSS) & CSP",
      question: "Mengapa teknik Output Encoding / Escaping harus disesuaikan berdasarkan 'Context' lokasi data dicetak pada dokumen HTML?",
      options: [
        "Karena aturan sintaksis HTML parser berbeda di dalam atribut tag, blok `<script>`, klausa CSS, dan body HTML.",
        "Karena browser hanya mendukung enkripsi satu tipe konteks per dokumen.",
        "Karena CakePHP akan crash jika konteks tidak didefinisikan secara manual.",
        "Karena server web Apache mematikan koneksi jika encoding tidak tepat."
      ],
      answer: 0,
      discussion: "Output Escaping bersifat Context-Aware. Melakukan HTML Entity Encoding pada variabel di dalam elemen `<script>var x = 'USER_INPUT';</script>` tidak mencegah penyerang keluar dari string JavaScript (`'; payload; //`). Diperlukan JavaScript Encoding khusus untuk konteks skrip."
    },
    {
      id: 30,
      section: 2,
      sectionName: "Bagian 2: Cross-Site Scripting (XSS) & CSP",
      question: "Dalam penanganan gambar di CakePHP View, manakah sintaks penulisan tautan gambar yang AMAN dari risiko injeksi atribut XSS jika `$userImage` berisi payload `x\" onerror=\"alert(1)`?",
      options: [
        "<img src=\"/uploads/<?= $userImage ?>\">",
        "<?= $this->Html->image('/uploads/' . $userImage) ?>",
        "<img src=<?= $userImage ?>>",
        "<?php echo '<img src=' . $userImage . '>'; ?>"
      ],
      answer: 1,
      discussion: "Helper CakePHP `$this->Html->image()` secara otomatis melakukan escaping pada atribut atribut HTML (termasuk atribut `src` dan `alt`), mencegah pemecahan atribut (*attribute breakout*)."
    },
    {
      id: 31,
      section: 2,
      sectionName: "Bagian 2: Cross-Site Scripting (XSS) & CSP",
      question: "Apa tujuan dari penerapan CSP 'Nonce' (Number Used Once) pada arahan `script-src`?",
      options: [
        "Mengenkripsi seluruh komunikasi database menggunakan angka acak.",
        "Memberikan token acak kriptografis unik per HTTP request pada tag `<script nonce=\"...\">` legal, sehingga skrip buatan penyerang tanpa nonce yang cocok akan diblokir.",
        "Menghapus kebutuhan kata sandi pada alur login pengguna.",
        "Menyimpan ID Sesi di dalam file log lokal."
      ],
      answer: 1,
      discussion: "CSP Nonce memungkinkan eksekusi skrip inline tertentu yang tepercaya jika tag skrip tersebut memiliki atribut `nonce` yang nilainya cocok secara presisi dengan token acak yang dikirimkan server pada HTTP header CSP untuk permintaan tersebut."
    },
    {
      id: 32,
      section: 2,
      sectionName: "Bagian 2: Cross-Site Scripting (XSS) & CSP",
      question: "Celah Reflected XSS paling sering ditemukan pada fitur aplikasi web jenis apa?",
      options: [
        "Form upload file gambar profil bertipe PNG.",
        "Fitur pencarian atau formulir dengan parameter URL GET yang nilainya ditampilkan kembali di halaman respon tanpa sanitasi.",
        "Proses hashing kata sandi di latar belakang.",
        "Penyiapan koneksi WebSocket terenkripsi."
      ],
      answer: 1,
      discussion: "Reflected XSS terjadi saat input yang dikirim dalam request (paling umum query string URL pada fitur pencarian `?q=...`) langsung dipantulkan oleh server ke dalam respon HTML tanpa encoding."
    },
    {
      id: 33,
      section: 2,
      sectionName: "Bagian 2: Cross-Site Scripting (XSS) & CSP",
      question: "Di bawah ini, manakah HTTP Response Header yang digunakan untuk menginstruksikan browser agar mematikan fitur MIME-sniffing yang sering dimanfaatkan untuk mengelabui file unggahan menjadi skrip yang dapat dieksekusi?",
      options: [
        "X-Frame-Options: DENY",
        "X-Content-Type-Options: nosniff",
        "Access-Control-Allow-Origin: *",
        "Strict-Transport-Security: max-age=31536000"
      ],
      answer: 1,
      discussion: "`X-Content-Type-Options: nosniff` memaksa browser untuk secara kaku mematuhi nilai `Content-Type` yang dinyatakan oleh server dan mencegah browser mencoba 'menebak' tipe konten (MIME-sniffing) file sebagai HTML/JS."
    },
    {
      id: 34,
      section: 2,
      sectionName: "Bagian 2: Cross-Site Scripting (XSS) & CSP",
      question: "Mengapa mengisolasi domain tempat file yang diunggah pengguna (*user-uploaded content*) ke sub-domain terpisah (misal `usercontent-example.com`) dapat memitigasi dampak XSS?",
      options: [
        "Sub-domain secara otomatis menghapus seluruh virus dari file gambar.",
        "Sesuai prinsip Same-Origin Policy (SOP), skrip yang berhasil dieksekusi di domain terpisah tidak memiliki akses langsung ke cookie atau DOM dari domain utama aplikasi.",
        "Sub-domain tidak membutuhkan alokasi memori di server.",
        "Browser menolak memuat file gambar dari sub-domain."
      ],
      answer: 1,
      discussion: "Memisahkan konten unggahan ke origin yang berbeda memanfaatkan isole Same-Origin Policy (SOP). Jika file HTML/SVG berbahaya dieksekusi di origin tersebut, skrip penyerang tidak bisa membaca cookie sesi atau token aplikasi utama."
    },
    {
      id: 35,
      section: 2,
      sectionName: "Bagian 2: Cross-Site Scripting (XSS) & CSP",
      question: "Apa yang dilakukan oleh sintaks Javascript `window.location = 'javascript:alert(1)'` jika variabel dimasukkan ke atribut `href` tag `<a>` tanpa validasi skema URI?",
      options: [
        "Browser menganggapnya sebagai alamat domain lokal dan melakukan permintaan HTTP GET.",
        "Browser menolak membuka tautan dan mencetak pesan galat.",
        "Browser mengeksekusi kode JavaScript saat tautan diklik oleh pengguna (XSS via Pseudo-protocol).",
        "Browser otomatis mengunduh file `.js` ke dalam komputer."
      ],
      answer: 2,
      discussion: "Skema `javascript:` adalah pseudo-protocol. Jika dimasukkan ke dalam atribut `href` tag `<a>`, mengklik tautan tersebut akan mengeksekusi payload JavaScript di dalamnya. Sanitasi harus memverifikasi skema (misal hanya izinkan `http:` atau `https:`)."
    },
    {
      id: 36,
      section: 2,
      sectionName: "Bagian 2: Cross-Site Scripting (XSS) & CSP",
      question: "Dalam implementasi CSP, apakah perbedaan antara arahan `Header set Content-Security-Policy` dan `Header set Content-Security-Policy-Report-Only`?",
      options: [
        "Report-Only memblokir serangan dan mengirim laporan ke email administrator.",
        "Report-Only TIDAK memblokir pelanggaran skrip tetapi hanya mengirimkan laporan statistik pelanggaran ke URI yang ditentukan (sangat berguna untuk tahap pengujian).",
        "Report-Only hanya bekerja pada perangkat seluler.",
        "Tidak ada perbedaan teknis di antara keduanya."
      ],
      answer: 1,
      discussion: "`Content-Security-Policy-Report-Only` memungkinkan pengembang menguji kebijakan CSP tanpa merusak fungsionalitas situs. Browser hanya mencatat dan melaporkan pelanggaran kebijakan tanpa menghentikan eksekusi skrip."
    },
    {
      id: 37,
      section: 2,
      sectionName: "Bagian 2: Cross-Site Scripting (XSS) & CSP",
      question: "Bagaimana cara kerja API browser `Trusted Types` dalam mencegah ancaman DOM-based XSS?",
      options: [
        "Menghapus seluruh file skrip buatan pustaka pihak ketiga.",
        "Memaksa data yang disalurkan ke DOM Sinks sensitif (seperti `innerHTML`) untuk dikunci melalui objek terverifikasi (TrustedType) yang diproses oleh aturan kebijakan sanitasi.",
        "Mematikan fungsi tombol klik kanan di browser.",
        "Mengonversi dokumen HTML menjadi bentuk gambar PNG."
      ],
      answer: 1,
      discussion: "Trusted Types membendung DOM XSS dengan melarang penetapan string mentah secara langsung ke DOM Sinks berbahaya. Semua data harus diubah terlebih dahulu menjadi objek `TrustedHTML` yang telah melewati fungsi transformasi yang terdaftar."
    },
    {
      id: 38,
      section: 2,
      sectionName: "Bagian 2: Cross-Site Scripting (XSS) & CSP",
      question: "Mengapa memasukkan variabel dari backend langsung ke dalam blok skrip seperti `<script> var userId = <?= $id ?>; </script>` tetap berisiko XSS meskipun variabel `$id` bertipe angka di database?",
      options: [
        "Karena variabel dalam tag script selalu otomatis diubah menjadi string UTF-16.",
        "Jika variabel kosong atau dimanipulasi di controller menjadi string payload seperti `1; alert(document.cookie)`, struktur sintaks JavaScript terpecah.",
        "Karena PHP tidak bisa mencetak angka di dalam file template.",
        "Karena browser mematikan parsing variabel angka pada dokumen HTML5."
      ],
      answer: 1,
      discussion: "Jika variabel dicetak tanpa enkapsulasi aman (misal `json_encode($id)`), string tak terduga dapat merusak konteks penugasan variabel JavaScript dan menyisipkan perintah JavaScript tambahan."
    },
    {
      id: 39,
      section: 2,
      sectionName: "Bagian 2: Cross-Site Scripting (XSS) & CSP",
      question: "Manakah arahan CSP yang digunakan untuk mengontrol domain mana saja yang boleh memuat situs web Anda di dalam tag `<iframe>` (mencegah Clickjacking)?",
      options: [
        "script-src",
        "style-src",
        "frame-ancestors",
        "font-src"
      ],
      answer: 2,
      discussion: "Arahan `frame-ancestors` pada CSP menentukan parent mana saja yang diizinkan untuk menyisipkan halaman saat ini menggunakan `<frame>`, `<iframe>`, `<object>`, atau `<embed>`, menggantikan peran header legacy `X-Frame-Options`."
    },
    {
      id: 40,
      section: 2,
      sectionName: "Bagian 2: Cross-Site Scripting (XSS) & CSP",
      question: "Apa yang dimaksud dengan Mutation XSS (mXSS)?",
      options: [
        "Serangan XSS yang mengubah kode sumber PHP pada server secara permanen.",
        "XSS yang terjadi ketika parser HTML browser mengubah (*mutate*) string innerHTML yang awalnya 'bersih' saat di-parse menjadi bentuk DOM yang mengaktifkan eksekusi skrip berbahaya.",
        "Serangan XSS yang mengeksploitasi perangkat keras GPU pengguna.",
        "XSS yang dikirimkan melalui protokol Bluetooth."
      ],
      answer: 1,
      discussion: "mXSS terjadi ketika browser mencoba memperbaiki atau menstandarkan markup HTML yang dianggap rusak/tidak valid saat dimasukkan ke DOM. Proses optimasi parser ini secara tidak terduga mengubah string aman menjadi eksekusi skrip aktif."
    },
  
    // SECTION 3: Cross-Site Request Forgery (CSRF) & State Management
    {
      id: 41,
      section: 3,
      sectionName: "Bagian 3: Cross-Site Request Forgery (CSRF)",
      question: "Mengapa permintaan HTTP berjenis `GET` TIDAK BOLEH digunakan untuk mengeksekusi aksi yang mengubah data di server (*state-changing request*) seperti menghapus akun atau mengirim uang?",
      options: [
        "Permintaan GET memakan bandwidth dua kali lipat dibanding POST.",
        "Permintaan GET secara otomatis dilampirkan oleh elemen HTML sederhana (seperti `<img src=\"/logout\">`) dan tidak dilindungi oleh mekanisme standar pertahanan CSRF.",
        "Permintaan GET tidak dapat diproses oleh database server.",
        "Permintaan GET mematikan fungsi enkripsi HTTPS."
      ],
      answer: 1,
      discussion: "Aksi state-changing via GET sangat rentan CSRF karena penyerang dapat memicu permintaan tersebut cukup dengan menyisipkan elemen HTML seperti `<img src=\"https://bank.com/transfer?to=attacker&amount=1000\">` di situs jahat."
    },
    {
      id: 42,
      section: 3,
      sectionName: "Bagian 3: Cross-Site Request Forgery (CSRF)",
      question: "Bagaimana alur verifikasi CSRF Token menggunakan metode Synchronizer Token Pattern pada kerangka kerja web modern?",
      options: [
        "Server menyimpan token acak di sesi pengguna dan menyisipkannya ke dalam form HTML. Saat form dikirim, middleware mencocokkan token dari form request dengan token di sesi.",
        "Browser mengeksekusi dekripsi RSA pada kata sandi pengguna sebelum dikirimkan ke server.",
        "Server mengirimkan email konfirmasi setiap kali form diisi oleh pengguna.",
        "Token CSRF disimpan di dalam LocalStorage browser dan diverifikasi oleh database."
      ],
      answer: 0,
      discussion: "Pada Synchronizer Token Pattern, server membuat nilai rahasia unik per sesi. Penyerang lintas situs tidak dapat membaca token ini karena Same-Origin Policy, sehingga request palsu buatan penyerang akan ditolak karena tidak memiliki token yang valid."
    },
    {
      id: 43,
      section: 3,
      sectionName: "Bagian 3: Cross-Site Request Forgery (CSRF)",
      question: "Dalam CakePHP 4.x/5.x, di manakah tempat terbaik untuk menautkan `CsrfProtectionMiddleware` untuk memastikan seluruh permintaan mutasi data terproteksi?",
      options: [
        "Di dalam file `src/Model/Table/UsersTable.php` pada fungsi `initialize()`.",
        "Di dalam file `src/Application.php` pada antrean `$middlewareQueue`.",
        "Di dalam file `templates/layout/default.php` menggunakan tag skrip.",
        "Di dalam file `config/bootstrap.php` menggunakan variabel global."
      ],
      answer: 1,
      discussion: "`CsrfProtectionMiddleware` pada CakePHP harus didaftarkan di dalam pipeline middleware aplikasi pada `src/Application.php` agar setiap HTTP Request yang masuk difilter sebelum mencapai Layer Controller."
    },
    {
      id: 44,
      section: 3,
      sectionName: "Bagian 3: Cross-Site Request Forgery (CSRF)",
      question: "Perhatikan atribut cookie berikut: `Set-Cookie: session_id=xyz; SameSite=Strict`. Apa efek dari pengaturan `SameSite=Strict` terhadap serangan CSRF?",
      options: [
        "Cookie tidak akan dikirimkan pada SEMUA permintaan yang berasal dari lintas situs (*cross-site request*), bahkan saat pengguna mengklik link navigasi biasa.",
        "Cookie hanya dapat dibaca oleh skrip JavaScript di sisi client.",
        "Cookie akan kadaluarsa otomatis dalam waktu 5 detik.",
        "Cookie diperbolehkan dikirim pada form submit dari domain luar."
      ],
      answer: 0,
      discussion: "`SameSite=Strict` menginstruksikan browser untuk menahan pengiriman cookie jika konteks permintaan berasal dari domain yang berbeda (cross-site), memberikan perlindungan CSRF yang sangat kuat."
    },
    {
      id: 45,
      section: 3,
      sectionName: "Bagian 3: Cross-Site Request Forgery (CSRF)",
      question: "Mengapa aplikasi Single Page Application (SPA) yang mengirim permintaan AJAX (Fetch API/Axios) memerlukan penanganan CSRF Token khusus melalui HTTP Request Header?",
      options: [
        "Karena AJAX tidak bisa menggunakan mekanisme cookie sama sekali.",
        "Karena pemanggilan AJAX tidak secara otomatis memuat elemen `<input type=\"hidden\">` dari form HTML biasa, sehingga token dikirim via header seperti `X-CSRF-Token`.",
        "Karena AJAX hanya mendukung tipe data XML.",
        "Karena browser melarang AJAX melakukan permintaan POST."
      ],
      answer: 1,
      discussion: "Permintaan Fetch/AJAX beroperasi secara terpisah dari render HTML form standar. Aplikasi SPA umumnya membaca token CSRF dari atribut cookie/meta-tag dan melampirkannya ke HTTP Request Header khusus (misal `X-CSRF-Token`)."
    },
    {
      id: 46,
      section: 3,
      sectionName: "Bagian 3: Cross-Site Request Forgery (CSRF)",
      question: "Apakah perbedaan mendasar antara perilaku cookie `SameSite=Lax` dan `SameSite=Strict`?",
      options: [
        "Lax mengizinkan pengiriman cookie pada navigasi tingkat atas (*top-level navigation*) dengan method aman (GET), sedangkan Strict melarangnya.",
        "Lax mengizinkan pengiriman cookie pada permintaan POST dari domain luar, sedangkan Strict melarangnya.",
        "Strict hanya bekerja pada koneksi HTTP tanpa enkripsi.",
        "Lax mematikan fungsi enkripsi sesi di server."
      ],
      answer: 0,
      discussion: "`SameSite=Lax` mengizinkan pengiriman cookie saat pengguna mengklik tautan biasa (GET) yang mengarah ke situs target dari domain luar, namun tetap memblokir pengiriman cookie pada request berbahaya seperti form POST lintas situs."
    },
    {
      id: 47,
      section: 3,
      sectionName: "Bagian 3: Cross-Site Request Forgery (CSRF)",
      question: "Dalam CakePHP, jika Anda membuat form menggunakan `$this->Form->create()`, tindakan apa yang dilakukan FormHelper secara otomatis terkait proteksi CSRF?",
      options: [
        "FormHelper menghapus seluruh cookie di browser.",
        "FormHelper secara otomatis menyisipkan field tersembunyi `_csrfToken` yang berisi token valid yang sesuai dengan sesi pengguna.",
        "FormHelper mengonversi form menjadi enkripsi file PDF.",
        "FormHelper mengirimkan SMS verifikasi ke nomor pengguna."
      ],
      answer: 1,
      discussion: "FormHelper CakePHP terintegrasi langsung dengan proteksi CSRF. Saat `$this->Form->create()` dipanggil, Helper meng-generate elemen `<input type=\"hidden\" name=\"_csrfToken\" value=\"...\">` secara otomatis."
    },
    {
      id: 48,
      section: 3,
      sectionName: "Bagian 3: Cross-Site Request Forgery (CSRF)",
      question: "Apa yang dimaksud dengan pola pertahanan 'Double Submit Cookie' pada mitigasi CSRF?",
      options: [
        "Pengguna diwajibkan melakukan login dua kali berturut-turut.",
        "Server mengirimkan nilai acak sebagai cookie, lalu JavaScript di client membaca cookie tersebut dan mengirimkannya kembali dalam hidden field/header pada request mutasi data untuk dicocokkan di server.",
        "Menyimpan dua file database terpisah khusus untuk menangani sesi.",
        "Mengirimkan dua permintaan HTTP POST secara bersamaan."
      ],
      answer: 1,
      discussion: "Double Submit Cookie adalah metode stateless di mana server tidak menyimpan token di memori sesi. Server memverifikasi apakah token yang dikirim di cookie cocok secara eksak dengan token yang disisipkan di dalam body request/header."
    },
    {
      id: 49,
      section: 3,
      sectionName: "Bagian 3: Cross-Site Request Forgery (CSRF)",
      question: "Di bawah ini, metode HTTP mana yang terklasifikasi sebagai 'Safe Methods' menurut spesifikasi HTTP dan TIDAK BOLEH memicu perubahan status (*state-changing*) di server?",
      options: [
        "POST, PUT, DELETE",
        "GET, HEAD, OPTIONS",
        "POST, PATCH, GET",
        "CONNECT, PUT, TRACE"
      ],
      answer: 1,
      discussion: "Sesuai RFC 7231, metode GET, HEAD, dan OPTIONS dikategorikan sebagai Safe Methods karena hanya bertujuan untuk mengambil data (read-only) tanpa mengubah kondisi data (*state*) pada server."
    },
    {
      id: 50,
      section: 3,
      sectionName: "Bagian 3: Cross-Site Request Forgery (CSRF)",
      question: "Mengapa pemanfaatan header `Origin` atau `Referer` saja dianggap KURANG CUKUP sebagai satu-satunya pertahanan terhadap CSRF?",
      options: [
        "Header tersebut tidak pernah dikirimkan oleh browser apa pun.",
        "Header Referer/Origin dapat dihilangkan oleh pengguna menggunakan kebijakan privasi (Referrer Policy), ekstensi browser, atau kondisi tertentu (misal penurunan HTTPS ke HTTP).",
        "Header tersebut dapat diubah secara bebas oleh form HTML biasa.",
        "Header Referer hanya tersedia pada server operasi Linux."
      ],
      answer: 1,
      discussion: "Meskipun berguna sebagai pertahanan tambahan (Defense-in-Depth), pengecekan Referer/Origin dapat gagal atau tidak hadir akibat konfigurasi privasi browser, proxy corporate, atau kebijakan `Referrer-Policy: no-referrer`."
    },
    {
      id: 51,
      section: 3,
      sectionName: "Bagian 3: Cross-Site Request Forgery (CSRF)",
      question: "Di dalam CakePHP Controller, bagaimana cara mengecualikan aksi spesifik (misalnya webhook endpoint dari Payment Gateway) dari pemeriksaan `CsrfProtectionMiddleware`?",
      options: [
        "Mengubah ekstensi controller menjadi `.txt`.",
        "Menggunakan event `beforeFilter()` atau mengomposisikan alur pemanggilan pada `$middlewareQueue` untuk mengecualikan rute (*route scoping*) webhook tersebut.",
        "Menghapus database transaksi secara berkala.",
        "Mematikan modul PHP cURL."
      ],
      answer: 1,
      discussion: "External Webhooks (seperti pemberitahuan dari Midtrans/Stripe) tidak dapat membawa CSRF token aplikasi Anda. Solusinya adalah mengecualikan rute spesifik webhook tersebut menggunakan fitur route scoping pada middleware CSRF."
    },
    {
      id: 52,
      section: 3,
      sectionName: "Bagian 3: Cross-Site Request Forgery (CSRF)",
      question: "Mengapa kerentanan Cross-Site Scripting (XSS) pada sebuah aplikasi dapat secara otomatis membatalkan seluruh proteksi CSRF Token pada aplikasi tersebut?",
      options: [
        "XSS mematikan koneksi internet pengguna.",
        "Dengan XSS, penyerang dapat menjalankan kode JavaScript di origin korban untuk membaca token CSRF dari DOM/cookie, lalu menyisipkannya ke permintaan palsu.",
        "XSS secara otomatis mengubah kata sandi database server.",
        "CSRF Token akan terbakar dan meledakkan memori browser."
      ],
      answer: 1,
      discussion: "XSS memberikan kontrol eksekusi JavaScript penuh di dalam origin korban. Skrip penyerang dapat melakukan permintaan GET diam-diam untuk membaca token CSRF dari respon HTML, lalu menggunakannya untuk membuat request mutasi data."
    },
    {
      id: 53,
      section: 3,
      sectionName: "Bagian 3: Cross-Site Request Forgery (CSRF)",
      question: "Jika sebuah cookie dibuat dengan `SameSite=None`, persyaratan atribut apa yang WAJIB ditambahkan agar browser modern tidak menolak cookie tersebut?",
      options: [
        "HttpOnly",
        "Secure",
        "Domain=.com",
        "Max-Age=0"
      ],
      answer: 1,
      discussion: "Browser modern menerapkan aturan ketat: Jika `SameSite=None` didefinisikan untuk mengizinkan penggunaan lintas situs, cookie tersebut WAJIB disertai atribut `Secure` (hanya dikirim via HTTPS)."
    },
    {
      id: 54,
      section: 3,
      sectionName: "Bagian 3: Cross-Site Request Forgery (CSRF)",
      question: "Skenario serangan CSRF yang menyasar fitur 'Ubah Alamat Email' pengguna bertujuan utama untuk:",
      options: [
        "Menghapus seluruh file tabel dari server database.",
        "Mengganti email korban menjadi email penyerang, yang kemudian dilanjutkan dengan memicu mekanisme 'Lupa Password' untuk mengambil alih akun.",
        "Mematikan server Apache melalui kelebihan beban paket.",
        "Membaca pesan email pribadi yang ada di HP korban."
      ],
      answer: 1,
      discussion: "Memaksa perubahan alamat email korban via CSRF adalah langkah awal pengambilalihan akun. Setelah email berhasil diubah ke milik penyerang, penyerang cukup meminta reset password ke email baru tersebut."
    },
    {
      id: 55,
      section: 3,
      sectionName: "Bagian 3: Cross-Site Request Forgery (CSRF)",
      question: "Apa yang terjadi jika sebuah aplikasi backend memverifikasi keberadaan CSRF Token dalam request, tetapi TIDAK MEMERIKSA apakah token tersebut cocok dengan ID Sesi pengguna yang sedang login?",
      options: [
        "Sistem aman 100% karena yang terpenting ada token.",
        "Penyerang dapat menggunakan token CSRF valid milik akun penyerang sendiri untuk menyisipkannya ke dalam serangan CSRF yang ditujukan kepada korban.",
        "Browser korban akan menolak mengirimkan form.",
        "Server akan reboot secara otomatis."
      ],
      answer: 1,
      discussion: "Token CSRF harus terikat erat (*cryptographically bound*) dengan sesi pengguna spesifik. Jika server hanya mengecek 'keberadaan token valid', penyerang bisa mendaftar akun sendiri, mengambil token validnya, dan menggunakannya untuk menyerang korban."
    },
    {
      id: 56,
      section: 3,
      sectionName: "Bagian 3: Cross-Site Request Forgery (CSRF)",
      question: "Di antara pilihan berikut, manakah skenario serangan yang TIDAK BISA dicegah oleh proteksi CSRF Token?",
      options: [
        "Penyerang memancing korban mengklik tombol di situs jahat untuk mentransfer dana.",
        "Penyerang yang berada di jaringan WiFi publik melakukan penyadapan paket data unencrypted untuk mencuri data sensitif.",
        "Penyerang mengirimkan elemen `<form action=\"https://bank.com/pay\" method=\"POST\">` dari domain luar.",
        "Penyerang membuat skrip pembuat permintaan otomatis dari situs jahat."
      ],
      answer: 1,
      discussion: "CSRF Token dirancang khusus untuk memverifikasi kesengajaan aksi pengguna lintas origin (*cross-origin request*). CSRF Token tidak melindungi data dari penyadapan jaringan unencrypted (Man-in-the-Middle)."
    },
    {
      id: 57,
      section: 3,
      sectionName: "Bagian 3: Cross-Site Request Forgery (CSRF)",
      question: "Dalam konteks pertahanan CSRF, apa yang dimaksud dengan 'Re-Authentication' (Otentikasi Ulang)?",
      options: [
        "Meminta pengguna memasukkan kembali kata sandi mereka saat melakukan aksi sangat sensitif (seperti mengubah password atau mentransfer dana besar).",
        "Memaksa pengguna mendaftar ulang menggunakan nomor HP baru.",
        "Menghapus cookie browser setiap 5 menit.",
        "Mengganti nama pengguna secara acak."
      ],
      answer: 0,
      discussion: "Meminta Re-Authentication (mengisi kata sandi saat ini) pada tindakan krusial menghentikan CSRF secara mutlak, karena penyerang dari situs luar tidak mengetahui kata sandi pengguna untuk melengkapi payload request."
    },
    {
      id: 58,
      section: 3,
      sectionName: "Bagian 3: Cross-Site Request Forgery (CSRF)",
      question: "Bagaimana cara kerja header custom seperti `X-Requested-With: XMLHttpRequest` dalam memitigasi serangan CSRF dasar?",
      options: [
        "Header tersebut dapat dipasang oleh tag `<form>` HTML biasa.",
        "Browser melarang tag HTML standar (seperti `<form>` atau `<img>`) mengirimkan custom header secara lintas domain tanpa persetujuan preflight CORS.",
        "Header tersebut mengonversi seluruh data request menjadi huruf kapital.",
        "Header tersebut otomatis menghapus semua virus dari komputer pengguna."
      ],
      answer: 1,
      discussion: "Elemen HTML standar tidak dapat mengirimkan custom header. Untuk menambahkan custom header lintas domain, browser wajib melakukan CORS Preflight (`OPTIONS` request). Jika server tidak mengizinkannya, request diblokir."
    },
    {
      id: 59,
      section: 3,
      sectionName: "Bagian 3: Cross-Site Request Forgery (CSRF)",
      question: "Apakah risiko dari mematikan middleware CSRF secara global selama tahap pengujian aplikasi dan lupa mengaktifkannya kembali saat rilis ke server production?",
      options: [
        "Database akan terkunci secara otomatis.",
        "Seluruh fitur mutasi data (POST/PUT/DELETE) aplikasi terbuka lebar terhadap serangan manipulasi lintas situs.",
        "Situs web tidak dapat muncul di halaman pencarian Google.",
        "Ukuran file proyek CakePHP membengkak dua kali lipat."
      ],
      answer: 1,
      discussion: "Mematikan middleware CSRF menghilangkan lapisan verifikasi integritas origin. Semua endpoint aplikasi yang menerima perubahan data menjadi rentan dieksploitasi oleh situs jahat luar."
    },
    {
      id: 60,
      section: 3,
      sectionName: "Bagian 3: Cross-Site Request Forgery (CSRF)",
      question: "Manakah dari teknologi berikut yang memanfaatkan prinsip Stateless CSRF protection tanpa perlu menyimpan state token di RAM server?",
      options: [
        "Synchronizer Token Pattern",
        "Encrypted Token Pattern / Double Submit Cookie Pattern",
        "File-based Session Storage",
        "PHP Native Session Handling"
      ],
      answer: 1,
      discussion: "Encrypted Token Pattern atau Double Submit Cookie memanfaatkan sifat verifikasi kriptografis atau pencocokan data pada cookie & request payload tanpa mewajibkan server menyimpan daftar token di sesi memori."
    },
  
    // SECTION 4: Session Security & Cookie Hardening
    {
      id: 61,
      section: 4,
      sectionName: "Bagian 4: Session Security & Cookie Hardening",
      question: "Apakah yang terjadi pada mekanisme sesi jika variabel konfigurasi `'session.use_strict_mode' => true` diaktifkan pada PHP / CakePHP?",
      options: [
        "PHP akan menolak ID Sesi yang dikirim oleh browser jika ID Sesi tersebut belum pernah diterbitkan oleh server, dan otomatis menggantinya dengan ID Sesi baru yang sah.",
        "PHP melarang pengguna melakukan login jika menggunakan browser seluler.",
        "PHP membatasi panjang kata sandi maksimal 8 karakter.",
        "PHP menghapus database sesi setiap jam 12 malam."
      ],
      answer: 0,
      discussion: "Strict Mode mencegah serangan Session Fixation. Jika penyerang menyisipkan ID sesi buatan sendiri ke browser korban, PHP dengan Strict Mode akan menolak ID tak terdaftar tersebut dan menerbitkan ID baru."
    },
    {
      id: 62,
      section: 4,
      sectionName: "Bagian 4: Session Security & Cookie Hardening",
      question: "Bagaimana alur terjadinya serangan Session Fixation oleh penyerang terhadap pengguna korban?",
      options: [
        "Penyerang menyadap jaringan WiFi untuk membaca kata sandi mentah.",
        "Penyerang menentukan ID Sesi tertentu pada browser korban, menunggu korban melakukan login dengan ID tersebut, lalu penyerang masuk menggunakan ID Sesi yang sama yang telah terautentikasi.",
        "Penyerang menebak kata sandi pengguna menggunakan teknik dictionary attack.",
        "Penyerang mengirimkan email phishing berisi virus eksekutabel."
      ],
      answer: 1,
      discussion: "Pada Session Fixation, penyerang 'memasang' ID sesi yang diketahuinya ke korban. Jika aplikasi tidak memperbarui ID sesi setelah korban berhasil terautentikasi, ID sesi tersebut menjadi sah dan dapat digunakan penyerang."
    },
    {
      id: 63,
      section: 4,
      sectionName: "Bagian 4: Session Security & Cookie Hardening",
      question: "Mengapa fungsi pembaruan ID Sesi (seperti `$session->renew()` atau `session_regenerate_id(true)`) WAJIB dipanggil saat terjadi perubahan status otentikasi (misalnya tepat setelah user berhasil Login)?",
      options: [
        "Untuk mempercepat loading halaman web.",
        "Untuk mematahkan keterhubungan ID Sesi pra-login yang mungkin telah diketahui oleh penyerang (Mitigasi Session Fixation).",
        "Untuk mengosongkan keranjang belanjaan pengguna.",
        "Untuk memperbarui tanggal lahir pengguna di database."
      ],
      answer: 1,
      discussion: "Regenerasi ID sesi setelah otentikasi mengganti ID sesi lama dengan token acak baru dan membuang ID lama. Ini memastikan ID sesi pra-login yang mungkin dipegang penyerang menjadi tidak berguna."
    },
    {
      id: 64,
      section: 4,
      sectionName: "Bagian 4: Session Security & Cookie Hardening",
      question: "Apa risiko utama jika atribut `HttpOnly` TIDAK dipasang pada cookie sesi (`Set-Cookie: session_id=abc`)?",
      options: [
        "Cookie tidak bisa dikirimkan melalui HTTPS.",
        "Skrip JavaScript client-side (misalnya melalui celah XSS) dapat membaca nilai `document.cookie` dan mencuri ID Sesi pengguna.",
        "Browser akan langsung menghapus cookie setelah 1 detik.",
        "Sesi pengguna tidak bisa disimpan di database."
      ],
      answer: 1,
      discussion: "Atribut `HttpOnly` menginstruksikan browser untuk mengisolasi cookie dari API JavaScript (`document.cookie`). Tanpa atribut ini, keberadaan celah XSS memungkinkan pencurian ID sesi secara langsung."
    },
    {
      id: 65,
      section: 4,
      sectionName: "Bagian 4: Session Security & Cookie Hardening",
      question: "Seorang developer menyetel konfigurasi CakePHP `'session.cookie_secure' => true` pada lingkungan pengembangan lokal yang HANYA menggunakan protokol HTTP (`http://localhost`). Apa dampak langsung yang akan dialami developer?",
      options: [
        "Server CakePHP akan langsung mengalami crash.",
        "Browser menolak menyimpan atau mengirimkan cookie sesi, menyebabkan fitur login/sesi gagal berjalan sama sekali.",
        "Kode sumber PHP akan otomatis terhapus.",
        "Database lokal akan terhubung ke server cloud secara otomatis."
      ],
      answer: 1,
      discussion: "Atribut `Secure` melarang browser mengirim cookie melalui koneksi unencrypted HTTP. Jika dikembangkan di HTTP localhost tanpa HTTPS, browser tidak akan menyimpan cookie sesi tersebut."
    },
    {
      id: 66,
      section: 4,
      sectionName: "Bagian 4: Session Security & Cookie Hardening",
      question: "Dalam manajemen sesi, apakah perbedaan antara 'Idle Timeout' dan 'Absolute Timeout'?",
      options: [
        "Idle Timeout mematikan sesi berdasarkan inaktivitas pengguna, sedangkan Absolute Timeout mengakhiri sesi setelah durasi total tertentu sejak login tanpa peduli aktivitasnya.",
        "Idle Timeout hanya berlaku pada hari libur, sedangkan Absolute Timeout berlaku setiap hari.",
        "Absolute Timeout mematikan koneksi internet, sedangkan Idle Timeout mematikan komputer.",
        "Tidak ada perbedaan, keduanya mengacu pada waktu expired cookie."
      ],
      answer: 0,
      discussion: "Idle Timeout menghitung durasi sejak interaksi terakhir (misal logout setelah 15 menit pasif). Absolute Timeout membatasi batas umur maksimal sesi secara mutlak (misal wajib login ulang tiap 8 jam) untuk membatasi jendela eksploitasi."
    },
    {
      id: 67,
      section: 4,
      sectionName: "Bagian 4: Session Security & Cookie Hardening",
      question: "Apa konsekuensi dari menyimpan file Sesi PHP secara default di direktori publik bersama (`/tmp`) pada lingkungan Shared Hosting?",
      options: [
        "Sesi memakan bandwidth jaringan hosting.",
        "Pengguna hosting lain pada server fisik yang sama dapat membaca isi file sesi di direktori `/tmp` dan mencuri ID Sesi atau data sensitif di dalamnya.",
        "Kecepatan kueri database meningkat pesat.",
        "CakePHP menolak dijalankan di server Linux."
      ],
      answer: 1,
      discussion: "Direktori `/tmp` standar Linux sering kali dapat dibaca oleh seluruh user di server. Pada shared hosting, penyewa lain bisa membaca file sesi terpadu tersebut jika permission file tidak diisolasi ketat."
    },
    {
      id: 68,
      section: 4,
      sectionName: "Bagian 4: Session Security & Cookie Hardening",
      question: "Bagaimana strategi pengamanan terbaik jika aplikasi CakePHP Anda menggunakan infrastruktur Multi-Server (Load Balanced Cluster)?",
      options: [
        "Menyimpan sesi di file lokal masing-masing server.",
        "Menggunakan penanganan Sesi Terpusat (Centralized Session Handler) seperti Redis, Memcached, atau Database utama.",
        "Mematikan penggunaan sesi dan menggunakan file teks di browser.",
        "Memaksa pengguna terhubung ke server menggunakan kabel LAN."
      ],
      answer: 1,
      discussion: "Pada arsitektur multi-server, request pengguna dapat diarahkan ke node server mana saja secara acak. Sesi harus disimpan secara terpusat (misal Redis/DB) agar seluruh node server dapat memverifikasi sesi yang sama."
    },
    {
      id: 69,
      section: 4,
      sectionName: "Bagian 4: Session Security & Cookie Hardening",
      question: "Apa fungsi dari pemanggilan `$this->request->getSession()->destroy()` pada aksi `logout()` di Controller CakePHP?",
      options: [
        "Mengapus akun pengguna dari database secara permanen.",
        "Menghapus seluruh data sesi di server dan membatalkan token ID Sesi terkait secara menyeluruh.",
        "Mengunduh file cadangan aplikasi ke komputer pengguna.",
        "Mengubah tema halaman web menjadi gelap."
      ],
      answer: 1,
      discussion: "Metode `destroy()` menghapus data sesi dari tempat penyimpanan backend (file/DB/Redis) dan mengosongkan status otentikasi di server, memastikan ID sesi lama tidak dapat dipakai ulang."
    },
    {
      id: 70,
      section: 4,
      sectionName: "Bagian 4: Session Security & Cookie Hardening",
      question: "Seorang penyerang berhasil mencuri nilai ID Sesi pengguna dari lalu lintas WiFi publik unencrypted. Jenis serangan dan mitigasi yang paling tepat untuk masalah ini adalah:",
      options: [
        "Session Fixation; difiksasi menggunakan CSRF Token.",
        "Session Hijacking via Eavesdropping; dimitigasi dengan memberlakukan protokol HTTPS secara penuh dan menyetel cookie flag `Secure`.",
        "SQL Injection; dimitigasi dengan Prepared Statement.",
        "XSS Attack; dimitigasi dengan `strip_tags()`."
      ],
      answer: 1,
      discussion: "Mencuri ID Sesi yang sedang berjalan melalui penyadapan jaringan unencrypted adalah Session Hijacking. Mitigasi utamanya adalah enkripsi TLS/HTTPS dan menyetel atribut cookie `Secure`."
    },
    {
      id: 71,
      section: 4,
      sectionName: "Bagian 4: Session Security & Cookie Hardening",
      question: "Perhatikan header berikut: `Set-Cookie: user=john; Domain=example.com; Path=/admin`. Siapa saja yang diizinkan browser untuk menerima cookie ini?",
      options: [
        "Semua situs web di internet.",
        "Hanya permintaan yang mengarah ke domain `example.com` (dan subdomainnya) yang berada di bawah jalur direktori `/admin`.",
        "Hanya skrip JavaScript yang berjalan di komputer lokal.",
        "Hanya server database MySQL."
      ],
      answer: 1,
      discussion: "Atribut `Domain` dan `Path` membatasi cakupan pengiriman cookie oleh browser. Browser hanya melampirkan cookie tersebut jika URL permintaan cocok dengan domain dan direktori jalur yang ditentukan."
    },
    {
      id: 72,
      section: 4,
      sectionName: "Bagian 4: Session Security & Cookie Hardening",
      question: "Apa risiko dari menyimpan data sensitif pengguna (seperti `role_id` atau `balance`) langsung di dalam nilai Cookie Client-Side tanpa Enkripsi dan Signature Kriptografis?",
      options: [
        "Browser akan melambat.",
        "Pengguna dapat dengan mudah mengubah nilai cookie di DevTools (misal mengubah `role_id=2` menjadi `role_id=1` untuk menjadi Admin) dan memanipulasi hak akses.",
        "Data cookie akan otomatis terhapus saat browser ditutup.",
        "Server web akan mengirimkan error 500."
      ],
      answer: 1,
      discussion: "Data cookie di sisi client dapat diedit secara bebas oleh pengguna. Menyimpan status otorisasi di cookie tanpa enkripsi/HMAC signature memungkinkan manipulasi parameter otorisasi (*Privilege Escalation*)."
    },
    {
      id: 73,
      section: 4,
      sectionName: "Bagian 4: Session Security & Cookie Hardening",
      question: "Mengapa pemutakhiran ID Sesi secara berkala (*Periodic Session Regeneration*) selama pengguna aktif sangat direkomendasikan?",
      options: [
        "Untuk menghemat penggunaan ruang harddisk server.",
        "Mengurangi jendela waktu eksploitasi (*window of opportunity*) jika ID Sesi sempat tercuri oleh pihak ketiga.",
        "Mencegah pengguna membuka lebih dari satu tab di browser.",
        "Memastikan ukuran cookie tidak melebihi 100 bytes."
      ],
      answer: 1,
      discussion: "Regenerasi ID Sesi secara periodik (misal setiap 15 menit sekali saat pengguna aktif) membatasi durasi kegunaan ID Sesi yang mungkin telah tercuri secara tidak disadari oleh penyerang."
    },
    {
      id: 74,
      section: 4,
      sectionName: "Bagian 4: Session Security & Cookie Hardening",
      question: "Dalam CakePHP `config/app.php`, apakah fungsi dari opsi `'ini' => ['session.gc_maxlifetime' => 1440]`?",
      options: [
        "Menentukan batas maksimal karakter kata sandi.",
        "Menentukan waktu maksimum (dalam detik) sebelum data sesi dianggap sebagai 'sampah' (*garbage*) dan dibersihkan oleh proses Garbage Collection.",
        "Menentukan port koneksi ke database server.",
        "Menentukan jumlah percobaan login yang diizinkan."
      ],
      answer: 1,
      discussion: "`session.gc_maxlifetime` mengatur usia kelayakan data sesi yang tersimpan di server. Setelah durasi tersebut terlewati, proses Garbage Collection (GC) PHP berhak menghapus data sesi tersebut."
    },
    {
      id: 75,
      section: 4,
      sectionName: "Bagian 4: Session Security & Cookie Hardening",
      question: "Apa kelemahan utama dari strategi pengikatan sesi ke Alamat IP pengguna (`IP-bound Session`) pada era koneksi seluler modern?",
      options: [
        "Alamat IP pengguna tidak bisa dibaca oleh bahasa PHP.",
        "Pengguna seluler yang sah sering mengalami pergantian IP secara dinamis (misal saat berpindah tower jaringan atau WiFi), yang menyebabkan sesi mereka sering terputus (*legitimate disconnect*).",
        "Alamat IP memakan ruang penyimpanan database yang sangat besar.",
        "IP-bound session melanggar aturan lisensi open-source CakePHP."
      ],
      answer: 1,
      discussion: "Meskipun mengikat IP meningkatkan keamanan terhadap pencurian sesi, pada jaringan seluler/CGNAT IP pengguna berubah secara frekuen. Ini akan menyebabkan pengguna legitimate sering ter-logout secara tiba-tiba."
    },
    {
      id: 76,
      section: 4,
      sectionName: "Bagian 4: Session Security & Cookie Hardening",
      question: "Manakah dari kombinasi atribut `Set-Cookie` berikut yang memberikan proteksi paling maksimal untuk Cookie Sesi pada aplikasi berbasis HTTPS?",
      options: [
        "Set-Cookie: session=xyz;",
        "Set-Cookie: session=xyz; Secure; HttpOnly; SameSite=Strict",
        "Set-Cookie: session=xyz; Domain=.org; Path=/",
        "Set-Cookie: session=xyz; SameSite=None"
      ],
      answer: 1,
      discussion: "Kombinasi `Secure` (mencegah transit unencrypted), `HttpOnly` (mencegah pencurian via XSS), dan `SameSite=Strict` (mencegah pencurian context via CSRF) memberikan perlindungan Cookie paling ideal."
    },
    {
      id: 77,
      section: 4,
      sectionName: "Bagian 4: Session Security & Cookie Hardening",
      question: "Apa fungsi dari awalan nama cookie `__Host-` (misal `Set-Cookie: __Host-session=xyz; Secure; Path=/`) yang didukung browser modern?",
      options: [
        "Mengubah warna tampilan cookie di DevTools menjadi hijau.",
        "Browser menolak cookie jika tidak diset dengan flag `Secure`, tidak memiliki `Path=/`, atau dikirimkan dari sub-domain (mencegah Cookie Tossing attack).",
        "Menginstruksikan server hosting untuk mematikan Apache.",
        "Mengubah nama file sesi di server menjadi enkripsi MD5."
      ],
      answer: 1,
      discussion: "Cookie Prefixes (`__Host-`) adalah fitur keamanan browser ketat. Browser menolak menyimpan cookie berawalan `__Host-` kecuali cookie tersebut memenuhi syarat: memakai HTTPS (`Secure`), tanpa atribut `Domain`, dan `Path=/`."
    },
    {
      id: 78,
      section: 4,
      sectionName: "Bagian 4: Session Security & Cookie Hardening",
      question: "Seorang penyerang mengirimkan header HTTP berikut untuk menanamkan cookie palsu ke korban: `Set-Cookie: session=attacker_id; Domain=app.com`. Jenis kerentanan ini dikenal sebagai:",
      options: [
        "SQL Injection",
        "Cookie Injection / Cookie Tossing",
        "Command Injection",
        "Local File Inclusion"
      ],
      answer: 1,
      discussion: "Cookie Tossing terjadi ketika penyerang (yang menguasai subdomain sejenis atau via XSS) menyisipkan cookie ke domain utama korban untuk menimpa atau menentukan ID sesi korban."
    },
    {
      id: 79,
      section: 4,
      sectionName: "Bagian 4: Session Security & Cookie Hardening",
      question: "Apakah peran dari header `Cache-Control: no-store, no-cache, must-revalidate` pada halaman berautentikasi sensitif?",
      options: [
        "Mencegah browser atau proxy menyimpan salinan cache halaman sensitif (seperti riwayat transaksi) yang bisa dibaca saat seseorang mengklik tombol 'Back' di komputer umum.",
        "Mempercepat proses loading gambar di browser.",
        "Menghapus kata sandi pengguna dari database secara otomatis.",
        "Mematikan fungsi JavaScript di browser."
      ],
      answer: 0,
      discussion: "`Cache-Control: no-store` melarang browser dan intermediate proxy menyimpan cache halaman berautentikasi, mencegah kebocoran data sensitif saat browser digunakan di komputer publik."
    },
    {
      id: 80,
      section: 4,
      sectionName: "Bagian 4: Session Security & Cookie Hardening",
      question: "Dalam arsitektur JWT (JSON Web Token) yang disimpan di LocalStorage, ancaman keamanan utama manakah yang paling berisiko dibanding penyimpanan berbasis HttpOnly Cookie?",
      options: [
        "JWT di LocalStorage sangat rentan dicuri oleh skrip XSS karena JavaScript memiliki akses penuh ke API `localStorage`.",
        "JWT di LocalStorage mematikan fungsi enkripsi SSL.",
        "LocalStorage tidak bisa menyimpan string lebih dari 10 karakter.",
        "JWT akan terhapus otomatis tiap kali tab ditutup."
      ],
      answer: 0,
      discussion: "`localStorage` diakses secara penuh oleh API JavaScript di origin yang sama. Jika terjadi XSS, penyerang dapat membaca token JWT secara langsung dari `localStorage`, berbeda dengan `HttpOnly` Cookie."
    },
  
    // SECTION 5: Password Security, Hashing & Credential Protection
    {
      id: 81,
      section: 5,
      sectionName: "Bagian 5: Password Security & Hashing",
      question: "Mengapa algoritma enkripsi dua arah (seperti AES-256) TIDAK BOLEH digunakan untuk menyimpan kata sandi pengguna di database?",
      options: [
        "AES-256 memakan waktu proses hingga 1 jam untuk satu kata sandi.",
        "Enkripsi bersifat dua arah (dapat didekripsi). Jika penyerang berhasil mencuri kunci enkripsi (*decryption key*), seluruh kata sandi asli pengguna dapat dipulihkan.",
        "AES-256 tidak didukung oleh PHP 8.",
        "AES-256 menghasilkan output string yang terlalu pendek."
      ],
      answer: 1,
      discussion: "Kata sandi harus disimpan menggunakan fungsi hash kriptografis satu arah (*one-way hash*). Algoritma dua arah (enkripsi) menyimpan risiko dekripsi data asli jika kunci rahasia (*secret key*) server bocor."
    },
    {
      id: 82,
      section: 5,
      sectionName: "Bagian 5: Password Security & Hashing",
      question: "Apakah fungsi teknis dari penambahan Salt acak (*Cryptographic Salt*) pada proses hashing kata sandi?",
      options: [
        "Mempercepat perhitungan hash di server.",
        "Mempersulit serangan Rainbow Table dan memastikan dua pengguna dengan kata sandi yang sama menghasilkan string hash yang berbeda.",
        "Mengompresi ukuran hash agar muat di kolom VARCHAR(10).",
        "Memungkinkan kata sandi yang lupa untuk didekripsi kembali."
      ],
      answer: 1,
      discussion: "Salt adalah string acak unik per pengguna yang digabungkan sebelum di-hash. Ini menggagalkan penggunaan Rainbow Table (daftar hash prasimpan) dan mencegah perbandingan pola hash antar pengguna."
    },
    {
      id: 83,
      section: 5,
      sectionName: "Bagian 5: Password Security & Hashing",
      question: "Mengapa algoritma MD5 dan SHA-1 dianggap TIDAK LAYAK LAGI digunakan untuk menyimpan kata sandi modern?",
      options: [
        "MD5 dan SHA-1 tidak dapat berjalan di OS Linux.",
        "MD5 dan SHA-1 dirancang terlalu cepat (fast-hash) dan tidak memiliki Work Factor/Cost Factor, sehingga sangat rentan serangan Brute Force berbasis GPU modern.",
        "MD5 hanya mendukung karakter angka.",
        "SHA-1 menghasilkan output berformat file zip."
      ],
      answer: 1,
      discussion: "MD5 dan SHA-1 adalah algoritma cepat yang dikembangkan untuk integritas data, bukan proteksi kata sandi. Hardware GPU modern dapat memproses miliaran kueri hash MD5 per detik saat melakukan Brute Force."
    },
    {
      id: 84,
      section: 5,
      sectionName: "Bagian 5: Password Security & Hashing",
      question: "Apa keunggulan utama dari algoritma hashing **Argon2id** dibandingkan dengan **bcrypt**?",
      options: [
        "Argon2id menghasilkan string yang lebih pendek.",
        "Argon2id memenangkan Password Hashing Competition dan dirancang tahan terhadap serangan berbasis GPU/ASIC dengan mengonfigurasi batas Memori, Waktu (CPU), dan Paralelisasi.",
        "Argon2id tidak memerlukan Salt.",
        "Argon2id dapat dikembalikan ke teks kata sandi asli secara instan."
      ],
      answer: 1,
      discussion: "Argon2id merupakan standar hashing password paling mutakhir. Selain mengontrol Cost Factor CPU, Argon2id memaksa alokasi memori RAM (Memory-hard) yang memutus efisiensi serangan Brute Force berbasis hardware GPU/ASIC."
    },
    {
      id: 85,
      section: 5,
      sectionName: "Bagian 5: Password Security & Hashing",
      question: "Dalam CakePHP Entity, bagaimana penulisan fungsi Setter yang paling tepat untuk melakukan hashing kata sandi otomatis saat data dibuat/diperbarui?",
      options: [
        "protected function _setPassword($password) { return md5($password); }",
        "protected function _setPassword(string $password): ?string { if (strlen($password) > 0) { return (new DefaultPasswordHasher())->hash($password); } return null; }",
        "protected function _setPassword($password) { return base64_encode($password); }",
        "protected function _setPassword($password) { return $password; }"
      ],
      answer: 1,
      discussion: "Setter `_setPassword` pada Entity CakePHP bertugas menangkap penugasan variabel kata sandi dan langsung melakukan hashing menggunakan `DefaultPasswordHasher` (bcrypt/Argon2) sebelum disimpan ke atribut."
    },
    {
      id: 86,
      section: 5,
      sectionName: "Bagian 5: Password Security & Hashing",
      question: "Mengapa fungsi `password_verify($plainPassword, $hashFromDB)` pada PHP aman dari serangan *Timing Attack*?",
      options: [
        "Fungsi tersebut menggunakan pembandingan waktu konstan (*constant-time string comparison*) saat mencocokkan karakter.",
        "Fungsi tersebut mematikan koneksi database jika ada kecocokan.",
        "Fungsi tersebut mempercepat eksekusi PHP menjadi 0 milidetik.",
        "Fungsi tersebut mengubah kata sandi menjadi file dokumen."
      ],
      answer: 0,
      discussion: "Timing Attack mengukur selisih waktu eksekusi pembandingan string karakter demi karakter. `password_verify()` memanfaatkan pembandingan constant-time sehingga durasi pemeriksaan tetap sama baik string cocok maupun tidak."
    },
    {
      id: 87,
      section: 5,
      sectionName: "Bagian 5: Password Security & Hashing",
      question: "Apa yang dimaksud dengan serangan 'Credential Stuffing'?",
      options: [
        "Penyerang membocorkan kata sandi server ke media sosial.",
        "Penyerang menggunakan daftar kombinasi username/password hasil kebocoran data (*data breach*) dari situs lain untuk dicoba secara otomatis pada situs target.",
        "Penyerang memenuhi harddisk server dengan file kata sandi mentah.",
        "Penyerang menyisipkan tag script ke dalam input kata sandi."
      ],
      answer: 1,
      discussion: "Credential Stuffing mengeksploitasi kebiasaan buruk pengguna yang menggunakan kembali pasangan email/password yang sama di banyak situs web (*password reuse*), menggunakan otomasi botnet."
    },
    {
      id: 88,
      section: 5,
      sectionName: "Bagian 5: Password Security & Hashing",
      question: "Mekanisme pengamanan apakah yang Paling Efektif di sisi backend untuk menghentikan serangan Brute Force dan Credential Stuffing pada endpoint Login?",
      options: [
        "Mengubah warna tombol Login menjadi merah.",
        "Penerapan Rate Limiting (pembatasan jumlah percobaan per IP/akun), Captcha, dan Multi-Factor Authentication (MFA).",
        "Menghapus fungsi `password_verify()` di controller.",
        "Menyimpan kata sandi dalam variabel global."
      ],
      answer: 1,
      discussion: "Rate limiting membatasi frekuensi percobaan dalam periode waktu tertentu, Captcha memutus otomasi bot, dan MFA memastikan akun tetap aman meskipun kata sandi berhasil ditebak."
    },
    {
      id: 89,
      section: 5,
      sectionName: "Bagian 5: Password Security & Hashing",
      question: "Dalam pembuatan fitur 'Lupa Password' (Password Reset), manakah desain alur yang PENTING untuk mencegah enumerasi akun pengguna?",
      options: [
        "Menampilkan pesan 'Email tidak ditemukan di database' jika input email salah.",
        "Menampilkan pesan generik seperti 'Jika email Anda terdaftar di sistem kami, instruksi pemulihan kata sandi telah dikirimkan', tanpa membocorkan keberadaan akun.",
        "Menampilkan kata sandi lama pengguna langsung di layar.",
        "Mengirimkan kata sandi baru dalam bentuk plaintext via SMS."
      ],
      answer: 1,
      discussion: "Pesan respons yang membedakan keberadaan email memungkinkan penyerang melakukan 'User Enumeration' (memetakan daftar pengguna aktif). Pesan generik menyamarkan status akun untuk privasi dan keamanan."
    },
    {
      id: 90,
      section: 5,
      sectionName: "Bagian 5: Password Security & Hashing",
      question: "Bagaimana karakteristik Token Reset Password yang aman saat disimpan dan dikirimkan kepada pengguna?",
      options: [
        "Token dibuat menggunakan `md5(username)`, tanpa tanggal kadaluarsa.",
        "Token berupa nilai kriptografis acak yang kuat (`random_bytes`), memiliki batas waktu kadaluarsa pendek (misal 15 menit), dan hanya disimpan dalam bentuk hash di database.",
        "Token berupa kata sandi asli pengguna yang di-base64.",
        "Token dikirimkan ke nomor WhatsApp publik."
      ],
      answer: 1,
      discussion: "Token reset adalah kunci akses sementara. Token harus acak kriptografis, memiliki batasan kadaluarsa singkat, dan idealnya di-hash di DB agar jika DB bocor, token aktif tidak dapat dipakai penyerang."
    },
    {
      id: 91,
      section: 5,
      sectionName: "Bagian 5: Password Security & Hashing",
      question: "Dalam CakePHP Entity, apa risiko besar jika properti `$_accessible` menyetel kolom `is_admin` atau `role` menjadi `true` (`'role' => true`) pada pendaftaran pengguna umum?",
      options: [
        "Pengguna tidak dapat melakukan registrasi.",
        "Celah Mass Assignment Vulnerability: Penyerang dapat menyisipkan parameter `role=admin` pada form POST dan menaikkan hak aksesnya secara mandiri (*Privilege Escalation*).",
        "Kata sandi pengguna akan menjadi kosong.",
        "Server akan mengirimkan email ke seluruh akun pengguna."
      ],
      answer: 1,
      discussion: "Jika `'role' => true` di `$_accessible`, method `$this->Users->patchEntity()` akan menerima dan menetapkan atribut `role` dari request form. Penyerang dapat memanipulasi request untuk menjadi Admin."
    },
    {
      id: 92,
      section: 5,
      sectionName: "Bagian 5: Password Security & Hashing",
      question: "Mengapa standar keamanan kata sandi modern dari NIST (National Institute of Standards and Technology) LEBIH MENGUTAMAKAN panjang kata sandi (passphrase) daripada aturan kompleksitas kaku yang rumit?",
      options: [
        "Aturan kompleksitas kaku (seperti wajib menyertakan simbol) membuat pengguna cenderung membuat pola yang mudah ditebak (misal `P@ssword1!`) dan kata sandi panjang secara eksponensial lebih sulit di-brute force.",
        "Kata sandi pendek lebih mudah disimpan oleh database.",
        "Simbol khusus merusak jaringan internet.",
        "NIST tidak merekomendasikan penggunaan kata sandi lagi."
      ],
      answer: 0,
      discussion: "NIST SP 800-63B menemukan bahwa aturan kompleksitas kaku mendorong pembuatan pola terbatas yang terprediksi. Panjang kata sandi (entropi) memberikan ruang kombinasi yang jauh lebih masif bagi keamanan."
    },
    {
      id: 93,
      section: 5,
      sectionName: "Bagian 5: Password Security & Hashing",
      question: "Apa risiko keamanan terbesar dari fitur 'Ingat Saya' (Remember Me) yang diimplementasikan secara naif dengan menyimpan `username` dan `password` mentah di dalam cookie pengguna?",
      options: [
        "Ukuran cookie membesar 1MB.",
        "Pencurian cookie melalui XSS atau penyadapan akan langsung mengekspos kredensial login asli pengguna secara permanen.",
        "Browser menolak membuka halaman web.",
        "Fitur tersebut akan dikira sebagai virus oleh antivirus."
      ],
      answer: 1,
      discussion: "Kredensial mentah (terutama password) TIDAK BOLEH disimpan di Cookie. Mekanisme Remember Me yang aman menggunakan persistent token terpisah (seperti selector/validator token pattern) yang di-hash."
    },
    {
      id: 94,
      section: 5,
      sectionName: "Bagian 5: Password Security & Hashing",
      question: "Dalam penggunaan fungsi `password_hash($password, PASSWORD_DEFAULT)` pada PHP, apa yang terjadi jika versi PHP Anda diperbarui di masa mendatang?",
      options: [
        "Sistem login akan rusak total dan semua hash terhapus.",
        "Konstanta `PASSWORD_DEFAULT` dapat otomatis berpindah ke algoritma yang lebih kuat (misal dari bcrypt ke Argon2id), sehingga hash baru menggunakan algoritma terkuat secara transparan.",
        "Kata sandi semua pengguna otomatis diubah menjadi '123456'.",
        "PHP menolak mengeksekusi file."
      ],
      answer: 1,
      discussion: "`PASSWORD_DEFAULT` dirancang agar selalu mengacu pada algoritma standar industri terkuat yang didukung oleh versi PHP berjalan. Saat PHP di-upgrade, algoritma default menyesuaikan secara otomatis."
    },
    {
      id: 95,
      section: 5,
      sectionName: "Bagian 5: Password Security & Hashing",
      question: "Bagaimana cara kerja fungsi `password_needs_rehash($hash, $algorithm, $options)` pada PHP dalam menjaga tingkat keamanan hash kata sandi lama?",
      options: [
        "Menghapus kata sandi pengguna jika tidak login selama 1 bulan.",
        "Mengecek apakah hash kata sandi yang disimpan di DB dibuat dengan algoritma/cost factor lama, sehingga aplikasi dapat memperbarui hash ke standar baru saat pengguna berhasil login.",
        "Mengubah kata sandi pengguna secara acak setiap hari.",
        "Mengirim notifikasi ke email pengguna untuk mengganti password."
      ],
      answer: 1,
      discussion: "Saat pengguna berhasil terautentikasi (kata sandi plaintext tersedia di RAM), `password_needs_rehash()` memeriksa apakah hash perlu ditingkatkan kinerjanya (misal memperbesar Cost Factor) dan menyimpan ulang hash baru tersebut."
    },
    {
      id: 96,
      section: 5,
      sectionName: "Bagian 5: Password Security & Hashing",
      question: "Di bawah ini, manakah yang merupakan implementasi fungsi 'Pepper' (Password Pepper) dalam arsitektur penyimpanan kata sandi?",
      options: [
        "Pepper adalah salt yang ditempelkan di depan username.",
        "Pepper adalah kunci rahasia global yang disimpan di luar database (misal di Environment Variable/HSM) dan digabungkan ke kata sandi sebelum proses hashing.",
        "Pepper adalah algoritma untuk mendekripsi hash bcrypt.",
        "Pepper adalah nama file konfigurasi CakePHP."
      ],
      answer: 1,
      discussion: "Pepper adalah rahasia tingkat server yang tidak disimpan di database. Jika database bocor (*database leak*), penyerang tetap tidak bisa melakukan offline cracking tanpa memiliki nilai Pepper yang tersimpan terpisah di Environment/HSM."
    },
    {
      id: 97,
      section: 5,
      sectionName: "Bagian 5: Password Security & Hashing",
      question: "Apa konsekuensi dari menyetel Cost Factor bcrypt yang TERLALU TINGGI (misalnya `cost => 18`) pada server web produksi berkapasitas standar?",
      options: [
        "Keamanan berkurang pesat.",
        "Proses komputasi hashing membutuhkan waktu beberapa detik per login, yang dapat memicu serangan Denial of Service (DoS) karena konsumsi CPU server melonjak 100%.",
        "Hash yang dihasilkan menjadi tidak valid.",
        "PHP akan kehabisan memori RAM."
      ],
      answer: 1,
      discussion: "Setiap kenaikan 1 poin Cost Factor pada bcrypt melipatgandakan waktu komputasi CPU. Cost Factor berlebihan (misal cost 18) membuat alur otentikasi sangat lambat dan mudah dimanfaatkan penyerang untuk melumpuhkan server."
    },
    {
      id: 98,
      section: 5,
      sectionName: "Bagian 5: Password Security & Hashing",
      question: "Perhatikan hash bcrypt berikut: `$2y$10$e8N.Jd3G3jR5LdK3vM0Ue.yT8fH2g1k0L3m4N5o6P7q8R9s0T1u2V`. Arti dari bagian `$10$` pada string tersebut adalah:",
      options: [
        "Versi bahasa PHP yang digunakan adalah PHP 10.",
        "Cost Factor (Work Factor) yang digunakan adalah $2^{10}$ (1024 iterasi ronde komputasi).",
        "Panjang kata sandi asli adalah 10 karakter.",
        "Sisa percobaan login pengguna adalah 10 kali."
      ],
      answer: 1,
      discussion: "Pada format penulisan hash bcrypt, segmen di antara tanda dolar kedua dan ketiga melambangkan Cost Factor logaritma ($2^{\text{cost}}$ iterasi)."
    },
    {
      id: 99,
      section: 5,
      sectionName: "Bagian 5: Password Security & Hashing",
      question: "Mengapa pembatasan panjang kata sandi maksimal (misalnya membatasi kata sandi maksimal 72 karakter) terjadi pada penggunaan algoritma **bcrypt** standar?",
      options: [
        "Karena algoritma internal bcrypt memotong (*truncate*) input kata sandi pada byte ke-72 secara eksplisit saat membuat kalkulasi hash.",
        "Karena database MySQL tidak bisa menyimpan string lebih dari 72 byte.",
        "Karena browser HTML melarang input text lebih dari 72 karakter.",
        "Karena CakePHP membatasi ukuran memori string."
      ],
      answer: 0,
      discussion: "Algoritma dasar Blowfish/bcrypt secara teknis hanya memproses 72 byte pertama dari input kata sandi. Karakter setelah byte ke-72 diabaikan oleh algoritma. (Untuk mengatasinya, kata sandi panjang biasanya di-pre-hash dengan SHA-256 sebelum masuk ke bcrypt)."
    },
    {
      id: 100,
      section: 5,
      sectionName: "Bagian 5: Password Security & Hashing",
      question: "Di bawah ini, manakah skenario penanganan kata sandi yang PALING MEMATUHI prinsip arsitektur keamanan modern?",
      options: [
        "Menyimpan kata sandi dalam bentuk plaintext di file log untuk memudahkan troubleshooting.",
        "Mengirimkan kata sandi asli ke email pengguna setelah proses registrasi berhasil.",
        "Menggunakan Argon2id/bcrypt via `password_hash()`, menerapkan SSL/TLS, menyetel `$_accessible` secara kaku, serta memberlakukan Rate Limiting & MFA.",
        "Mengenkripsi kata sandi menggunakan Blowfish 2-way key yang disimpan di cookie."
      ],
      answer: 2,
      discussion: "Skenario C mengombinasikan pilar pertahanan menyeluruh (Defense-in-Depth): password hashing modern, enkripsi transit data (TLS), penanganan mass assignment kaku, serta kontrol batas login & MFA."
    }
  ];