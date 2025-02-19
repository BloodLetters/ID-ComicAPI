const axios = require("axios");

const MANGADEX_API = 'https://api.mangadex.org';

async function formatMangaData(manga) {
    try {
        const coverFile = manga.relationships.find(rel => rel.type === 'cover_art');
        let coverUrl = '';
        if (coverFile) {
            const coverResponse = await axios.get(`${MANGADEX_API}/cover/${coverFile.id}`);
            const fileName = coverResponse.data.data.attributes.fileName;
            coverUrl = `https://uploads.mangadex.org/covers/${manga.id}/${fileName}`;
        }

        const chaptersResponse = await axios.get(`${MANGADEX_API}/manga/${manga.id}/feed`, {
            params: {
                order: {
                    chapter: 'asc'
                },
                translatedLanguage: ['id'],
                limit: 500
            }
        });
        
        const chapters = chaptersResponse.data.data;
        const firstChapter = chapters[0];
        const lastChapter = chapters[chapters.length - 1];

        // Get alternative titles
        const altTitles = manga.attributes.altTitles
            .map(title => Object.values(title)[0])
            .join(', ');

        // Get genres
        const genres = manga.relationships
            .filter(rel => rel.type === 'tag')
            .map(tag => tag.attributes?.name?.en)
            .filter(Boolean)
            .join(', ');

        return {
            title: manga.attributes.title.en || Object.values(manga.attributes.title)[0],
            alternative_title: altTitles,
            manga_url: `/manga/${manga.id}`,
            cover_image: coverUrl,
            type: manga.type || 'Manga',
            genre: genres,
            synopsis: manga.attributes.description.en || Object.values(manga.attributes.description)[0],
            chapters: {
                first: firstChapter ? {
                    number: `Chapter ${firstChapter.attributes.chapter}`,
                    url: `/chapter/${firstChapter.id}`,
                    title: `${manga.attributes.title.en} Chapter ${firstChapter.attributes.chapter}`
                } : null,
                latest: lastChapter ? {
                    number: `Chapter ${lastChapter.attributes.chapter}`,
                    url: `/chapter/${lastChapter.id}`,
                    title: `${manga.attributes.title.en} Chapter ${lastChapter.attributes.chapter}`
                } : null
            }
        };
    } catch (error) {
        console.error('Error formatting manga data:', error);
        throw error;
    }
}

async function searchManga(type, query) {
    // IGNORE type PARAMS
    try {
        const response = await axios.get(`${MANGADEX_API}/manga`, {
            params: {
                title: query,
                limit: 10,
                availableTranslatedLanguage: ["id"], 
                includes: ['cover_art', 'author', 'artist', 'tag'],
            }
        });

        const formattedResults = await Promise.all(
            response.data.data.map(manga => formatMangaData(manga))
        );

        return formattedResults;
    } catch (error) {
        console.error('Error searching manga:', error);
        throw error;
    }
}

async function getInfo(type, mangaId) {
    // IGNORE type PARAMS
    try {
        const mangaResponse = await axios.get(`${MANGADEX_API}/manga/${mangaId}`, {
            // params: {
            //     includes: ['author', 'artist', 'cover_art', 'tag']
            // }
        });
        const manga = mangaResponse.data.data;
        const coverFile = manga.relationships.find(rel => rel.type === 'cover_art');
        let coverUrl = '';
        if (coverFile) {
            const coverResponse = await axios.get(`${MANGADEX_API}/cover/${coverFile.id}`);
            const fileName = coverResponse.data.data.attributes.fileName;
            coverUrl = `https://uploads.mangadex.org/covers/${manga.id}/${fileName}`;
        }


        const genres = manga.attributes.tags.map(tag => tag.attributes.name?.en);

        // const genres = manga.attributes
        //     .filter(rel => rel.type === 'tag')
        //     .map(tag => tag.attributes?.name?.en)
        //     .filter(Boolean);


        const chaptersResponse = await axios.get(`${MANGADEX_API}/manga/${mangaId}/feed`, {
            params: {
                translatedLanguage: ['id'],
                order: {
                    chapter: 'desc'
                },
                limit: 100
            }
        });

        const chapterList = chaptersResponse.data.data.map(chapter => ({
            name: `Chapter ${chapter.attributes.chapter}`,
            endpoint: `/chapter/${chapter.id}`
        }));

        const formattedResponse = {
            title: manga.attributes.title.en || Object.values(manga.attributes.title)[0],
            synopsis: manga.attributes.description.en || Object.values(manga.attributes.description)[0],
            thumbnail: coverUrl,
            cover: coverUrl,
            genre: genres,
            chapter_list: chapterList
        };

        return formattedResponse;
    } catch (error) {
        console.error('Error fetching manga info:', error);
        throw error;
    }
}

async function getChapter(chapterId) {
    // IGNORE type PARAMS
    try {
        const response = await axios.get(`${MANGADEX_API}/at-home/server/${chapterId}`);
        const baseUrl = response.data.baseUrl;
        const chapterHash = response.data.chapter.hash;
        const pageFilenames = response.data.chapter.data;

        const imageUrls = pageFilenames.map(filename => 
            `${baseUrl}/data/${chapterHash}/${filename}`
        );

        return imageUrls;
    } catch (error) {
        console.error('Error fetching chapter images:', error);
        throw error;
    }
}

module.exports = { searchManga, getChapter, getInfo };
// async function main() {
//     // const data = await searchManga("queen");
//     // data.data.forEach((obj) => {
//     //     console.log(obj);
//     //     return;
//     // })

//     // const data = await getInfo("3de926a8-29c2-49ff-b658-ce8735da7a35");
//     // data.data.chapter_list.forEach((obj) => {
//     //     console.log(obj);
//     // })

//     // const data = await getChapter("be81f29a-eeec-4e85-b3e0-ad155e44fa03");
//     // console.log(data);
// }

// main();