module.exports = function (pages) {
    pages.declare('post-page', function (params) {
        var filePath = decodeURIComponent(params.path);
        var post = params.data.posts.findByPath(filePath);

        if (!post) {
            throw Error('Post not found: ' + filePath);
        }

        return {
            block: 'page',
            title: post.getTitle(),
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
                        { page: 'Презентации', url: '/category/presentation' }
                    ]
                },
                {
                    block: 'post',
                    body: post.getHtmlBody(),
                    title: post.getTitle(),
                    date: post.getDate().toLocaleDateString(),
                    readingNow: true,
                    categories: post.getCategories()
                },
                {
                    block: 'footer'
                }
            ]
        };
    });
};
