module.exports = function (bt) {

    bt.match('menu', function (ctx) {
        ctx.setContent(' \
            <form action="http://google.com/search" method="get">\
                <fieldset role="search">\
                    <input type="hidden" name="q" value="site:makishvili.github.io/octopress">\
                    <input class="search" type="text" name="q" results="0" placeholder="Search">\
                </fieldset>\
            </form>\
            <ul class="main-navigation">\
                <li><a href="/">Главная</a></li>\
                <li><a href="/category/presentation">Презентации</a></li>\
                <li><a href="/books">Повести</a></li>\
                <li><a href="/blog/archives">Архив</a></li>\
            </ul>\
        ');
    });

};
