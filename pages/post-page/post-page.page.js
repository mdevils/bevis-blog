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
                    block: 'layout',
                    logoUrl: params.root,
                    content: {
                        block: 'post',
                        body: post.getHtmlBody(),
                        title: post.getTitle(),
                        readingNow: true
                    }
                }
            ]
        };
    });
};
