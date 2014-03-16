module.exports = function (bt) {

    bt.match('layout', function (ctx) {
        ctx.setContent([
            {
                elem: 'header',
                logoUrl: ctx.getParam('logoUrl')
            },
            {
                elem: 'content',
                content: ctx.getParam('content')
            }
        ]);
    });

    bt.match('layout__content', function (ctx) {
        ctx.setTag('section');
        ctx.setContent(ctx.getParam('content'));
    });

    bt.match('layout__header', function (ctx) {
        ctx.setContent({
            elem: 'logo',
            logoUrl: ctx.getParam('logoUrl')
        });
    });

    bt.match('layout__logo', function (ctx) {
        ctx.setTag('a');
        ctx.setAttr('href', ctx.getParam('logoUrl'));
        ctx.setContent('Блог');
    });
};
