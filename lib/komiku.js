const axios = require("axios");
const cheerio = require("cheerio");

const MAIN_URL = "https://komiku.id";
const API_URL = "https://api.komiku.id";

async function searchComic(type, query) {
    const html = await axios.get(`${API_URL}/?post_type=${type}&s=${query}`);
    const $ = cheerio.load(html.data);
    const mangaList = [];
    
    $('.bge').each((_, element) => {
        const bgeiElement = $(element).find('.bgei');
        const kanElement = $(element).find('.kan');
                
        const manga = {
            title: kanElement.find('h3').text().trim(),
            alternative_title: kanElement.find('.judul2').text().trim(),
            manga_url: bgeiElement.find('a').attr('href'),
            cover_image: bgeiElement.find('img').attr('src'),
            type: bgeiElement.find('.tpe1_inf b').text().trim(),
            genre: bgeiElement.find('.tpe1_inf')
                .text()
                .replace(bgeiElement.find('.tpe1_inf b').text(), '')
                .trim(),
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

        mangaList.push(manga);
    });

    return mangaList;
}

async function getComic(type, title) {
    const html = await axios.get(`${MAIN_URL}/${type}/${title}/`);
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
        endpoint: $(element).attr('href')
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
    const html = await axios.get(`${MAIN_URL}/${page}/`);
    const $ = cheerio.load(html.data);
    return $('#Baca_Komik img').map((_, el) => $(el).attr('src')).get();
}

const getPopular = async () => {
  try {
      const { data } = await axios.get(MAIN_URL);
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

// https://komiku.id/brave-x-devil-queen-chapter-01/
// getPage("brave-x-devil-queen-chapter-01/")

// https://api.komiku.id/?post_type=manga&s=queen
// console.log(search("manga", "queen"));

// https://komiku.id/manga/brave-x-devil-queen/
// getComic("manga", "brave-x-devil-queen")

// async function main() {
//     console.log(await getComic("manga", "brave-x-devil-queen"));
// }

// main();

module.exports = { getComic, getPage, searchComic, getPopular };