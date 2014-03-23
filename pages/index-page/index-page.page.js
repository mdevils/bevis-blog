module.exports = function (pages) {
    pages.declare('index-page', function (params) {
        // Количество статей на одной странице
        var PAGELENGTH = 2;

        var requestPath = params.path;
        var allPosts = params.data.posts;

        // Раскладываем запрошенный урл на фрагменты
        var requestPathBits = requestPath.split('/');

        // Номер текущей страницы
        var pageNumber = 1;
        // Фильтр для категории или тега
        var postFilter = null;
        // Имя запрошенной категории
        var categoryName = null;
        // Имя запрошенного тега
        var tagName = null;

        var pagerPrefix = '/';
        while (pathBit = requestPathBits.shift()) {
            switch (pathBit) {
                case 'category':
                    categoryName = requestPathBits.shift();
                    postFilter = function (post) { return post.getCategories().indexOf(categoryName) !== -1; }
                    pagerPrefix =  ['/', pathBit, '/', categoryName, '/'].join('');
                    break;
                case 'tag':
                    tagName = requestPathBits.shift();
                    postFilter = function (post) { return post.getTags().indexOf(tagName) !== -1; }
                    pagerPrefix =  ['/', pathBit, '/', categoryName, '/'].join('');
                    break;
                case 'page':
                    pageNumber = parseInt(requestPathBits.shift()) || 1;
                    break;
            }
        }

        // Посты для текущей страницы
        var posts = allPosts.selectPostsForPage(pageNumber, PAGELENGTH, postFilter);

        // Количество страниц с учётом PAGELENGTH и фильтрации по тегам/категориям
        var pageCount = allPosts.getPageCount(PAGELENGTH, postFilter);

        // Номера для предыдущей и следующей старницы
        // null чтобы для этих случаев не генерились кнопки
        var nextPageNumber = pageNumber < pageCount ? pageNumber + 1 : null;
        var prevPageNumber = pageNumber > 1 ? pageNumber - 1 : null;

        return {
            block: 'page',
            title: 'Блог',
            styles: [
                {url: params.assetsPath + '.css'}
            ],
            scripts: [
                {url: params.assetsPath + '.js'}
            ],
            body: [
                {
                    block: 'header',
                    title: 'Вадим Макишвили',
                    titleUrl: params.root,
                    slogan: 'Вглядываясь в смыслы'
                },
/*
                {
                    block: 'menu'
                },
*/
                {
                    block: 'post-list',
                    posts: posts.map(function (post) {
                        return {
                            block: 'post',
                            title: post.getTitle(),
                            url: params.root + '/' + post.getLink(),
                            body: post.getShortHtmlBody(),
                            date: post.getDate().toLocaleDateString(),
                            hasMoreButton: post.hasShortBody(),
                            categories: post.getCategories()
                        }
                    })
                },
                {
                    block: 'pager',
                    nextPage: nextPageNumber,
                    prevPage: prevPageNumber,
                    currPage: pageNumber,
                    pathPrefix: pagerPrefix
                },
                {
                    block: 'footer'
                }
            ]
        };
    });
};
