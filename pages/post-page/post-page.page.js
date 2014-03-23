module.exports = function (pages) {
    pages.declare('post-page', function (params) {
        var post = params.data.posts.findByPath(params.path);
        if (!post) {
            throw Error('Post not found: ' + params.path);
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
