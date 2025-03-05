<img src="./assets/banner.png"></img>
![Komic Indonesia](https://img.shields.io/badge/Komik-Indonesia-green?style=flat-square&color=green&labelColor=cray)
[![GitHub release](https://img.shields.io/github/v/release/BloodLetters/ID-ComicAPI.svg)](https://github.com/BloodLetters/ID-ComicAPI/releases)
[![GitHub last commit](https://img.shields.io/github/last-commit/BloodLetters/ID-ComicAPI.svg)](https://github.com/BloodLetters/ID-ComicAPI/commits/main)
![Custom Badge](https://img.shields.io/badge/Status-Active-brightgreen)

ID-ComicAPI adalah REST API untuk komik Indonesia. API ini dibuat untuk keperluan testing dan edukasi, terutama untuk belajar tentang **Web Scraping**.

## Fitur
API ini menyediakan berbagai endpoint untuk mendapatkan informasi tentang komik:
- List chapter
- Informasi Komik
- Daftar list komik

### Mendapatkan Daftar Komik
```http
GET /api/komiku/list
GET /api/komiku/list?filter=manhwa
GET /api/komiku/list?filter=manga
GET /api/komiku/list?filter=manhua
```

### Mencari Komik
```http
GET /api/komiku/search/:type/:title
GET /api/komiku/search/manga/50kg-cinderella
GET /api/komiku/search/page/2/manga/isekai (Selalu menampilkan halaman 1)

GET /api/mangadex/search/:type/:title
GET /api/mangadex/search/manga/queen
GET /api/mangadex/search/page/2/manga/isekai (Selalu menampilkan halaman 1)

GET /api/komikindo/search/:type/:title
GET /api/komikindo/search/manga/maou
GET /api/komikindo/search/page/2/manga/isekai
```

### Search by genre
> NOTE: List genre tiap routes berbeda sesuai dari web nya. untuk sementara belum bisa di handle!
> akan di handle di next update
```http
GET /api/komiku/search/manga/Queen?genre=Fantasi,Romantis
GET /api/komiku/search/:type/:title?genre=List_genre



GET /api/mangadex/search/manga/Isekai?genre=Fantasy,Romance
GET /api/mangadex/search/:type/:title?genre=List_genre
```

### Informasi Komik
```http
GET /api/komiku/info/:type/:title
GET /api/komiku/info/manga/50kg-cinderella

GET /api/mangadex/info/:type/:id-komik
GET /api/mangadex/info/manga/c1e284bc-0436-42fe-b571-fa35a94279ce

GET /api/komikindo/info/:type/:title
GET /api/komikindo/info/manga/azur-lane-queens-orders
```

### Chapter Komik
```http
GET /api/komiku/chapter/:title
GET /api/komiku/chapter/50kg-cinderella-chapter-8

GET /api/mangadex/chapter/:manga-id
GET /api/mangadex/chapter/2f5c9ab1-2cfc-4db8-a72a-3a6f9f46813e

GET /api/komikindo/chapter/:title
GET /api/komikindo/chapter/azur-lane-queens-orders-chapter-38
```

### Komik Populer
```http
GET /api/komiku/popular
```

### Pengujian API
```http
GET /api/komiku/ping
```

## Cara Penggunaan
1. Clone repository ini:
    ```sh
    git clone https://github.com/BloodLetters/ID-ComicAPI.git
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Jalankan server:
    ```sh
    npm start
    ```
4. Akses API melalui `https://id-comic-api.vercel.app`

## Catatan
Proyek ini dibuat hanya untuk keperluan testing dan edukasi, tidak untuk produksi.
