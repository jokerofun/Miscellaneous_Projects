const User = require('../models/user-model');

class UsersController {
    getUsers(req, res) {
        res.render('users');
    }

    getRegister(req, res) {
        res.render('register');
    }

    getProfile(req, res) {
        User.find({})
            .then((users) => {
                res.render('profile', {users});
            })
            .catch(err => {
                return res.render('error', err);
            });
    }

    postRegister(req, res) {
        const {
            email,
            password,
            firstName,
            lastName
        } = req.body;
        const user = new User({
            email,
            password,
            firstName,
            lastName
        });

        user.save()
            .then(() => {
                res.redirect('/users/profile');
            })
            .catch(error => {
                res.render('error', error);
            });
    }
}

module.exports = UsersController;