const Article = require('../models/Article');

module.exports = {
    createGet: (req, res) => {
        res.render('article/create');
    },
    createPost: (req, res) => {
        const {
            title,
            content
        } = req.body;
        const author = req.user._id;
        const user = req.user;

        const article = new Article({
            title,
            content,
            author
        })

        article.save()
            .then((result) => {
                user.articles.push(result._id);

                return user.save();
            })
            .then(() => {
                res.redirect('/');
            })
            .catch(console.error);
    },
    details: (req, res) => {
        const articleId = req.params.articleId;

        Article.findById(articleId)
            .populate('author')
            .then((article) => {
                let isAuthor = false;
                if (req.user) {
                    isAuthor = req.user.isAuthor(article);
                }
                res.render('article/details', {
                    article,
                    isAuthor
                });
            })
            .catch(console.error);
    },
    editGet: (req, res) => {

    },
    editPost: (req, res) => {

    },
    deleteGet: (req, res) => {

    },
    deletePost: (req, res) => {
        let articleId = req.params.articleId;
        Article.findById(articleId)
            .then((a) => {
                return Article.findByIdAndDelete(a._id);
            })
            .then(() => {
                req.user.articles = req.user.articles.filter(a !== articleId);
                return req.user.save();
            })
            .then(() => {
                res.redirect('/');
            })
            .catch(console.error);
    },
};