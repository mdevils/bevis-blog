var vowFs = require('vow-fs');
var vow = require('vow');
var Post = require('./post');

function Posts(postsArray) {
    this._posts = postsArray;
    this._posts.sort(function (postA, postB) {
        return postA.getDate().getTime() < postB.getDate().getTime() ? 1 : -1;
    });
}

Posts.prototype = {
    findByPath: function (path) {
        return this._posts.filter(function (post) {
            return post.getPath() === path;
        })[0];
    },
    selectPostsForPage: function (page, pageLength) {
        page--;
        return this._posts.slice(page * pageLength, (page + 1) * pageLength);
    },
    getPageCount: function (pageLength) {
        return Math.ceil(this._posts.length / pageLength);
    }
};

Posts.loadPosts = function (directoryPath) {
    return vowFs.listDir(directoryPath).then(function (filenames) {
        return vow.all(
                filenames
                    .map(function (filename) {
                        return directoryPath + '/' + filename;
                    })
                    .map(function (filePath) {
                        return Post.parseFile(filePath);
                    })
            )
            .then(function (postsArray) {
                return new Posts(postsArray);
            });
    });
};

module.exports = Posts;