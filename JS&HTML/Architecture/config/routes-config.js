const indexRouter = require('../routes/index');
const usersRouter = require('../routes/users');

module.exports = () => {
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/books', booksRouter);
};