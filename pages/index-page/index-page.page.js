module.exports = function (pages) {
    pages.declare('index-page', function (params) {
        // Количество статей на одной странице
        var PAGELENGTH = 20;

        var requestedUrl = params.path;
        var allPosts = params.data.posts;

        // Количество страниц с учётом PAGELENGTH
        var pageCount = allPosts.getPageCount(PAGELENGTH);

        // Номер текущей страницы
        var pageNumber = parseInt(requestedUrl.split('/').pop()) || 1;

        var filterByCategories = function (post) {
            // Фильтруем все категории в этой статье
            var isCategoryMatched = post._params.categories && post._params.categories.some(function (category) {
                return filteredWord === category;
            });

            return isCategoryMatched ? true : false ;
        };

        var filterByTags = function (post) {
            // Фильтруем все категории в этой статье
            var isTagMatched = post._params.tags && post._params.tags.some(function (tag) {
                return filteredWord === tag;
            });

            return isTagMatched ? true : false ;
        };

        var filteredWord;
        var filterCallback;
        if (requestedUrl.indexOf('category/') !== -1) {
            filteredWord = requestedUrl.replace('category/', '');
            if (filteredWord) {
                filterCallback = filterByCategories;
            }
        } else if (requestedUrl.indexOf('tag/') !== -1) {
            filteredWord = requestedUrl.replace('tag/', '');
            if (filteredWord) {
                filterCallback = filterByTags;
            }
        }

        // Посты для текущей страницы
        var posts = allPosts.selectPostsForPage(pageNumber, PAGELENGTH, filterCallback);

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
                },
                {
                    block: 'footer'
                }
            ]
        };
    });
};
