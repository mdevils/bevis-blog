var path = require('path');
var yaml = require('js-yaml');
var vowFs = require('vow-fs');
var marked = require('marked');

function Post(params) {
    params = params || {};
    this._params = params;
    this._name = params.name;
    this._title = params.title;
    this._slug = params.slug;
    this._date = params.date;
    this._categories = params.categories || [];
    this._tags = params.tags || [];
    this._markdownBody = params.markdownBody;
    this._htmlBody = null;
    this._shortMarkdownBody = params.shortMarkdownBody;
    this._shortHtmlBody = null;
    this._path = params.date.getFullYear() + '/' +
        addZeros(params.date.getMonth() + 1, 2) + '/' +
        addZeros(params.date.getDate(), 2) + '/' + this._name;
    this._hasShortBody = params.hasShortBody;
}

Post.prototype = {
    getSlug: function () {
        return this._slug;
    },
    getName: function () {
        return this._name;
    },
    getDate: function () {
        return this._date;
    },
    getTitle: function () {
        return this._title;
    },
    getParams: function () {
        return this._params;
    },
    getMarkdownBody: function () {
        return this._markdownBody;
    },
    getHtmlBody: function () {
        if (this._htmlBody === null) {
            this._htmlBody = marked(this._markdownBody);
        }
        return this._htmlBody;
    },
    getShortMarkdownBody: function () {
        return this._shortMarkdownBody;
    },
    getShortHtmlBody: function () {
        if (this._shortHtmlBody === null) {
            this._shortHtmlBody = marked(this._shortMarkdownBody);
        }
        return this._shortHtmlBody;
    },
    getCategories: function () {
        return this._categories;
    },
    getTags: function () {
        return this._tags;
    },
    getPath: function () {
        return this._path;
    },
    getLink: function () {
        return this._path + '/';
    },
    /**
     * Post can contains tag <!-- more -->
     * In this very case method returns true
     *
     * @returns {Boolean}
     */
    hasShortBody: function () {
        return this._hasShortBody;
    }
};

Post.parseFilename = function (filename) {
    filename = filename.replace(/(\.md|\.markdown)$/, '');
    var filenameBits = filename.split('-');
    var date = new Date(
        parseInt(filenameBits.shift()), // year
        parseInt(filenameBits.shift()) - 1, // month
        parseInt(filenameBits.shift()), // day
        0, 0, 0, 0 // HH:MM:SS
    );
    return {
        date: date,
        name: filenameBits.join('-')
    }
};

Post.parseFile = function (filePath) {
    return vowFs.read(filePath, 'utf8').then(function (markdownString) {
        var params = Post.parseFilename(path.basename(filePath));
        params.markdownBody = markdownString.replace(/\-\-\-([\s\S]+)\-\-\-/m, function (s, m) {
            m = m.trim();
            var newParams = yaml.safeLoad(m);
            for (var i in newParams) {
                var value = newParams[i];
                if (i === 'date') {
                    value = new Date(value);
                }
                params[i] = value;
            }
            return '';
        });
        var markdownBodyParts = params.markdownBody.split('<!-- more -->');
        params.shortMarkdownBody = markdownBodyParts[0];
        params.hasShortBody = markdownBodyParts.length > 1;
        return new Post(params);
    });
};

function addZeros(input, len) {
    var output = input.toString();
    while (output.length < len) {
        output = '0' + output;
    }
    return output;
}

module.exports = Post;
