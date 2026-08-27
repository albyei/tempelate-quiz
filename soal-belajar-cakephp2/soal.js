window.QUIZ_META = { 
    title: "Ujian Arsitektur CakePHP 2 vs CakePHP 4", 
    subtitle: "100 Soal Evaluasi Mendalam (PHP 5.6.9 vs PHP 8.2.29) - Focus on CakePHP 2" 
  }; 
  
  window.questionsData = [
    {
      id: 1,
      section: 1,
      sectionName: "Bagian 1: Evolusi Arsitektur Model & ORM",
      question: "Pada CakePHP 2, kelas `AppModel` mewarisi kelas `Model`. Manakah pernyataan yang BENAR mengenai arsitektur internal pengembalian data hasil query `find()` di CakePHP 2?",
      options: [
        "Mengembalikan sekumpulan instance object dari kelas Entity yang immutable.",
        "Mengembalikan array asosiatif multidimensi bersarang yang diindeks berdasarkan nama Alias Model.",
        "Mengembalikan instance `Cake\\ORM\\Query` yang belum dieksekusi sampai dipanggil `toArray()`.",
        "Mengembalikan Data Transfer Object (DTO) bertipe `StdClass`."
      ],
      answer: 1,
      discussion: "CakePHP 2 menggunakan modifikasi pola Active Record berbasis array asosiatif. Hasil dari find() adalah array multi-dimensi bersarang dengan nama Model sebagai kunci utama (misal: $data['User']['id'])."
    },
    {
      id: 2,
      section: 1,
      sectionName: "Bagian 1: Evolusi Arsitektur Model & ORM",
      question: "Dalam CakePHP 2, jika kita ingin membatasi kolom yang di-select dan membatasi relasi model yang ikut diambil secara otomatis tanpa mengikutsertakan relasi berantai default, property/behavior apa yang paling tepat digunakan?",
      options: [
        "Menggunakan `contain` query builder dari ORM Data Mapper.",
        "Mengatur `$this->Model->recursive = -1;` atau memakai `ContainableBehavior`.",
        "Mengubah property `public $useTable = false;` pada Model.",
        "Mengabaikan property `$hasMany` di deklarasi awal Model."
      ],
      answer: 1,
      discussion: "Secara default, level `recursive` pada CakePHP 2 adalah 1. Untuk mencegah query overhead akibat automatic JOIN/find relasi, pengembang biasa mengatur recursive = -1 atau melampirkan ContainableBehavior."
    },
    {
      id: 3,
      section: 1,
      sectionName: "Bagian 1: Evolusi Arsitektur Model & ORM",
      question: "Perhatikan contoh query CakePHP 2 berikut:\n`$this->Post->find('first', array('conditions' => array('Post.id' => $id)));`\nJika `$id` bertipe string `'1 OR 1=1'`, mengapa CakePHP 2 PDO binding umumnya aman dari SQL Injection pada struktur array conditions tersebut?",
      options: [
        "Karena CakePHP 2 secara otomatis meng-cast seluruh nilai ke angka integer.",
        "Karena CakePHP 2 menggunakan prepared statements PDO di mana key-value array otomatis diparameterisasi.",
        "Karena `find('first')` secara otomatis menambahkan `'LIMIT 1'` sehingga SQL injection gagal.",
        "Karena CakePHP 2 membuang karakter string `OR` menggunakan regex sebelum query dijalankan."
      ],
      answer: 1,
      discussion: "DboSource CakePHP 2 mengurai array conditions menjadi placeholder prepared statement PDO (seperti `:param1`), sehingga nilai variabel diperlakukan sebagai literal value, bukan executable SQL."
    },
    {
      id: 4,
      section: 1,
      sectionName: "Bagian 1: Evolusi Arsitektur Model & ORM",
      question: "Bagaimana cara mendefinisikan Virtual Field pada Model CakePHP 2 agar dapat dipanggil seperti kolom database biasa dalam query?",
      options: [
        "Mendefinisikan getter method di file Entity dengan prefiks `_get`.",
        "Menambahkan atribut pada properti `public $virtualFields` di dalam kelas Model sebagai ekspresi SQL.",
        "Menggunakan method `Model::afterFind()` untuk memodifikasi array secara eksplisit.",
        "Menggunakan fungsi `VirtualField::create()` pada controller."
      ],
      answer: 1,
      discussion: "Di CakePHP 2, virtual fields didaftarkan dalam properti `$virtualFields = array('full_name' => 'CONCAT(User.first_name, \" \", User.last_name)');` di dalam Model."
    },
    {
      id: 5,
      section: 1,
      sectionName: "Bagian 1: Evolusi Arsitektur Model & ORM",
      question: "Dalam CakePHP 4, arsitektur ORM dipisah secara tegas menjadi dua kelas utama berdasarkan pola Data Mapper, yaitu...",
      options: [
        "Controller dan View.",
        "Table (mewakili koleksi/tabel) dan Entity (mewakili satu baris data individual).",
        "Model dan Record.",
        "SchemaDB dan RowObject."
      ],
      answer: 1,
      discussion: "CakePHP 4 beralih dari Active Record ke Data Mapper, di mana kelas Table bertanggung jawab atas eksekusi query/persistensi, dan Entity mewakili objek domain individual."
    },
    {
      id: 6,
      section: 1,
      sectionName: "Bagian 1: Evolusi Arsitektur Model & ORM",
      question: "Pada CakePHP 2, metode `$this->Model->saveAll($data)` digunakan untuk menyimpan data induk beserta relasinya sekaligus. Apa kriteria struktur array `$data` agar transaksi relasi `hasMany` berhasil tersimpan?",
      options: [
        "Array harus bertipe flat tanpa nesting.",
        "Array harus memiliki primary key dari induk di dalam setiap elemen child secara eksplisit sebelum `saveAll()` dipanggil.",
        "Array harus menyusun data child sebagai list numerik di bawah key alias Model child (misal: `$data['Post']['Comment'] = array(0 => ..., 1 => ...)`).",
        "Data child harus dikonversi menjadi JSON string terlebih dahulu."
      ],
      answer: 2,
      discussion: "Untuk relasi hasMany pada saveAll() CakePHP 2, elemen data relasi bersarang harus berupa array berlapis dengan index numerik di bawah key Alias nama model relasinya."
    },
    {
      id: 7,
      section: 1,
      sectionName: "Bagian 1: Evolusi Arsitektur Model & ORM",
      question: "Apa fungsi dari callback `beforeSave($options = array())` pada Model CakePHP 2 dan apa nilai kembalian yang diharapkan jika ingin membatalkan proses penyimpanan?",
      options: [
        "Fungsi untuk memodifikasi schema; mengembalikan status `404`.",
        "Fungsi yang dipanggil sebelum validasi dan penyimpanan; mengembalikan `false` untuk membatalkan penyimpanan.",
        "Fungsi yang dipanggil setelah database lock; mengembalikan `null` untuk cancel.",
        "Fungsi untuk menghapus cache; mengembalikan array kosong `array()`."
      ],
      answer: 1,
      discussion: "Dalam CakePHP 2, mengembalikan nilai boolean `false` dari callback `beforeSave()` akan menghentikan seluruh proses eksekusi pencatatan data ke database."
    },
    {
      id: 8,
      section: 1,
      sectionName: "Bagian 1: Evolusi Arsitektur Model & ORM",
      question: "Dalam CakePHP 2, jika Anda memanggil `$this->Model->create()`, apa yang sebenarnya dilakukan oleh kerangka kerja tersebut di latar belakang?",
      options: [
        "Membuat tabel baru di database MySQL secara otomatis.",
        "Mereset state model (seperti `id`, `validationErrors`) dan menyiapkannya untuk memasukkan record baru (INSERT).",
        "Membuat instansiasi objek PHP baru dari kelas Model.",
        "Menjalankan query `CREATE TABLE IF NOT EXISTS` via DboSource."
      ],
      answer: 1,
      discussion: "Metode `Model::create()` di CakePHP 2 bertugas mengosongkan state ID sebelumnya, mereset error validasi, dan menyiapkan instance model untuk operasi penambahan baris baru."
    },
    {
      id: 9,
      section: 1,
      sectionName: "Bagian 1: Evolusi Arsitektur Model & ORM",
      question: "Di CakePHP 4, jika Anda memanggil `$articlesTable->find('all')->where(['title' => 'Test'])`, kapan query SQL tersebut benar-benar dieksekusi ke database?",
      options: [
        "Seketika saat metode `find()` dipanggil.",
        "Seketika saat metode `where()` dipanggil.",
        "Secara lazy (tertunda) saat iterator diproses (misalnya dalam `foreach`) atau saat dipanggil metode seperti `first()`, `all()`, atau `toArray()`.",
        "Query dieksekusi saat skrip PHP 8 selesai berjalan (shutdown sequence)."
      ],
      answer: 2,
      discussion: "CakePHP 4 ORM Query object mengimplementasikan `Transient interface` & `Lazy Evaluation`. Query SQL tidak dikirim ke database sampai data benar-benar diiterasi atau dipanggil pemicu akhir."
    },
    {
      id: 10,
      section: 1,
      sectionName: "Bagian 1: Evolusi Arsitektur Model & ORM",
      question: "Bagaimana mekanisme penanganan transaksi database (Database Transaction) dilakukan secara manual pada Model CakePHP 2?",
      options: [
        "`$this->Model->transaction(function() { ... });`",
        "`$dataSource = $this->Model->getDataSource(); $dataSource->begin();` diikuti `$dataSource->commit();` atau `$dataSource->rollback();`",
        "`DB::beginTransaction();` dan `DB::commit();`",
        "CakePHP 2 tidak mendukung transaksi database manual."
      ],
      answer: 1,
      discussion: "Di CakePHP 2, manajemen transaksi dilakukan secara eksplisit dengan mengambil objek DataSource dari Model yang bersangkutan."
    },
    {
      id: 11,
      section: 1,
      sectionName: "Bagian 1: Evolusi Arsitektur Model & ORM",
      question: "Di CakePHP 2, apa kegunaan dari atribut `public $useTable` dalam sebuah kelas Model?",
      options: [
        "Menentukan jenis Database Engine yang digunakan (misal: InnoDB atau MyISAM).",
        "Menentukan nama tabel database secara kustom, atau diset `false` jika Model tidak terhubung ke tabel database manapun.",
        "Mengunci tabel agar tidak bisa diakses oleh Model lain.",
        "Menentukan nama schema database yang terpisah."
      ],
      answer: 1,
      discussion: "Jika nama tabel tidak mengikuti konvensi jamak (plural) atau jika Model tidak menggunakan database (misal hanya untuk form validation), `$useTable` diatur secara kustom atau diset `false`."
    },
    {
      id: 12,
      section: 1,
      sectionName: "Bagian 1: Evolusi Arsitektur Model & ORM",
      question: "Mana yang merupakan sintaks penulisan relasi `belongsTo` yang benar pada Model CakePHP 2?",
      options: [
        "`public $belongsTo = 'User';` atau `$public $belongsTo = array('User' => array('foreignKey' => 'user_id'));`",
        "`$this->belongsTo('Users');` di dalam method `initialize()`.",
        "`protected $belongsTo = ['Users'];`",
        "`var $belongsTo = TableRegistry::get('Users');`"
      ],
      answer: 0,
      discussion: "CakePHP 2 mendefinisikan relasi sebagai atribut kelas (class properties) menggunakan nama tunggal Model (singular) dalam bentuk string atau array konfigurasi."
    },
    {
      id: 13,
      section: 1,
      sectionName: "Bagian 1: Evolusi Arsitektur Model & ORM",
      question: "Di CakePHP 2, apa perlakuan bawaan dari metode `$this->Model->delete($id)` jika record memiliki relasi `hasMany` dengan opsi `'dependent' => true`?",
      options: [
        "Penghapusan gagal dan melempar Exception.",
        "Record induk dihapus, namun record anak dibiarkan menjadi orphan.",
        "CakePHP 2 akan melakukan query penghapusan bertahap untuk menghapus semua record anak yang berelasi sebelum menghapus record induk.",
        "Foreign key anak diset menjadi `NULL` secara otomatis."
      ],
      answer: 2,
      discussion: "Jika `'dependent' => true` dikonfigurasi pada relasi `hasMany` di CakePHP 2, menghapus induk akan memicu penghapusan otomatis untuk semua data anak terkait."
    },
    {
      id: 14,
      section: 1,
      sectionName: "Bagian 1: Evolusi Arsitektur Model & ORM",
      question: "Pada CakePHP 2, di manakah aturan validasi input (`public $validate`) didefinisikan secara konvensional?",
      options: [
        "Di dalam Controller pada method `beforeFilter()`.",
        "Di dalam file View menggunakan sintaks HTML5 validator.",
        "Di dalam file kelas Model yang bersangkutan.",
        "Di dalam file konfigurasi `app/Config/bootstrap.php`."
      ],
      answer: 2,
      discussion: "Aturan validasi data di CakePHP 2 menjadi tanggung jawab Model Layer, yang ditulis pada array properti `public $validate`."
    },
    {
      id: 15,
      section: 1,
      sectionName: "Bagian 1: Evolusi Arsitektur Model & ORM",
      question: "Jika pada CakePHP 2 Anda menjalankan `$this->Model->find('list')`, bentuk array apa yang dihasilkan secara standar?",
      options: [
        "Array 2D berisi seluruh kolom database.",
        "Array 1D dengan key berupa Primary Key (`id`) dan value berupa field display (`name` atau `title`).",
        "Array bertingkat 3 level berdasarkan urutan penciptaan.",
        "Objek `ArrayIterator` berisi kumpulan objek string."
      ],
      answer: 1,
      discussion: "Pola `find('list')` pada CakePHP 2 didesain khusus untuk memasok data elemen HTML `<select>`, menghasilkan key => value sederhana (contoh: [1 => 'Admin', 2 => 'Member'])."
    },
    {
      id: 16,
      section: 1,
      sectionName: "Bagian 1: Evolusi Arsitektur Model & ORM",
      question: "Bagaimana cara mengakses data hasil query `$result = $this->Post->find('first');` di CakePHP 2 untuk mengambil field `title` dari Model `Post`?",
      options: [
        "`$result->title`",
        "`$result->get('title')`",
        "`$result['Post']['title']`",
        "`$result['title']`"
      ],
      answer: 2,
      discussion: "Karena CakePHP 2 mengembalikan array asosiatif murni, data diakses menggunakan array key dua tingkat: `$result['NamaAliasModel']['nama_kolom']`."
    },
    {
      id: 17,
      section: 1,
      sectionName: "Bagian 1: Evolusi Arsitektur Model & ORM",
      question: "Pada CakePHP 4, bagaimana konsep Virtual Field diubah dari pendekatan CakePHP 2?",
      options: [
        "Tetap menggunakan array `$virtualFields` pada kelas Table.",
        "Didefinisikan sebagai ekspresi SQL mentah pada file Schema.",
        "Didefinisikan sebagai accessor method di kelas Entity (misal: `_getFullName()`) dan ditambahkan ke properti `$_virtual`.",
        "Virtual field tidak lagi didukung pada CakePHP 4."
      ],
      answer: 2,
      discussion: "Di CakePHP 4, virtual field diolah di level memori PHP pada Objek Entity melalui getter method (`_getFieldName()`), bukan di-inject langsung sebagai sub-query SQL di level database seperti CakePHP 2."
    },
    {
      id: 18,
      section: 1,
      sectionName: "Bagian 1: Evolusi Arsitektur Model & ORM",
      question: "Dalam CakePHP 2, apabila dua model saling terhubung dengan relasi `hasAndBelongsToMany` (HABTM), apakah nama tabel perantara (join table) yang sesuai dengan konvensi standar penamaan?",
      options: [
        "Gabungan nama kedua tabel secara alfabetis dalam bentuk plural dipisahkan garis bawah.",
        "Gabungan nama kedua model secara alfabetis dalam bentuk singular bersambung huruf kapital.",
        "Gabungan nama kedua model secara alfabetis dalam bentuk singular dipisahkan garis bawah (underscore).",
        "Nama model induk ditambah akhiran `_pivot`."
      ],
      answer: 2,
      discussion: "Konvensi HABTM CakePHP 2 mewajibkan nama join table terdiri dari gabungan dua nama model singular yang diurutkan secara alfabetis (contoh: model `Post` dan `Tag` -> tabel `posts_tags`)."
    },
    {
      id: 19,
      section: 1,
      sectionName: "Bagian 1: Evolusi Arsitektur Model & ORM",
      question: "Apa akibatnya pada CakePHP 2 jika Anda mengeksekusi `$this->Model->save($this->request->data)` tanpa memanggil `$this->Model->create()` terlebih dahulu saat melakukan loop penciptaan beberapa data baru?",
      options: [
        "Terjadi error `Fatal Exception: Memory Overflow`.",
        "CakePHP 2 akan melakukan UPDATE pada record pertama berulang kali bukannya INSERT record baru.",
        "Semua data baru akan dibuang oleh sanitization engine.",
        "CakePHP 2 otomatis memanggil `create()` secara implisit di setiap iterasi."
      ],
      answer: 1,
      discussion: "Di CakePHP 2, properti `$this->Model->id` menyimpan ID dari record yang baru saja disimpan. Jika `create()` tidak dipanggil dalam loop, `save()` akan menganggap operasi berikutnya sebagai UPDATE pada ID yang ada."
    },
    {
      id: 20,
      section: 1,
      sectionName: "Bagian 1: Evolusi Arsitektur Model & ORM",
      question: "Metode mana di CakePHP 2 yang digunakan untuk mengeksekusi query SQL mentah (raw query) secara langsung yang mengembalikan resultSet array?",
      options: [
        "`$this->Model->query($sql);`",
        "`$this->Model->execute($sql);`",
        "`$this->Model->rawSql($sql);`",
        "`$this->Model->getORM()->sql($sql);`"
      ],
      answer: 0,
      discussion: "Untuk menjalankan custom/raw SQL di CakePHP 2, pengembang memanggil `$this->Model->query($sql)` yang mengalirkan perintah langsung ke driver DboSource."
    },
    {
      id: 21,
      section: 1,
      sectionName: "Bagian 1: Evolusi Arsitektur Model & ORM",
      question: "Bagaimana cara melakukan bypass terhadap jalannya fungsi validasi saat menyimpan data di CakePHP 2?",
      options: [
        "`$this->Model->save($data, array('validate' => false));`",
        "`$this->Model->saveUnsafe($data);`",
        "`$this->Model->skipValidation(); $this->Model->save($data);`",
        "`$this->Model->validator()->disable();`"
      ],
      answer: 0,
      discussion: "Metode `Model::save()` di CakePHP 2 menerima array options sebagai argumen kedua, di mana `'validate' => false` instruksikan framework untuk melewati proses validasi data."
    },
    {
      id: 22,
      section: 1,
      sectionName: "Bagian 1: Evolusi Arsitektur Model & ORM",
      question: "Apa kegunaan dari atribut `public $primaryKey` dalam sebuah Model CakePHP 2?",
      options: [
        "Mengubah urutan kolom di tabel.",
        "Memberitahu model nama kolom yang bertindak sebagai Primary Key jika tidak menggunakan nama bawaan konvensi (`id`).",
        "Membuat auto-increment baru pada tabel database.",
        "Menentukan komposit key bertipe UUID v4."
      ],
      answer: 1,
      discussion: "Secara konvensi CakePHP 2 mengasumsikan nama kolom Kunci Utama adalah `id`. Jika database legacy menggunakan nama lain (misal `user_id`), nama tersebut dideklarasikan pada properti `$primaryKey`."
    },
    {
      id: 23,
      section: 1,
      sectionName: "Bagian 1: Evolusi Arsitektur Model & ORM",
      question: "Dalam CakePHP 2, apa perbedan mendasar antara callback `afterFind($results, $primary = false)` dan `beforeFind($query)`?",
      options: [
        "`beforeFind` menerima array data hasil SQL, sedangkan `afterFind` menerima ekspresi kondisi.",
        "`beforeFind` dapat mengubah parameter query SQL sebelum dikirim ke DB, sedangkan `afterFind` dapat memodifikasi array data hasil query sebelum dikembalikan ke caller.",
        "`beforeFind` berjalan di Controller, `afterFind` berjalan di View.",
        "Tidak ada perbedaan, keduanya alias fungsi yang sama."
      ],
      answer: 1,
      discussion: "`beforeFind` memanipulasi parameter query (conditions, fields, order), sedangkan `afterFind` menerima data mentah yang di-fetch dari database untuk dimodifikasi sebelum dikembalikan."
    },
    {
      id: 24,
      section: 1,
      sectionName: "Bagian 1: Evolusi Arsitektur Model & ORM",
      question: "Di CakePHP 4, jika Anda ingin mengubah attribute dari sebuah Entity secara massal dengan data dari form, metode apa yang digunakan pada kelas Table?",
      options: [
        "`$table->saveArray($data)`",
        "`$table->patchEntity($entity, $data)`",
        "`$table->updateAttributes($entity, $data)`",
        "`$table->hydrate($entity, $data)`"
      ],
      answer: 1,
      discussion: "CakePHP 4 ORM mengadopsi Data Mapper di mana pengisian nilai dari form request ke dalam Objek Entity dikendalikan oleh metode `patchEntity()`."
    },
    {
      id: 25,
      section: 1,
      sectionName: "Bagian 1: Evolusi Arsitektur Model & ORM",
      question: "Pada CakePHP 2, jika kita membuat file model `app/Model/User.php`, penamaan kelas model yang benar wajib mengikuti aturan...",
      options: [
        "`class UserTable extends Model`",
        "`class User extends AppModel`",
        "`class UserModel extends CakeObject`",
        "`class Users extends Controller`"
      ],
      answer: 1,
      discussion: "Konvensi CakePHP 2 mewajibkan nama kelas berbentuk Singular PascalCase dan mewarisi (extends) dari kelas dasar `AppModel`."
    },
    {
      id: 26,
      section: 2,
      sectionName: "Bagian 2: Siklus Hidup Request, HTTP & Routing",
      question: "Dalam CakePHP 2, siklus penanganan HTTP Request dari file `index.php` sampai Controller dipicu oleh kelas utama yaitu...",
      options: [
        "`Cake\\Http\\Server`",
        "`Dispatcher` (`Dispatcher::dispatch()`)",
        "`HttpHandlerStack`",
        "`Application::middleware()`"
      ],
      answer: 1,
      discussion: "Alur arsitektur CakePHP 2 berbasis pada kelas `Dispatcher` (`lib/Cake/Routing/Dispatcher.php`) yang mencocokkan URL dan memanggil action pada Controller."
    },
    {
      id: 27,
      section: 2,
      sectionName: "Bagian 2: Siklus Hidup Request, HTTP & Routing",
      question: "Bagaimana struktur akses terhadap parameter HTTP GET dan POST di dalam Controller pada CakePHP 2?",
      options: [
        "GET via `$this->request->getQueryParams()` dan POST via `$this->request->getParsedBody()`.",
        "GET via `$this->request->query` dan POST via `$this->request->data`.",
        "GET dan POST bercampur di dalam superglobal `$_REQUEST` saja.",
        "GET via `$this->params['get']` dan POST via `$this->params['post']`."
      ],
      answer: 1,
      discussion: "CakePHP 2 menyediakan objek `CakeRequest` di mana parameter query string (GET) tersimpan di `$this->request->query` dan body payload (POST/PUT) tersimpan di `$this->request->data`."
    },
    {
      id: 28,
      section: 2,
      sectionName: "Bagian 2: Siklus Hidup Request, HTTP & Routing",
      question: "CakePHP 4 telah mematuhi standar PSR-7 untuk penanganan HTTP. Apa implikasi mendasar sifat HTTP Message PSR-7 terhadap objek Request dan Response?",
      options: [
        "Objek bersifat Mutable, atributnya dapat diubah langsung kapan saja di pertengahan skrip.",
        "Objek bersifat Immutable (tidak dapat diubah); setiap modifikasi menghasilkan instance baru dari objek tersebut.",
        "Response dituliskan langsung ke output buffer tanpa disimpan di memori.",
        "Objek request disimpan dalam bentuk session global."
      ],
      answer: 1,
      discussion: "Standar PSR-7 menetapkan bahwa Objek Request dan Response bersifat immutable. Setiap pemanggilan mutator (misal `$response->withHeader()`) mengembalikan clone objek baru."
    },
    {
      id: 29,
      section: 2,
      sectionName: "Bagian 2: Siklus Hidup Request, HTTP & Routing",
      question: "Di CakePHP 2, callback Controller manakah yang dieksekusi **sebelum** action controller dipanggil, dan sering digunakan untuk pemeriksaan autentikasi dasar?",
      options: [
        "`beforeRender()`",
        "`beforeFilter()`",
        "`initialize()`",
        "`afterFilter()`"
      ],
      answer: 1,
      discussion: "Di CakePHP 2, callback `beforeFilter()` dipanggil oleh Dispatcher sebelum mengeksekusi action yang dituju pada Controller."
    },
    {
      id: 30,
      section: 2,
      sectionName: "Bagian 2: Siklus Hidup Request, HTTP & Routing",
      question: "Arsitektur CakePHP 4 menggunakan Middleware Pipeline. Bagaimana eksekusi middleware diproses secara rinci?",
      options: [
        "Middleware dipanggil secara acak bergantung pada ukuran filenya.",
        "Middleware diproses secara berurutan dalam struktur 'Onion' (Lapis Bawang), memproses Request dalam alur masuk dan Response dalam alur keluar.",
        "Middleware hanya berjalan ketika terjadi exception di Controller.",
        "Middleware dieksekusi secara asynchronous menggunakan thread terpisah."
      ],
      answer: 1,
      discussion: "Middleware CakePHP 4 mengikuti PSR-15 Onion Architecture. Request melewati setiap layer middleware secara berurutan, lalu Response mengalir kembali melewati layer-layer tersebut dalam arah sebaliknya."
    },
    {
      id: 31,
      section: 2,
      sectionName: "Bagian 2: Siklus Hidup Request, HTTP & Routing",
      question: "Bagaimana cara melakukan pengalihan halaman (redirect) yang benar dari dalam Controller di CakePHP 2?",
      options: [
        "`return $this->redirect(array('controller' => 'users', 'action' => 'login'));`",
        "`header('Location: /users/login'); exit();`",
        "`$this->Response->toUrl('/users/login');`",
        "`throw new RedirectException('/users/login');`"
      ],
      answer: 0,
      discussion: "Pada CakePHP 2, pengalihan URL dilakukan dengan memanggil `$this->redirect()`. Praktik terbaik adalah mengembalikan (return) nilai fungsi tersebut untuk menghentikan alur kerja action."
    },
    {
      id: 32,
      section: 2,
      sectionName: "Bagian 2: Siklus Hidup Request, HTTP & Routing",
      question: "Dalam file `app/Config/routes.php` CakePHP 2, sintaks mana yang digunakan untuk memetakan URL `/login` ke Controller `Users` dan action `login`?",
      options: [
        "`Router::connect('/login', array('controller' => 'users', 'action' => 'login'));`",
        "`$routes->get('/login', ['controller' => 'Users', 'action' => 'login']);`",
        "`Route::add('/login', 'UsersController@login');`",
        "`Dispatcher::map('/login', 'users/login');`"
      ],
      answer: 0,
      discussion: "CakePHP 2 menggunakan kelas statis `Router::connect()` untuk mendaftarkan aturan routing."
    },
    {
      id: 33,
      section: 2,
      sectionName: "Bagian 2: Siklus Hidup Request, HTTP & Routing",
      question: "Bagaimana cara membaca data parameter Named (misalnya URL `/posts/index/page:2/sort:title`) pada Controller CakePHP 2?",
      options: [
        "`$this->request->getParam('named')`",
        "`$this->request->params['named']` (atau `$this->passedArgs`)",
        "`$this->request->query['named']`",
        "`$_GET['named']`"
      ],
      answer: 1,
      discussion: "CakePHP 2 mendukung Named Parameters (fitur khas era tersebut) yang diparsing oleh Router ke dalam array `$this->request->params['named']`."
    },
    {
      id: 34,
      section: 2,
      sectionName: "Bagian 2: Siklus Hidup Request, HTTP & Routing",
      question: "Di CakePHP 2, apa kegunaan dari `Component` dalam arsitektur Controller?",
      options: [
        "Merender elemen UI HTML kustom.",
        "Menyediakan logika bisnis terisolasi yang dapat dibagikan (reusable) di antara beberapa Controller berbeda.",
        "Menggantikan peran Model dalam pengolahan query database.",
        "Mengatur alur kompilasi file C++ extension."
      ],
      answer: 1,
      discussion: "Component adalah paket logika controller terpisah di CakePHP 2 (seperti `AuthComponent`, `SessionComponent`) yang digunakan kembali oleh banyak controller."
    },
    {
      id: 35,
      section: 2,
      sectionName: "Bagian 2: Siklus Hidup Request, HTTP & Routing",
      question: "Bagaimana cara mengirim variabel dari Controller ke View agar dapat dibaca di file template `.ctp` pada CakePHP 2?",
      options: [
        "`$this->View->assign('varName', $data);`",
        "`$this->set('varName', $data);`",
        "`$this->response->data['varName'] = $data;`",
        "`$this->with('varName', $data);`"
      ],
      answer: 1,
      discussion: "Metode `$this->set()` pada Controller CakePHP 2 mengekspor data ke simbolik tabel scope View template."
    },
    {
      id: 36,
      section: 2,
      sectionName: "Bagian 2: Siklus Hidup Request, HTTP & Routing",
      question: "Di CakePHP 2, file konfigurasi mana yang memuat konfigurasi dasar koneksi database (`class DATABASE_CONFIG`)?",
      options: [
        "`app/Config/app.php`",
        "`app/Config/database.php`",
        "`config/datasources.php`",
        "`core/database.yml`"
      ],
      answer: 1,
      discussion: "Konfigurasi kredensial database pada CakePHP 2 tersimpan di `app/Config/database.php` dalam sebuah kelas bernama `DATABASE_CONFIG`."
    },
    {
      id: 37,
      section: 2,
      sectionName: "Bagian 2: Siklus Hidup Request, HTTP & Routing",
      question: "Apa fungsi dari `RequestHandlerComponent` pada Controller CakePHP 2?",
      options: [
        "Mengendalikan koneksi socket ke server HTTP.",
        "Mendeteksi tipe konten request (AJAX, XML, JSON) dan mengotomatisasi penyesuaian header response atau layout layout.",
        "Menangani dekripsi data sandi enkripsi TLS.",
        "Menolak request dari alamat IP asing."
      ],
      answer: 1,
      discussion: "`RequestHandlerComponent` di CakePHP 2 bertugas memeriksa header HTTP untuk mengenali AJAX (`$this->RequestHandler->isAjax()`) atau request JSON/XML."
    },
    {
      id: 38,
      section: 2,
      sectionName: "Bagian 2: Siklus Hidup Request, HTTP & Routing",
      question: "Di CakePHP 2, jika sebuah request bertipe AJAX dikirimkan, bagaimana cara paling efisien mencegah kerangka kerja merender layout standar (`default.ctp`)?",
      options: [
        "`$this->autoRender = false;`",
        "`$this->layout = 'ajax';` (atau `$this->layout = false;`)",
        "`$this->Render->disable();`",
        "`$this->response->stop();`"
      ],
      answer: 1,
      discussion: "Mengubah `$this->layout = 'ajax'` atau `false` menginstruksikan View Engine CakePHP 2 untuk hanya merender file view `.ctp` tanpa dibungkus file layout utama."
    },
    {
      id: 39,
      section: 2,
      sectionName: "Bagian 2: Siklus Hidup Request, HTTP & Routing",
      question: "Metode mana di CakePHP 2 yang digunakan untuk menghentikan eksekusi script secara bersih dan langsung menyajikan response ke browser?",
      options: [
        "`exit();` murni.",
        "`$this->response->send(); $this->_stop();`",
        "`die('Finished');`",
        "`$this->Dispatcher->kill();`"
      ],
      answer: 1,
      discussion: "Memanggil `$this->_stop()` di Controller CakePHP 2 menghentikan eksekusi script dengan memicu siklus pembersihan internal framework."
    },
    {
      id: 40,
      section: 2,
      sectionName: "Bagian 2: Siklus Hidup Request, HTTP & Routing",
      question: "Di CakePHP 4, perpanjangan ekstensi berkas visualisasi UI (View) telah diubah dari `.ctp` menjadi...",
      options: [
        "`.blade.php`",
        "`.php`",
        "`.html.twig`",
        "`.cake`"
      ],
      answer: 1,
      discussion: "CakePHP 4 menanggalkan ekstensi khusus `.ctp` (CakePHP Template) dan mengadopsi ekstensi standar `.php` untuk file template View."
    },
    {
      id: 41,
      section: 2,
      sectionName: "Bagian 2: Siklus Hidup Request, HTTP & Routing",
      question: "Dalam Controller CakePHP 2, bagaimana cara memeriksa apakah HTTP request yang masuk menggunakan method `POST`?",
      options: [
        "`if ($_SERVER['REQUEST_METHOD'] === 'POST')`",
        "`if ($this->request->is('post'))`",
        "`if ($this->request->getMethod() == 'POST')`",
        "`if ($this->POST->exist())`"
      ],
      answer: 1,
      discussion: "Pemeriksaan tipe verb HTTP di CakePHP 2 disederhanakan melalui helper method `$this->request->is('post')` atau `$this->request->is('put')`."
    },
    {
      id: 42,
      section: 2,
      sectionName: "Bagian 2: Siklus Hidup Request, HTTP & Routing",
      question: "Apa fungsi dari `SecurityComponent` pada CakePHP 2?",
      options: [
        "Melakukan enkripsi file di direktori `/app/webroot`.",
        "Mencegah serangan CSRF (Cross-Site Request Forgery), Form Tampering, dan memvalidasi keabsahan data form SSL.",
        "Mengganti password administrator database secara periodik.",
        "Menyediakan skema autentikasi OAuth2 bawaan."
      ],
      answer: 1,
      discussion: "`SecurityComponent` CakePHP 2 menangani keamanan tingkat aplikasi, memasang token anti-CSRF, dan mencegah perusakan field form (tampering)."
    },
    {
      id: 43,
      section: 2,
      sectionName: "Bagian 2: Siklus Hidup Request, HTTP & Routing",
      question: "Jika terjadi Exception yang tidak ditangkap (uncaught exception) pada CakePHP 2, kelas mana yang menangani konversi error menjadi tampilan halaman web error HTML?",
      options: [
        "`ErrorHandler` / `ExceptionRenderer`",
        "`HttpFaultMiddleware`",
        "`AppCrashHandler`",
        "`HttpKernel`"
      ],
      answer: 0,
      discussion: "Error dan Exception penanganannya dikonfigurasi di `core.php` yang diteruskan ke kelas `ErrorHandler` dan `ExceptionRenderer` CakePHP 2."
    },
    {
      id: 44,
      section: 2,
      sectionName: "Bagian 2: Siklus Hidup Request, HTTP & Routing",
      question: "Bagaimana cara membaca Cookie yang dikirimkan client pada CakePHP 2 via `CookieComponent`?",
      options: [
        "`$this->Cookie->read('CookieName');`",
        "`$this->request->getCookie('CookieName');`",
        "`Cookie::get('CookieName');`",
        "`$_COOKIE['CookieName'];` secara langsung."
      ],
      answer: 0,
      discussion: "`CookieComponent` diakses dari Controller menggunakan sintaks `$this->Cookie->read('NamaCookie')`."
    },
    {
      id: 45,
      section: 2,
      sectionName: "Bagian 2: Siklus Hidup Request, HTTP & Routing",
      question: "Dalam CakePHP 2, di manakah posisi file penampung logika aplikasi global Controller (base Controller yang di-extend oleh controller lain)?",
      options: [
        "`app/Controller/AppController.php`",
        "`src/Controller/AppController.php`",
        "`lib/Cake/Controller/CakeController.php`",
        "`app/Vendor/AppController.php`"
      ],
      answer: 0,
      discussion: "Struktur direktori CakePHP 2 meletakkan induk dari semua controller di `app/Controller/AppController.php`."
    },
    {
      id: 46,
      section: 2,
      sectionName: "Bagian 2: Siklus Hidup Request, HTTP & Routing",
      question: "Apa nama objek helper di View CakePHP 2 yang bertugas mempermudah pembuatan form HTML beserta inputnya?",
      options: [
        "`FormBuilder`",
        "`FormHelper` (`$this->Form`)",
        "`HtmlForm`",
        "`WidgetHelper`"
      ],
      answer: 1,
      discussion: "`FormHelper` dipanggil via `$this->Form` pada file template View (`.ctp`) untuk merender tag `<form>`, `<input>`, `<select>`, dan pesan error validasi."
    },
    {
      id: 47,
      section: 2,
      sectionName: "Bagian 2: Siklus Hidup Request, HTTP & Routing",
      question: "Bagaimana cara mengakses data Session dari dalam file View (`.ctp`) di CakePHP 2?",
      options: [
        "`$this->Session->read('Auth.User.id');` (via SessionHelper)",
        "`Session::get('Auth.User.id');`",
        "`$this->request->getSession()->read('Auth.User.id');`",
        "`$_SESSION['Auth']['User']['id'];`"
      ],
      answer: 0,
      discussion: "Di CakePHP 2, akses Session dari layer View dilakukan melalui `SessionHelper` menggunakan sintaks `$this->Session->read()`."
    },
    {
      id: 48,
      section: 2,
      sectionName: "Bagian 2: Siklus Hidup Request, HTTP & Routing",
      question: "Dalam CakePHP 2, instansiasi objek `CakeResponse` memungkinkan kita mengatur HTTP Status Code dengan sintaks...",
      options: [
        "`$this->response->statusCode(404);`",
        "`$this->response->withStatus(404);`",
        "`$this->response->setHttpCode(404);`",
        "`http_response_code(404);`"
      ],
      answer: 0,
      discussion: "Sebelum adopsi immutable response PSR-7 di CakePHP 4, CakePHP 2 menggunakan metode mutable setter `$this->response->statusCode(404)`."
    },
    {
      id: 49,
      section: 2,
      sectionName: "Bagian 2: Siklus Hidup Request, HTTP & Routing",
      question: "Apa yang dimaksud dengan fitur 'Prefix Routing' di CakePHP 2 (misalnya `Routing.prefixes = array('admin');` pada `core.php`)?",
      options: [
        "Mengubah nama folder `/app` menjadi nama prefiks.",
        "Fitur yang mengarahkan URL seperti `/admin/posts/add` secara otomatis ke action `admin_add()` di `PostsController`.",
        "Membuat subdomain dinamis untuk setiap pengguna.",
        "Memampatkan output HTML dengan awalan gzip."
      ],
      answer: 1,
      discussion: "Prefix routing di CakePHP 2 memetakan skenario seperti panel admin secara otomatis ke fungsi berawalan prefiks (contoh: `admin_index()`, `admin_edit()`)."
    },
    {
      id: 50,
      section: 2,
      sectionName: "Bagian 2: Siklus Hidup Request, HTTP & Routing",
      question: "Bagaimana cara melempar error `404 Not Found` secara konvensional dari dalam Controller CakePHP 2?",
      options: [
        "`throw new NotFoundException(__('Halaman tidak ditemukan'));`",
        "`$this->abort(404);`",
        "`return $this->error404();`",
        "`$this->Response->sendError(404);`"
      ],
      answer: 0,
      discussion: "CakePHP 2 memanfaatkan mekanisme Exception berbasis SPL PHP. Melempar `NotFoundException` akan memicu penangan error untuk merender view 404."
    },
    {
      id: 51,
      section: 3,
      sectionName: "Bagian 3: Manajemen Dependensi, Autoloading & Konvensi",
      question: "Sebelum adopsi Composer dan standar PSR-4 di CakePHP 4, bagaimana CakePHP 2 memuat (load) library pihak ketiga atau kelas kustom dari folder `app/Vendor`?",
      options: [
        "Menggunakan `App::import('Vendor', 'NamaLibrary');` atau `App::uses()`.",
        "Menggunakan `composer_require_once()`.",
        "Membuat tag `<script>` pada layout.",
        "Memasukkan direktori file ke `php.ini`."
      ],
      answer: 0,
      discussion: "CakePHP 2 menggunakan utility class statis `App` (`App::uses()`, `App::import()`) untuk me-locate dan meng-include berkas PHP secara manual."
    },
    {
      id: 52,
      section: 3,
      sectionName: "Bagian 3: Manajemen Dependensi, Autoloading & Konvensi",
      question: "Apa perbedaan mendasar antara `App::uses('User', 'Model')` dan `App::import('Vendor', 'Fpdf')` pada CakePHP 2?",
      options: [
        "`App::uses()` mendaftarkan pemuatan lazily (lazy-loading) melalui autoloader, sedangkan `App::import()` langsung melakukan `include/require` seketika.",
        "`App::uses()` digunakan khusus file C extension, `App::import()` untuk file PHP.",
        "`App::import()` menghapus class dari memori setelah dipanggil.",
        "Tidak ada perbedaan, keduanya fungsi persis sama."
      ],
      answer: 0,
      discussion: "`App::uses()` mendaftarkan pemetaan nama kelas ke lokasi berkas untuk dipanggil autoloader CakePHP 2 saat kelas dibutuhkan, sedangkan `App::import()` bertindak sebagai wrapper immediate file inclusion."
    },
    {
      id: 53,
      section: 3,
      sectionName: "Bagian 3: Manajemen Dependensi, Autoloading & Konvensi",
      question: "Di CakePHP 4, mekanisme pemuatan kelas sepenuhnya mengandalkan Composer PSR-4. Apa namespace bawaan (root namespace) aplikasi secara default?",
      options: [
        "`Cake\\Application`",
        "`App\\`",
        "`Application\\`",
        "`CakePHP\\App\\`"
      ],
      answer: 1,
      discussion: "Struktur standar CakePHP 4 memetakan direktori `src/` ke root namespace `App\\` melalui konfiguarasi PSR-4 Composer."
    },
    {
      id: 54,
      section: 3,
      sectionName: "Bagian 3: Manajemen Dependensi, Autoloading & Konvensi",
      question: "Pada CakePHP 2, di manakah Plugin ditempatkan dalam struktur aplikasi web?",
      options: [
        "Di folder `vendor/cakephp/plugins/`",
        "Di folder `app/Plugin/`",
        "Di folder `app/Config/Plugins/`",
        "Di luar root directory aplikasi."
      ],
      answer: 1,
      discussion: "Arsitektur plugin CakePHP 2 bersifat self-contained dan diletakkan di dalam folder `app/Plugin/` (misal: `app/Plugin/DebugKit`)."
    },
    {
      id: 55,
      section: 3,
      sectionName: "Bagian 3: Manajemen Dependensi, Autoloading & Konvensi",
      question: "Bagaimana cara memuat (load) sebuah Plugin agar aktif di CakePHP 2?",
      options: [
        "Menambahkan `CakePlugin::load('NamaPlugin');` di dalam file `app/Config/bootstrap.php`.",
        "Menulis `composer require plugin-name` di terminal.",
        "Mengedit file `.htaccess` di folder root.",
        "Memanggil `$this->loadPlugin()` di Controller."
      ],
      answer: 0,
      discussion: "Inisialisasi plugin CakePHP 2 wajib dilakukan di `app/Config/bootstrap.php` menggunakan fungsi statis `CakePlugin::load()` atau `CakePlugin::loadAll()`."
    },
    {
      id: 56,
      section: 3,
      sectionName: "Bagian 3: Manajemen Dependensi, Autoloading & Konvensi",
      question: "Dalam CakePHP 2, bagaimana penulisan konvensi syntax titik (Dot Notation) digunakan untuk memanggil Model dari sebuah Plugin (misal Plugin `ContactManager`, Model `Contact`)?",
      options: [
        "`ClassRegistry::init('ContactManager.Contact');`",
        "`TableRegistry::getTableLocator()->get('ContactManager\\Contact');`",
        "`App::import('ContactManager/Contact');`",
        "`new ContactManagerController->Contact;`"
      ],
      answer: 0,
      discussion: "CakePHP 2 secara luas mengadopsi dot notation `'PluginName.ModelName'` untuk merujuk pada resource milik plugin."
    },
    {
      id: 57,
      section: 3,
      sectionName: "Bagian 3: Manajemen Dependensi, Autoloading & Konvensi",
      question: "Konsep Dependency Injection (DI) Container mulai diperkenalkan secara native di CakePHP 4.2+. Bagaimana dependensi di-inject di CakePHP 2?",
      options: [
        "Menggunakan Service Container berbasis PSR-11 secara otomatis.",
        "Tidak ada DI Container native; dependensi diinstansiasi secara manual, via Service Locator `ClassRegistry`, atau di-attach sebagai property controller secara magic.",
        "Menggunakan kompiler Dagger2.",
        "Mengandalkan anotasi `@Inject` pada skrip PHP."
      ],
      answer: 1,
      discussion: "CakePHP 2 belum memiliki DI Container. Objek dibuat secara tight-coupling atau diambil secara global dari singleton registry (`ClassRegistry::init()`)."
    },
    {
      id: 58,
      section: 3,
      sectionName: "Bagian 3: Manajemen Dependensi, Autoloading & Konvensi",
      question: "Di CakePHP 2, kelas `ClassRegistry` berfungsi sebagai...",
      options: [
        "Database migration engine.",
        "Singleton factory & registry yang menyimpan instance objek-objek Model yang telah diinstansiasi di memori.",
        "Validator tipe data pada form HTML.",
        "Compiler template `.ctp`."
      ],
      answer: 1,
      discussion: "`ClassRegistry::init('ModelName')` bertindak sebagai Service Locator/Singleton penampung instance Model di CakePHP 2 agar tidak terjadi duplikasi instansiasi."
    },
    {
      id: 59,
      section: 3,
      sectionName: "Bagian 3: Manajemen Dependensi, Autoloading & Konvensi",
      question: "Di mana lokasi penempatan library kode eksternal murni (seperti SDK pihak ketiga non-CakePHP) pada CakePHP 2?",
      options: [
        "`app/Vendor/`",
        "`src/Vendor/`",
        "`lib/ThirdParty/`",
        "`vendor/` di root direktori."
      ],
      answer: 0,
      discussion: "Sebelum Composer populer, aplikasi CakePHP 2 menampung pustaka pihak ketiga buatan luar di folder `app/Vendor/`."
    },
    {
      id: 60,
      section: 3,
      sectionName: "Bagian 3: Manajemen Dependensi, Autoloading & Konvensi",
      question: "Apa fungsi dari file `app/Config/core.php` pada CakePHP 2?",
      options: [
        "Menyimpan password akun root MySQL.",
        "Mengonfigurasi level debug (`Configure::write('debug', 2)`), salt enkripsi aplikasi, dan penanganan session global.",
        "Mendaftarkan route URL secara spesifik.",
        "Mengatur autoloader composer."
      ],
      answer: 1,
      discussion: "`core.php` merupakan pusat kontrol parameter runtime CakePHP 2, memuat variabel Debug level, Security Salt, dan Session configuration."
    },
    {
      id: 61,
      section: 3,
      sectionName: "Bagian 3: Manajemen Dependensi, Autoloading & Konvensi",
      question: "Bagaimana cara membaca variabel konfigurasi yang ditetapkan via `Configure::write('Custom.setting', 'value');` di tempat lain dalam aplikasi CakePHP 2?",
      options: [
        "`Configure::read('Custom.setting');`",
        "`$this->Config->get('Custom.setting');`",
        "`env('Custom.setting');`",
        "`$_CONFIG['Custom']['setting'];`"
      ],
      answer: 0,
      discussion: "Kelas `Configure` adalah registry statis di CakePHP 2 untuk menyimpan dan membaca pasangan key-value konfigurasi global."
    },
    {
      id: 62,
      section: 3,
      sectionName: "Bagian 3: Manajemen Dependensi, Autoloading & Konvensi",
      question: "Dalam CakePHP 2, struktur direktori `app/Console/` dipergunakan untuk...",
      options: [
        "Menyimpan berkas log JavaScript browser.",
        "Menyimpan script Shell dan Task yang dijalankan melalui CLI (Command Line Interface) menggunakan perintah `cake`.",
        "Menampilkan output console pada panel web debug.",
        "Mengompres file CSS dan JS."
      ],
      answer: 1,
      discussion: "Semua CLI Shell (misal script cron job atau console task) di CakePHP 2 dibuat sebagai kelas turunan `AppShell` di bawah folder `app/Console/Command/`."
    },
    {
      id: 63,
      section: 3,
      sectionName: "Bagian 3: Manajemen Dependensi, Autoloading & Konvensi",
      question: "Apa perbedaan penulisan nama file untuk kelas Controller `UsersController` antara CakePHP 2 dan CakePHP 4?",
      options: [
        "CakePHP 2: `UsersController.php` di `app/Controller/`; CakePHP 4: `UsersController.php` di `src/Controller/` (Penamaan file sama, letak direktori dan namespace berbeda).",
        "CakePHP 2: `users_controller.php`; CakePHP 4: `Users.controller.php`.",
        "CakePHP 2: `USERS.php`; CakePHP 4: `UsersController.php`.",
        "Tidak ada perbedaan sama sekali termasuk folder lokasinya."
      ],
      answer: 0,
      discussion: "Kedua versi menggunakan nama berkas PascalCase `UsersController.php`, namun CakePHP 2 menempatkannya di `app/Controller/` tanpa namespace, sedangkan CakePHP 4 di `src/Controller/` dengan namespace `App\\Controller`."
    },
    {
      id: 64,
      section: 3,
      sectionName: "Bagian 3: Manajemen Dependensi, Autoloading & Konvensi",
      question: "Di CakePHP 2, apa kegunaan dari `Behavior` pada Model?",
      options: [
        "Menangani logika tampilan HTML.",
        "Mekanisme Mixin/Horizontal Inheritance untuk mengisolasi dan membagikan fungsi-fungsi model (misal: `TreeBehavior`, `SluggableBehavior`) antar-Model.",
        "Menjalankan tugas asynchronous background worker.",
        "Menyaring virus pada berkas unggahan."
      ],
      answer: 1,
      discussion: "Behavior memungkinkan logika data layer (seperti Tree, Sluggable, Timestamp) diisap (attached) ke berbagai Model berbeda (`public $actsAs = array('Tree');`)."
    },
    {
      id: 65,
      section: 3,
      sectionName: "Bagian 3: Manajemen Dependensi, Autoloading & Konvensi",
      question: "Bagaimana cara menyertakan Helper kustom (misal `MyCustomHelper`) di Controller CakePHP 2 agar dapat dipakai pada View?",
      options: [
        "Menambahkan `public $helpers = array('MyCustom');` pada Controller.",
        "Memanggil `App::import('Helper', 'MyCustom');` di file `.ctp`.",
        "Menginstal helper lewat Composer.",
        "Helper ter-load otomatis tanpa perlu dideklarasikan."
      ],
      answer: 0,
      discussion: "Controller CakePHP 2 mendeklarasikan array `$helpers` untuk menentukan daftar helper UI yang diinjeksikan ke dalam View."
    },
    {
      id: 66,
      section: 3,
      sectionName: "Bagian 3: Manajemen Dependensi, Autoloading & Konvensi",
      question: "Di CakePHP 2, jika kita menaruh file `global_functions.php` di `app/Config/bootstrap.php`, kapan file tersebut dieksekusi?",
      options: [
        "Saat dipanggil oleh Controller saja.",
        "Seketika pada awal siklus bootstrap aplikasi untuk setiap request HTTP atau permohonan CLI.",
        "Hanya saat mode Debug bernilai 2.",
        "Saat database terkoneksi."
      ],
      answer: 1,
      discussion: "`app/Config/bootstrap.php` dieksekusi di setiap siklus inisialisasi framework, menjadikannya tempat ideal memuat fungsi pembantu global atau konstanta."
    },
    {
      id: 67,
      section: 3,
      sectionName: "Bagian 3: Manajemen Dependensi, Autoloading & Konvensi",
      question: "Apa fungsi dari folder `app/webroot/` pada struktur arsitektur CakePHP 2?",
      options: [
        "Menyimpan kode program utama framework.",
        "Satu-satunya folder yang diekspos secara publik oleh Web Server (DocumentRoot), memuat asset statis seperti `index.php`, CSS, JS, dan Images.",
        "Menampung file backup database.",
        "Folder sementara untuk tempat file cache."
      ],
      answer: 1,
      discussion: "`webroot` bertindak sebagai publik entrance point untuk mengisolasi berkas sensitif PHP aplikasi dari akses HTTP langsung."
    },
    {
      id: 68,
      section: 3,
      sectionName: "Bagian 3: Manajemen Dependensi, Autoloading & Konvensi",
      question: "Manakah cara penulisan penanganan pemuatan kelas model `User` secara eksplisit dari dalam kode non-controller di CakePHP 2?",
      options: [
        "`$User = ClassRegistry::init('User');`",
        "`$User = new UserTable();`",
        "`$User = Container::get('User');`",
        "`$User = App::loadModel('User');`"
      ],
      answer: 0,
      discussion: "Di luar Controller (misal pada Shell atau Utility class), `ClassRegistry::init('User')` digunakan untuk menginstansiasi objek Model `User`."
    },
    {
      id: 69,
      section: 3,
      sectionName: "Bagian 3: Manajemen Dependensi, Autoloading & Konvensi",
      question: "Pada CakePHP 2, variabel `Security.salt` yang ada di `app/Config/core.php` digunakan untuk...",
      options: [
        "Membuat tabel database acak.",
        "Garam enkripsi (salt) dalam proses pengacakan hash kata sandi dan enkripsi cookie/string.",
        "Mencegah serangan DDoS pada port TCP.",
        "Mengompresi memori RAM PHP."
      ],
      answer: 1,
      discussion: "`Security.salt` adalah string acak yang digabungkan saat generasi cryptographic hash (seperti `AuthComponent::password()`)."
    },
    {
      id: 70,
      section: 3,
      sectionName: "Bagian 3: Manajemen Dependensi, Autoloading & Konvensi",
      question: "Di CakePHP 4, skema konfigurasi aplikasi bermigrasi dari sintaks `Configure::write()` dalam file PHP murni berformat CakePHP 2 ke file array terpisah bertipe...",
      options: [
        "`app.php` dan `app_local.php` yang mengembalikan (return) array asosiatif PHP.",
        "`config.xml`",
        "`settings.ini`",
        "File JSON tunggal `app.json`."
      ],
      answer: 0,
      discussion: "CakePHP 4 menggunakan file `config/app.php` dan `config/app_local.php` yang mengembalikan array konfigurasi terstruktur."
    },
    {
      id: 71,
      section: 3,
      sectionName: "Bagian 3: Manajemen Dependensi, Autoloading & Konvensi",
      question: "Dalam CakePHP 2, di manakah berkas temporary/cache (seperti skema database terkompilasi, session file) disimpan secara default?",
      options: [
        "`app/tmp/`",
        "`src/tmp/`",
        "`/var/log/cakephp/`",
        "`app/webroot/cache/`"
      ],
      answer: 0,
      discussion: "CakePHP 2 menyimpan data ephemeral (cache, logs, sessions, views compiled) di bawah direktori `app/tmp/`."
    },
    {
      id: 72,
      section: 3,
      sectionName: "Bagian 3: Manajemen Dependensi, Autoloading & Konvensi",
      question: "Konvensi penamaan file untuk kelas Model `ArticleDetail` pada CakePHP 2 adalah...",
      options: [
        "`app/Model/ArticleDetail.php`",
        "`app/Model/article_detail.php`",
        "`app/Model/ArticleDetails.php`",
        "`app/Model/article-detail.php`"
      ],
      answer: 0,
      discussion: "File kelas di CakePHP 2 wajib mengikuti PascalCase sesuai dengan nama kelas yang dideklarasikan di dalamnya (`ArticleDetail.php`)."
    },
    {
      id: 73,
      section: 3,
      sectionName: "Bagian 3: Manajemen Dependensi, Autoloading & Konvensi",
      question: "Di CakePHP 2, jika kita ingin memuat model tambahan di Controller selain model utamanya, metode apa yang dipanggil?",
      options: [
        "`$this->loadModel('Post');`",
        "`$this->importModel('Post');`",
        "`$this->Models->attach('Post');`",
        "`$this->addModel('Post');`"
      ],
      answer: 0,
      discussion: "Metode `$this->loadModel('NamaModel')` menginstansiasi model ekstra dan menempelkannya sebagai properti controller (`$this->Post`)."
    },
    {
      id: 74,
      section: 3,
      sectionName: "Bagian 3: Manajemen Dependensi, Autoloading & Konvensi",
      question: "Apa kegunaan dari variabel properti `public $uses` pada Controller CakePHP 2?",
      options: [
        "Mendefinisikan daftar plugin yang akan dipakai.",
        "Mendefinisikan daftar Model yang akan diinstansiasi secara otomatis saat Controller diinisialisasi.",
        "Menentukan tipe respon format output.",
        "Menggantikan fungsionalitas autoloader PHP."
      ],
      answer: 1,
      discussion: "Secara default Controller memuat Model bertipe nama tunggal dari nama Controller. Jika `public $uses = array('Post', 'Category');` diatur, Controller memasang kedua model tersebut."
    },
    {
      id: 75,
      section: 3,
      sectionName: "Bagian 3: Manajemen Dependensi, Autoloading & Konvensi",
      question: "Di CakePHP 2, bagaimana cara menonaktifkan penggunaan Model pada sebuah Controller yang tidak berhubungan dengan database?",
      options: [
        "`public $uses = false;` (atau `public $uses = array();`)",
        "`public $useTable = false;`",
        "`public $model = null;`",
        "`$this->disableModel();`"
      ],
      answer: 0,
      discussion: "Mengatur `public $uses = false;` pada kelas Controller memberitahu CakePHP 2 untuk tidak menginstansiasi model default apapun."
    },
    {
      id: 76,
      section: 4,
      sectionName: "Bagian 4: Dampak Performa, Type Safety & Lingkungan PHP",
      question: "CakePHP 2 dirilis untuk mendukung lingkungan PHP 5 (dengan detail target spesifik PHP 5.6.9). Apa keterbatasan PHP 5.6 yang memengaruhi desain arsitektur CakePHP 2?",
      options: [
        "Kurangnya dukungan Return Type Declarations, Scalar Type Hints, dan Anonymous Classes.",
        "Tidak mendukung koneksi ke database MySQL.",
        "Tidak bisa menjalankan kode berorientasi objek (OOP).",
        "Tidak memiliki fungsi `array_merge`."
      ],
      answer: 0,
      discussion: "PHP 5.6 belum mendukung Type Hinting skalar (string, int, bool) pada parameter/return type dan Anonymous Classes, memaksa CakePHP 2 mengandalkan dynamic typing dan variadic array options."
    },
    {
      id: 77,
      section: 4,
      sectionName: "Bagian 4: Dampak Performa, Type Safety & Lingkungan PHP",
      question: "CakePHP 4 dirancang memanfaatkan PHP 7.4/8.2 (hingga 8.2.29). Manakah fitur PHP 8.0+ yang secara masif meningkatkan Type Safety pada ORM CakePHP 4?",
      options: [
        "Union Types, Named Arguments, Constructor Property Promotion, dan Strict Typing (`declare(strict_types=1)`).",
        "Penghapusan fitur `eval()`.",
        "Perubahan tag PHP `<?php` menjadi `<script language=\"php\">`.",
        "Dukungan penuh terhadap library GD versi lama."
      ],
      answer: 0,
      discussion: "CakePHP 4 memanfaatkan penuh type hint modern PHP 7.4/8.x (seperti Union Types, strict types) yang memungkinkan static analysis (PHPStan) menangkap bug sebelum runtime."
    },
    {
      id: 78,
      section: 4,
      sectionName: "Bagian 4: Dampak Performa, Type Safety & Lingkungan PHP",
      question: "Mengapa dynamic typing yang berlebihan pada CakePHP 2 (misal: method mengembalikan array asosiatif, boolean `false`, atau `null` secara bergantian) meningkatkan kompleksitas debugging?",
      options: [
        "Karena PHP 5.6 akan otomatis melempar `Fatal Crash` jika tipe data tidak konsisten.",
        "Karena IDE tidak dapat memberikan autocompletion yang akurat, dan kesalahan tipe data (seperti mengakses array key pada nilai boolean) baru terdeteksi saat runtime.",
        "Karena array asosiatif mempercepat eksekusi memory heap.",
        "Karena dynamic typing mematikan log error PHP."
      ],
      answer: 1,
      discussion: "Pengembalian tipe data bermacam-macam (mixed return types) tanpa type definition di PHP 5.6 menyebabkan IDE gagal memberikan intellisense dan memicu error `Getting property of non-object` atau `Undefined index` di tingkat runtime."
    },
    {
      id: 79,
      section: 4,
      sectionName: "Bagian 4: Dampak Performa, Type Safety & Lingkungan PHP",
      question: "Di CakePHP 2, jika metode `$this->Model->find('first')` tidak menemukan data di database, apakah nilai kembaliannya?",
      options: [
        "Mengembalikan `false` (atau array kosong `array()`).",
        "Melempar `RecordNotFoundException`.",
        "Mengembalikan Objek `NullEntity`.",
        "Menghentikan skrip dengan error code `500`."
      ],
      answer: 0,
      discussion: "Jika data tidak ditemukan, `find('first')` pada CakePHP 2 mengembalikan boolean `false` atau array kosong, sehingga pengembang harus membuat pengecekan manual `if (!empty($data))`."
    },
    {
      id: 80,
      section: 4,
      sectionName: "Bagian 4: Dampak Performa, Type Safety & Lingkungan PHP",
      question: "Di CakePHP 4, jika Anda menggunakan `$table->get($id)`, apa yang terjadi jika Primary Key tersebut tidak ada di database?",
      options: [
        "Mengembalikan array kosong.",
        "Mengembalikan `null`.",
        "Melempar `Cake\\Datasource\\Exception\\RecordNotFoundException`.",
        "Mengembalikan angka 0."
      ],
      answer: 2,
      discussion: "Metode `get()` pada CakePHP 4 mematuhi fail-fast pattern dengan melempar `RecordNotFoundException` jika data tidak ditemukan, berbeda dengan pencarian berbasis array di CakePHP 2."
    },
    {
      id: 81,
      section: 4,
      sectionName: "Bagian 4: Dampak Performa, Type Safety & Lingkungan PHP",
      question: "Bila dibandingkan dari konsumsi memori saat menangani dataset besar (misal 10.000 baris record), mengapa ORM CakePHP 4 berbasis Object Hydration/Iterator bisa lebih efisien dibanding pengembalian Array Asosiatif masif CakePHP 2?",
      options: [
        "Karena CakePHP 2 mengubah array menjadi XML terlebih dahulu.",
        "Karena CakePHP 4 Query mengimplementasikan `ResultSet` yang dapat di-stream dan diproses secara lazy via Iteration tanpa memuat seluruh array raksasa sekaligus ke RAM.",
        "Karena PHP 8.2 melarang penggunaan memori di atas 2MB.",
        "Karena CakePHP 4 menyimpan data di browser cookie."
      ],
      answer: 1,
      discussion: "ResultSet CakePHP 4 memanfaatkan PHP Traversable/Iterators untuk mengalirkan data (streaming), sedangkan `find('all')` CakePHP 2 menyusun seluruh array raksasa di dalam RAM PHP sekaligus."
    },
    {
      id: 82,
      section: 4,
      sectionName: "Bagian 4: Dampak Performa, Type Safety & Lingkungan PHP",
      question: "Apa fungsi dari `declare(strict_types=1);` yang banyak ditemukan di berkas berkas CakePHP 4 modern?",
      options: [
        "Mengunci kode agar tidak dapat diubah oleh pengembang lain.",
        "Memaksa PHP untuk melempar `TypeError` jika tipe argumen yang dimasukkan ke fungsi tidak persis sesuai dengan pendeklarasian tipe hints.",
        "Mematikan fungsi garabage collector PHP.",
        "Mempercepat sintaks loop `for` sebesar 50%."
      ],
      answer: 1,
      discussion: "`strict_types=1` memastikan tipe data scalar (int, string, bool, float) diperiksa secara ketat tanpa coercion otomatis yang implisit."
    },
    {
      id: 83,
      section: 4,
      sectionName: "Bagian 4: Dampak Performa, Type Safety & Lingkungan PHP",
      question: "Pada CakePHP 2, jika kita salah mengetikkan nama kolom pada array conditions find (misal: `'Post.titel'` yang seharusnya `'Post.title'`), kapan error akan terdeteksi?",
      options: [
        "Saat file disimpan oleh Text Editor.",
        "Saat eksekusi query dikirim ke Database Driver (MySQL Error: Unknown column).",
        "Saat proses kompilasi kode PHP.",
        "Error diabaikan dan dianggap sebagai string kosong."
      ],
      answer: 1,
      discussion: "Karena conditions di CakePHP 2 ditulis sebagai string mentah dalam array asosiatif, kesalahan penulisan kolom tidak terdeteksi oleh static analyzer dan baru memicu PDO Exception saat query dieksekusi di database."
    },
    {
      id: 84,
      section: 4,
      sectionName: "Bagian 4: Dampak Performa, Type Safety & Lingkungan PHP",
      question: "Peningkatan performa mesin eksekusi PHP (Zend Engine) dari PHP 5.6 (CakePHP 2) ke PHP 8.2 (CakePHP 4) membawa peningkatan kecepatan response aplikasi terutama disebabkan oleh...",
      options: [
        "Peningkatan struktur data internal Hashtable, Optimasi AST (Abstract Syntax Tree), dan pengenalan JIT (Just-In-Time) Compiler di PHP 8.",
        "Penghapusan dukungan terhadap database MySQL.",
        "Penggunaan format berkas HTML6.",
        "Perubahan nama ekstensi dari .php menjadi .cake."
      ],
      answer: 0,
      discussion: "Evolusi PHP 7.0 hingga 8.2 merombak total efisiensi memori zval, kompilasi Opcode via AST, dan pengenalan JIT compiler pada PHP 8, membuat eksekusi CPU-bound jauh lebih cepat."
    },
    {
      id: 85,
      section: 4,
      sectionName: "Bagian 4: Dampak Performa, Type Safety & Lingkungan PHP",
      question: "Dalam CakePHP 2, bagaimana penanganan kesalahan runtime (Runtime Error Handler) menyajikan error jika `Configure::read('debug')` diatur ke nilai `0`?",
      options: [
        "Menampilkan detail Stack Trace lengkap beserta baris kode yang rusak.",
        "Menyembunyikan detail teknis dan menyajikan halaman publik generik 'An Internal Error Has Occurred'.",
        "Mengirimkan pesan SMS ke nomor administrator.",
        "Merestart web server Apache."
      ],
      answer: 1,
      discussion: "Pada CakePHP 2, `debug = 0` mematikan keluaran error sensitif ke browser dan menampilkan pesan ramah pengguna demi alasan keamanan produksi."
    },
    {
      id: 86,
      section: 4,
      sectionName: "Bagian 4: Dampak Performa, Type Safety & Lingkungan PHP",
      question: "Apa kelemahan utama dari mekanisme Caching Skema Database di CakePHP 2 (`app/tmp/cache/models`)?",
      options: [
        "Caching skema membuat database MySQL tidak bisa di-update.",
        "Jika terjadi perubahan struktur tabel (misal menambah kolom baru di MySQL), aplikasi CakePHP 2 tetap menggunakan skema lama hingga cache file di `tmp/cache/models` dihapus secara manual.",
        "File cache skema otomatis terhapus setiap detik.",
        "Cache skema memakan kuota harddisk hingga terisi penuh."
      ],
      answer: 1,
      discussion: "CakePHP 2 menyimpan definisi kolom tabel dalam cache. Saat struktur database berubah di lingkungan produksi/dev, cache skema harus dibersihkan secara manual agar kolom baru dapat dikenali."
    },
    {
      id: 87,
      section: 4,
      sectionName: "Bagian 4: Dampak Performa, Type Safety & Lingkungan PHP",
      question: "Bagaimana cara kerja Caching Query/View di CakePHP 2 menggunakan kelas statis `Cache`?",
      options: [
        "`Cache::write('key_name', $data, 'config_name');` dan `Cache::read('key_name', 'config_name');`",
        "`$this->Cache->set('key', $data);`",
        "`CacheEngine::store('key', $data);`",
        "`memcached_set('key', $data);`"
      ],
      answer: 0,
      discussion: "CakePHP 2 menyediakan abstraksi caching universal melalui fungsi statis `Cache::write()` dan `Cache::read()` dengan pendukung engine seperti File, APC, atau Memcached."
    },
    {
      id: 88,
      section: 4,
      sectionName: "Bagian 4: Dampak Performa, Type Safety & Lingkungan PHP",
      question: "Dalam PHP 8.2 (lingkungan CakePHP 4 modern), penganggapan properti dinamis (Dynamic Properties) yang tidak dideklarasikan pada kelas akan...",
      options: [
        "Diabaikan tanpa efek samping.",
        "Didepresiasi (Deprecated) dan akan melempar Error di versi PHP mendatang.",
        "Secara otomatis menambahkan definisi variabel ke file `.php`.",
        "Meningkatkan performa aplikasi secara drastis."
      ],
      answer: 1,
      discussion: "PHP 8.2 mendepresiasi pembuatan properti dinamis tanpa deklarasi eksplisit (`#[\AllowDynamicProperties]`), sebuah pola yang dahulu sangat masif dipakai pada CakePHP 2 era PHP 5."
    },
    {
      id: 89,
      section: 4,
      sectionName: "Bagian 4: Dampak Performa, Type Safety & Lingkungan PHP",
      question: "Pada CakePHP 2, jika sebuah operasi validasi gagal pada `$this->Model->save($data)`, di manakah pesan kesalahan disimpan?",
      options: [
        "Di dalam properti `$this->Model->validationErrors`.",
        "Di dalam variabel global `$_SESSION['errors']`.",
        "Di dalam file log `app/tmp/logs/error.log`.",
        "Data langsung dibuang dan error tidak dicatat."
      ],
      answer: 0,
      discussion: "Ketika `save()` pada CakePHP 2 mengembalikan `false` akibat kegagalan validasi, daftar detail kesalahan tersimpan dalam array `$this->Model->validationErrors`."
    },
    {
      id: 90,
      section: 4,
      sectionName: "Bagian 4: Dampak Performa, Type Safety & Lingkungan PHP",
      question: "Di CakePHP 4, Objek `Entity` menyediakan fitur Immutability & Tracking. Bagaimana cara memeriksa apakah suatu bidang (field) data pada Entity telah diubah nilainya?",
      options: [
        "`$entity->isDirty('field_name')`",
        "`$entity->hasChanged('field_name')`",
        "`$entity->isModified('field_name')`",
        "`$entity->checkDirtyState()`"
      ],
      answer: 0,
      discussion: "CakePHP 4 Entity melacak status modifikasi properti menggunakan metode `$entity->isDirty('field_name')`."
    },
    {
      id: 91,
      section: 4,
      sectionName: "Bagian 4: Dampak Performa, Type Safety & Lingkungan PHP",
      question: "Pada CakePHP 2, apakah metode `$this->Model->find('all')` mengembalikan Objek Iterator atau Array PHP murni?",
      options: [
        "Mengembalikan Objek Generator PHP 5.5.",
        "Mengembalikan Array PHP asosiatif murni.",
        "Mengembalikan Objek `SplFixedArray`.",
        "Mengembalikan String JSON terkompresi."
      ],
      answer: 1,
      discussion: "CakePHP 2 murni mengembalikan Data Structures bertipe native Array PHP."
    },
    {
      id: 92,
      section: 4,
      sectionName: "Bagian 4: Dampak Performa, Type Safety & Lingkungan PHP",
      question: "Mengapa penggunaan fungsi `Sanitize::clean()` yang populer di CakePHP 2 (era PHP 5) kini didepresiasi dan tidak digunakan lagi di CakePHP 4?",
      options: [
        "Karena fungsi tersebut memperlambat server hingga 90%.",
        "Karena sanitasi global yang tidak tepat dapat merusak data asli, dan praktik modern lebih mengandalkan Prepared Statements (untuk SQL) dan Contextual Escaping pada View (untuk XSS).",
        "Karena database MySQL modern tidak mempan terhadap SQL Injection.",
        "Karena PHP 8 sudah menghapus tipe data String."
      ],
      answer: 1,
      discussion: "Kelas `Sanitize` CakePHP 2 di-deprecated karena pendekatan 'blind sanitization' terbukti cacat secara konseptual. Keamanan modern memisahkan SQL Escaping (Prepared Statement) dengan Output Escaping di layer View."
    },
    {
      id: 93,
      section: 4,
      sectionName: "Bagian 4: Dampak Performa, Type Safety & Lingkungan PHP",
      question: "Bagaimana cara melakukan enkripsi/hashing kata sandi secara konvensional pada CakePHP 2 sebelum disimpannya data pengguna?",
      options: [
        "`AuthComponent::password($rawPassword);` (menggunakan SHA1/Blowfish bergantung konfigurasi)",
        "`password_hash($rawPassword, PASSWORD_BCRYPT);` secara eksplisit saja.",
        "`md5($rawPassword);`",
        "`Security::encrypt($rawPassword);`"
      ],
      answer: 0,
      discussion: "Pada CakePHP 2, `AuthComponent::password()` dipanggil di callback `beforeSave()` Model untuk menghash kata sandi sebelum disimpan ke database."
    },
    {
      id: 94,
      section: 4,
      sectionName: "Bagian 4: Dampak Performa, Type Safety & Lingkungan PHP",
      question: "Dalam CakePHP 2, apa implikasi keamanan dari membiarkan `Configure::write('debug', 2)` tetap aktif di lingkungan Produksi (Live Server)?",
      options: [
        "Database akan otomatis meng-erase seluruh isi tabel.",
        "DebugKit dan Exception Handler menyajikan detail konfigurasi server, kredensial DB, dan struktur Query SQL secara terbuka yang memicu kerentanan Information Disclosure.",
        "Aplikasi tidak dapat menerima HTTP POST request.",
        "Website otomatis mengalami deface."
      ],
      answer: 1,
      discussion: "Mode debug > 0 menampilkan rincian error internal, query SQL, dan jalur berkas fisik server yang sangat berbahaya jika diekspos di lingkungan publik."
    },
    {
      id: 95,
      section: 4,
      sectionName: "Bagian 4: Dampak Performa, Type Safety & Lingkungan PHP",
      question: "Dalam CakePHP 4, jika Anda mencoba mempassing argumen dengan tipe data yang salah ke metode bertipe hint strict (misal: mempassing `string` ke method yang meminta `int`), apa Exception yang dilempar oleh PHP 8?",
      options: [
        "`ArgumentTypeError`",
        "`TypeError`",
        "`InvalidDataTypeException`",
        "`CastFailedException`"
      ],
      answer: 1,
      discussion: "Engine PHP 7/8 melempar `TypeError` bawaan SPL ketika terjadi pelanggaran Type Safety pada fungsi berketerangan strict types."
    },
    {
      id: 96,
      section: 4,
      sectionName: "Bagian 4: Dampak Performa, Type Safety & Lingkungan PHP",
      question: "Apa perbedaan mendasar antara `CakeRequest` di CakePHP 2 dan `ServerRequest` di CakePHP 4 dari sudut pandang pemodelan Objek?",
      options: [
        "`CakeRequest` CakePHP 2 adalah Mutator Object tunggal (stateful), sedangkan `ServerRequest` CakePHP 4 mengimplementasikan PSR-7 Immutable Interface (stateless/value object).",
        "`CakeRequest` dibuat menggunakan C extension.",
        "`ServerRequest` tidak bisa membaca query string GET.",
        "Tidak ada perbedaan mendasar selain penamaan kelas."
      ],
      answer: 0,
      discussion: "Objek Request CakePHP 2 dapat diubah nilainya di pertengahan alur (mutable), sementara Request CakePHP 4 mematuhi imutabilitas PSR-7."
    },
    {
      id: 97,
      section: 4,
      sectionName: "Bagian 4: Dampak Performa, Type Safety & Lingkungan PHP",
      question: "Pada CakePHP 2, di mana log aplikasi disimpan jika kita memanggil fungsi `this->log('Pesan Error', 'custom_log');`?",
      options: [
        "`app/tmp/logs/custom_log.log`",
        "`src/logs/custom_log.log`",
        "`/var/log/syslog`",
        "`app/Config/logs/custom_log.txt`"
      ],
      answer: 0,
      discussion: "Fungsi `log()` di CakePHP 2 menulis berkas catatan log secara langsung ke direktori `app/tmp/logs/`."
    },
    {
      id: 98,
      section: 4,
      sectionName: "Bagian 4: Dampak Performa, Type Safety & Lingkungan PHP",
      question: "Fitur PHP 8.1+ manakah yang digunakan oleh CakePHP 4.3+ untuk menggantikan tipe konstanta string/integer tradisional pada status enum database?",
      options: [
        "Native Backed Enums (`enum Status: string`)",
        "Dynamic Constants",
        "Define Array",
        "Scalar Structs"
      ],
      answer: 0,
      discussion: "CakePHP 4 versi modern memanfaatkan Native Enums PHP 8.1+ untuk pemetaan domain value type-safe pada kolom tabel bertipe enumeration."
    },
    {
      id: 99,
      section: 4,
      sectionName: "Bagian 4: Dampak Performa, Type Safety & Lingkungan PHP",
      question: "Bagaimana CakePHP 2 menangani pemuatan (loading) file View Layout?",
      options: [
        "Dispatcher merender berkas dalam `app/View/Layouts/` (misal `default.ctp`) dan menginjeksi isi view via variabel `$this->fetch('content')` atau `$content_for_layout`.",
        "Layout dikompilasi menjadi berkas binary .exe.",
        "Layout dimuat menggunakan JavaScript Client-side AJAX.",
        "Framework memanggil template engine Twig secara otomatis."
      ],
      answer: 0,
      discussion: "Pada CakePHP 2, layout menampung elemen pembungkus utama HTML di mana konten spesifik action disisipkan melalui variabel khusus `$content_for_layout` atau `$this->fetch('content')`."
    },
    {
      id: 100,
      section: 4,
      sectionName: "Bagian 4: Dampak Performa, Type Safety & Lingkungan PHP",
      question: "Secara keseluruhan evolusi arsitektur, apa keuntungan terbesar migrasi mental model dari CakePHP 2 ke CakePHP 4 bagi pengembang Backend?",
      options: [
        "Pengurangan jumlah file PHP dalam proyek.",
        "Pergeseran dari monolithic implicit 'magic' framework berbasis array ke decoupled, type-safe, PSR-compliant, dan explicit Object-Oriented System.",
        "Aplikasi tidak lagi memerlukan Web Server seperti Apache atau Nginx.",
        "Database SQL digantikan sepenuhnya oleh file Text biasa."
      ],
      answer: 1,
      discussion: "Evolusi CakePHP memisahkan 'implicit magic' era PHP 5 menuju kepatuhan standar PSR, Object Data Mapping yang ekspresif, dan pemanfaatan fitur type safety modern dari PHP 8."
    }
  ];