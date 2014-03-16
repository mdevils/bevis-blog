module.exports = function (bt) {

    bt.match('pager', function (ctx) {

        ctx.setContent('Содержимое блока');
    });

};
