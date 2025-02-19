# ID-ComicAPI
Indonesian comic rest APi 

# Usage
> **Getting comic list**
> ```
> /api/komiku/list
> /api/komiku/list?filter=manhwa
> /api/komiku/list?filter=manga
> /api/komiku/list?filter=manhua
> ```

> **Search comic**
> ```
> /api/komiku/search/:type/:title
> /api/komiku/search/manga/50kg-cinderella
> ```

> **Comic information**
> ```
> /api/komiku/info/:type/:title
> /api/komiku/info/manga/50kg-cinderella
> ```

> **Comic Chapter**
> ```
> /api/komiku/chapter/:title
> /api/komiku/info/50kg-cinderella-chapter-8
> ```

> **Comic Popular**
> ```
> /api/komiku/popular
> ```

> **Rest API Testing**
> ```
> /api/komiku/ping
> ```