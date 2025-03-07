const axios = require("axios");
const cheerio = require("cheerio");

const MAIN_URL = "https://komiku.id";
const API_URL = "https://api.komiku.id";
headers = {
	headers: {
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0'
	}
}

async function searchComic(type, query, genre = []) {
    let mangaList = [];
    let page = 1;
    const maxPages = 10;
    
    while (page <= maxPages) {
        try {
            const response = await axios.get(`${API_URL}/page/${page}/?post_type=manga&s=${encodeURI(query)}`, headers);
            const $ = cheerio.load(response.data);
            let found = false;
            
            $('.bge').each((_, element) => {
                found = true;
                const bgeiElement = $(element).find('.bgei');
                const kanElement = $(element).find('.kan');
    
                const mangaGenre = bgeiElement.find('.tpe1_inf')
                    .text()
                    .replace(bgeiElement.find('.tpe1_inf b').text(), '')
                    .trim();
                
                if (Array.isArray(genre) && genre.length > 0) {
                    const genreList = mangaGenre.toLowerCase().split(',').map(g => g.trim());
                    if (!genre.some(g => genreList.includes(g.toLowerCase()))) {
                        return; // Skip this manga and continue to next one
                    }
                }
                
                const manga = {
                    title: kanElement.find('h3').text().trim(),
                    alternative_title: kanElement.find('.judul2').text().trim(),
                    manga_url: bgeiElement.find('a').attr('href'),
                    cover_image: bgeiElement.find('img').attr('src'),
                    type: bgeiElement.find('.tpe1_inf b').text().trim(),
                    genre: mangaGenre,
                    synopsis: kanElement.find('p').text().trim(),
                    chapters: {
                        first: {
                            number: kanElement.find('.new1').first().find('span:last').text().trim(),
                            url: kanElement.find('.new1').first().find('a').attr('href'),
                            title: kanElement.find('.new1').first().find('a').attr('title')
                        },
                        latest: {
                            number: kanElement.find('.new1').last().find('span:last').text().trim(),
                            url: kanElement.find('.new1').last().find('a').attr('href'),
                            title: kanElement.find('.new1').last().find('a').attr('title')
                        }
                    }
                };

				if (type.toLowerCase() == "all" || bgeiElement.find('.tpe1_inf b').text().trim().toLowerCase() == type.toLowerCase()) {
					mangaList.push(manga);
				}
            });
            
            if (!found) break;
            page++;
        } catch (error) {
            if (error.response && error.response.status === 404) break;
            throw error;
        }
    }
    
    return { max_page: page - 1, results: mangaList };
}


async function getComic(type, title) {
	const html = await axios.get(`${MAIN_URL}/${type}/${title}/`, headers);
	const $ = cheerio.load(html.data);

	const description = $('p.desc').text().trim() || "No synopsis available.";
	const thumbnailUrl = $('meta[name="thumbnailUrl"]').attr('content') || '';
	const coverUrl = $('.ims img').attr('src') || '';

	const genres = [];
	$('.genre a').each((_, element) => {
		genres.push($(element).text().trim());
	});

	const chapters = [];
	$('#Daftar_Chapter a').each((_, element) => {
		chapters.push({
			name: $(element).find('span').text().trim() || '',
			endpoint: `/chapter/` + $(element).attr('href').slice(1)
		});
	});

	const data = {
		title: $('h1 span').text().trim() || 'Unknown Title',
		synopsis: description,
		thumbnail: thumbnailUrl,
		cover: coverUrl,
		genre: genres,
		chapter_list: chapters
	};

	return data;
}

async function getPage(page) {
	const html = await axios.get(`${MAIN_URL}/${page}/`, headers);
	const $ = cheerio.load(html.data);
	return $('#Baca_Komik img').map((_, el) => $(el).attr('src')).get();
}

const getPopular = async () => {
	try {
		const {
			data
		} = await axios.get(MAIN_URL, headers);
		const $ = cheerio.load(data);

		const sections = ['Komik_Hot_Manga', 'Komik_Hot_Manhwa', 'Komik_Hot_Manhua'];
		const results = {};

		sections.forEach(section => {
			results[section] = [];
			$(`#${section} .ls12 article.ls2`).each((i, element) => {
				const title = $(element).find('h3 a').text().trim();
				const link = $(element).find('h3 a').attr('href');
				const image = $(element).find('img').data('src');
				const genreReaders = $(element).find('.ls2t').text().trim();
				const chapter = $(element).find('.ls2l').text().trim();
				const chapterLink = $(element).find('.ls2l').attr('href');

				results[section].push({
					title,
					link,
					image,
					genreReaders,
					chapter,
					chapterLink
				});
			});
		});

		return results;
	} catch (error) {
		console.error('Error fetching data:', error);
		return null;
	}
};

async function getList(filter) {
	let url = filter
		? `${MAIN_URL}/daftar-komik/?tipe=${filter}`
		: `${MAIN_URL}/daftar-komik`;

	try {
		const { data } = await axios.get(url, {
			timeout: 10000,
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0'
			}
		});
		const $ = cheerio.load(data);
		const result = [];

		$('div.ls4').each((index, element) => {
			const comic = {};
			$(element).find('div.ls4v').each((i, el) => {
				comic.endpoint = $(el).find('a').attr('href');
				comic.image = $(el).find('img').attr('data-src')?.replace('?resize=240,170', '');
			});
			$(element).find('div.ls4j').each((i, el) => {
				comic.title = $(el).find('h4').text();
			});
			result.push(comic);
		});

		return { data: result };
	} catch (error) {
		console.error('Error fetching comic list:', error);
		return { error: error.message };
	}
}

// async function test() {
// 	let x = await searchComic("manhua", "", ['fantasi']);
// 	console.log(x);
// }

// test();

module.exports = {
	getComic,
	getPage,
	searchComic,
	getPopular,
	getList
};