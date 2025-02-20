const axios = require("axios");
const cheerio = require("cheerio");

const MAIN_URL = "https://komikindo2.com";
headers = {
	headers: {
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0'
	}
}


async function SearchComic(type, query) {
	try {
		const { data } = await axios.get(MAIN_URL + `/daftar-manga/?status=&type=${type}&format=&order=&title=${query}`, headers);

		const $ = cheerio.load(data);
		const results = [];

		$('.animepost').each((_, element) => {
			const cover_image = $(element).find('img').attr('src');
			const title = $(element).find('.tt h4').text().trim();
			const alternative_title = title;
			const manga_url = "/manga/" + $(element).find('a').attr('href').replace('https://komikindo2.com/komik/', '');
			const type = $('span.typeflag').attr('class').split(' ')[1];
			if (cover_image && title) {
				results.push({
					title,
					alternative_title,
					manga_url,
					cover_image,
					type,
					genre: "",
					synopsis: "",
					chapters: {
						first: {
							number: "Chapter 1",
							url: "",
							title: ""
						},
						latest: {
							number: "",
							url: "",
							title: ""
						}
					}
				});
			}
		});

		return results;
	} catch (error) {
		console.error('Error fetching data:', error);
		return [];
	}
}

async function getComic(type, query) {
	// IGNORE type PARAMS
	try {
		const url = MAIN_URL + `/komik/${query}/`;

		const {
			data
		} = await axios.get(url, headers);
		const $ = cheerio.load(data);

		const title = $('.entry-title').text().replace(/\s+/g, ' ').trim().replace("Komik", "");
		const synopsis = $('.desc p').text().replace(/\s+/g, ' ').trim();
		const thumbnail = $('.thumb img').attr('src');
		const cover = $('.thumb img').attr('src');

		const genres = [];
		$('.genre-info a').each((_, el) => {
			genres.push($(el).text().trim());
		});

		const chapters = [];
		$('#chapter_list ul li').each((_, el) => {
			const chapterNumber = $(el).find('chapter').text().trim();
			const endpoint = $(el).find('a').attr('href').replace("https://komikindo2.com/", "/chapter/");
			if (chapterNumber && endpoint) {
				chapters.push({
					name: `Chapter ${chapterNumber}`,
					endpoint
				});
			}
		});

		chapters.sort((a, b) => {
			const chapterNumberA = parseInt(a.name.split(' ')[1], 10);
			const chapterNumberB = parseInt(b.name.split(' ')[1], 10);
			return chapterNumberB - chapterNumberA;
		});

		return {
			title,
			synopsis,
			thumbnail,
			cover,
			genres,
			chapters: chapters
		};
	} catch (error) {
		throw new Error('Gagal mengambil data');
	}
}

async function getChapter(query) {
	try {
		const {
			data
		} = await axios.get(MAIN_URL + "/" + query, headers);
		const $ = cheerio.load(data);

		const images = [];
		$('#Baca_Komik .img-landmine img').each((_, el) => {
			const imgSrc = $(el).attr('src');
			if (imgSrc) images.push(imgSrc);
		});

		return images;
	} catch (error) {
		console.log(error);
		throw new Error('Gagal mengambil gambar chapter');
	}
}

module.exports = {
	getChapter,
	SearchComic,
	getComic
}