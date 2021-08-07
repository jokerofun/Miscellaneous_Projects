const flight = function () {
    const addGet = function (ctx) {
        if (!userModel.isAuthorized()) {
            ctx.redirect('#/login');
        } else {
            ctx.partial('views/flight/add.hbs');
        }

    };

    const addPost = function (ctx) {
        flightModel.add(ctx.params).done(function () {
            notification.info('Flight added successfully');
            ctx.redirect('#/');
        }).fail(function () {
            notification.error('Something happened!');
        });
    };

    return {
        addGet,
        addPost
    };
}();