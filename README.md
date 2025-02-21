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

GET /api/mangadex/search/:type/:title
GET /api/mangadex/search/manga/queen

GET /api/mangadex/search/:type/:title
GET /api/komikindo/search/manga/maou
```

### Informasi Komik
```http
GET /api/komiku/info/:type/:title
GET /api/komiku/info/manga/50kg-cinderella

GET /api/mangadex/info/:type/:id-komik
GET /api/mangadex/info/manga/c1e284bc-0436-42fe-b571-fa35a94279ce

GET /api/komiku/info/:type/:title
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
4. Akses API melalui `http://localhost:3000`

## Catatan
Proyek ini dibuat hanya untuk keperluan testing dan edukasi, tidak untuk produksi.
