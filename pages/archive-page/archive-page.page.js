module.exports = function (pages) {
    pages.declare('archive-page', function (params) {
        var posts = params.data.posts.getPosts();

        return {
            block: 'page',
            title: 'Все статьи',
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
                    block: 'menu',
                    links: [
                        { page: 'Главная', url: '/' },
                        { page: 'Презентации', url: '/category/presentation' },
                        { page: 'Архив', url: '/archive' }
                    ]
                },
                {
                    block: 'post-list',
                    posts: posts.map(function (post) {
                        return {
                            block: 'post',
                            title: post.getTitle(),
                            url: decodeURIComponent(params.root + '/' + post.getLink()),
                            date: post.getDate().toLocaleDateString(),
                            categories: post.getCategories()
                        }
                    })
                },
                {
                    block: 'footer'
                }
            ]
        };
    });
};
