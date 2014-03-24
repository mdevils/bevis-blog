module.exports = function (bt) {

    bt.setDefaultView('post', 'main');

    bt.match('post*', function (ctx) {

        ctx.setContent([
            {
                elem: 'title',
                title: ctx.getParam('title'),
                url: ctx.getParam('url'),
                readingNow: ctx.getParam('readingNow')
            },
            ctx.getParam('categories') &&  {
                elem: 'categories',
                categories: ctx.getParam('categories')
            },
            {
                elem: 'date',
                date: ctx.getParam('date')
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

    bt.match('post*__title', function (ctx) {
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

    bt.match('post*__title-link', function (ctx) {
        ctx.setTag('a');
        ctx.setAttr('href', ctx.getParam('url'));

        ctx.setContent(ctx.getParam('content'));
    });

    bt.match('post*__date', function (ctx) {
        ctx.setContent(String(ctx.getParam('date')));
    });

    bt.match('post*__body', function (ctx) {
        ctx.setContent(ctx.getParam('body'));
    });

    bt.match('post*__more', function (ctx) {
        ctx.setTag('a');
        ctx.setAttr('href', ctx.getParam('url'));

        ctx.setContent('Читать дальше →');
    });

    bt.match('post*__categories', function (ctx) {
        var categories = ctx.getParam('categories');
        ctx.setContent(categories.map(function (category, i) {
            return {
                elem: 'category',
                text: category,
                url: '/category/' + encodeURIComponent(category)
            };
        }));
    });

    bt.match('post*__category', function (ctx) {
        ctx.setTag('a');
        ctx.setAttr('href', ctx.getParam('url'));
        ctx.setContent(ctx.getParam('text'));
    });
};
