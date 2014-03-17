module.exports = function (markdown) {
    var yavideo = '<iframe width="745" height="559" frameborder="0" src="http://video.yandex.ru/iframe/$1/$2/"></iframe>';
    return markdown.replace(/{%\s*yavideo\s+(.*?)\/(.*?)\s+%}/gim, yavideo);
};


