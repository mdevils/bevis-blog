module.exports = function (pages) {
    pages.declare('index-page', function (params) {

        // Количество статей на одной странице
        var PAGELENGTH = 20;

        // Количество страниц с учётом PAGELENGTH
        var pageCount = params.data.posts.getPageCount(PAGELENGTH);

        // Номер текущей страницы
        var pageNumber = parseInt(params.path.split('/').pop()) || 1;

        // Посты для текущей страницы
        var posts = params.data.posts.selectPostsForPage(pageNumber, PAGELENGTH);

        // Номера для предыдущей и следущей старницы
        var nextPageNumber = (pageNumber < pageCount) ? pageNumber + 1 : pageCount;
        var prevPageNumber = (pageNumber > 2) ? pageNumber - 1 : 1;

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
                {
                    block: 'post-list',
                    posts: posts.map(function (post) {
                        return {
                            block: 'post',
                            title: post.getTitle(),
                            url: params.root + '/' + post.getLink(),
                            body: post.getShortHtmlBody(),
                            date: post.getDate().toLocaleDateString(),
                            hasMoreButton: post.hasShortBody()
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
