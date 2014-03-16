module.exports = function (bt) {

    bt.match('post', function (ctx) {
        ctx.setContent([
            {
                elem: 'title',
                title: ctx.getParam('title'),
                url: ctx.getParam('url'),
                readingNow: ctx.getParam('readingNow')
            },
            {
                elem: 'body',
                body: ctx.getParam('body')
            },
            (ctx.getParam('hasMoreButton') && !ctx.getParam('readingNow')) && {
                elem: 'more',
                url: ctx.getParam('url')
            }
        ])
    });

    bt.match('post__title', function (ctx) {
        if (ctx.getParam('readingNow')) {
            ctx.setTag('h1');
            ctx.setContent(ctx.getParam('title'));
        } else {
            ctx.setTag('h2');
            ctx.setContent({
                elem: 'title-link',
                url: ctx.getParam('url'),
                content: ctx.getParam('title')
            });
        }
    });

    bt.match('post__title-link', function (ctx) {
        ctx.setTag('a');
        ctx.setAttr('href', ctx.getParam('url'));

        ctx.setContent(ctx.getParam('content'));
    });

    bt.match('post__body', function (ctx) {
        ctx.setContent(ctx.getParam('body'));
    });

    bt.match('post__more', function (ctx) {
        ctx.setTag('a');
        ctx.setAttr('href', ctx.getParam('url'));

        ctx.setContent('Читать дальше →');
    });
};
