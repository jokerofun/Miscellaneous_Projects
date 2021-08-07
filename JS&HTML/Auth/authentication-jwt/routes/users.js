var express = require('express');
var User = require('../data/models/user-model');
var router = express.Router();

/* GET users listing. */
router
  .get('/profile', (req, res) => {
    const token = req.header('x-auth');


  })
  .get('login', function (req, res, next) {
    res.render('login');
  })
  .get('/register', (req, res) => {
    res.render('register');
  })
  .post('/register', (req, res) => {
    const {
      email,
      password
    } = req.body;

    if (email.length && password.length) {
      const user = new User({
        email,
        password,
      });

      user.save()
        .then(() => {
          user.generateAuthToken()
            .then((token) => {
              res.header('x-auth', token).send(user);
            })
            .catch(error => res.status(400).send());
        })
        .catch(error => res.status(400).send());
    } else {
      // ..
    }

  });

module.exports = router;