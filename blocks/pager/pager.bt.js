module.exports = function (bt) {

    bt.match('pager', function (ctx) {

        ctx.setContent([
            ctx.getParam('nextPage') && {
                elem: 'link',
                number: ctx.getParam('nextPage'),
                text: '← Назад в прошлое'
            },
            ctx.getParam('prevPage') && {
                elem: 'link',
                number: ctx.getParam('prevPage'),
                text: 'Вперёд в настоящее →'
            }
        ]);
    });

    bt.match('pager__link', function (ctx) {

        ctx.setTag('a');

        // Если 1 - сделай href на корень проекта.
        // Для красоты, ни для чего больше.
        var href = (ctx.getParam('number') === 1 ) ? '/' : '/page/' + ctx.getParam('number');
        ctx.setAttr('href', href);

        ctx.setContent(ctx.getParam('text'));
    });

};
