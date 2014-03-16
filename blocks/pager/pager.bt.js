module.exports = function (bt) {

    bt.match('pager', function (ctx) {

        ctx.setContent([
            {elem: 'link', number: ctx.getParam('prevPage'), type: 'prev'},
            {elem: 'link', number: ctx.getParam('nextPage'), type: 'next'}
        ]);
    });

    bt.match('pager__link', function (ctx) {

        ctx.setTag('a');

        var href='/page/' + ctx.getParam('number');
        ctx.setAttr('href', href);

        var text = (ctx.getParam('type') === 'prev') ? 'Туда' : 'Сюда';
        ctx.setContent(text);
    });

};
