module.exports = function (pages) {
    pages.declare('index-page', function (params) {
        var pageNumber = parseInt(params.path.split('/').pop()) || 1;
        var posts = params.data.posts.selectPostsForPage(pageNumber, 20);
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
                            hasMoreButton: post.hasShortBody()
                        }
                    })
                }
            ]
        };
    });
};
