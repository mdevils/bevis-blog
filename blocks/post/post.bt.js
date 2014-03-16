module.exports = function (bt) {

    bt.match('post', function (ctx) {
        ctx.setContent([
            {elem: 'title', title: ctx.getParam('title'), selected: ctx.getParam('selected')},
            {elem: 'body', body: ctx.getParam('body')}
        ])
    });

    bt.match('post__title', function (ctx) {
        if (ctx.getParam('selected')) {
            ctx.setTag('h1');
        } else {
            ctx.setTag('h2');
        }
        ctx.setContent(ctx.getParam('title'));
    });

    bt.match('post__body', function (ctx) {
        ctx.setContent(ctx.getParam('body'));
    });
};
