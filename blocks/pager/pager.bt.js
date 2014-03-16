module.exports = function (bt) {

    bt.match('pager', function (ctx) {

        ctx.setContent([
            {
                elem: 'link',
                number: ctx.getParam('nextPage'),
                text: '← Назад в прошлое'
            },
            {
                elem: 'link',
                text: 'На главную'
            },
            {
                elem: 'link',
                number: ctx.getParam('prevPage'),
                text: 'Вперёд в настоящее →'
            }
        ]);
    });

    bt.match('pager__link', function (ctx) {

        ctx.setTag('a');

        var href = '/';
        if (ctx.getParam('number')) {
            href='/page/' + ctx.getParam('number');
        }

        ctx.setAttr('href', href);

        ctx.setContent(ctx.getParam('text'));
    });

};
