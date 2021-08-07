const express = require('express');
const UsersController = require('../controllers/users-controller');
const usersController = new UsersController();

const router = express.Router();

/* GET users listing. */
router
.get('/', usersController.getUsers)
.get('/register', usersController.getRegister)
.post('/register', usersController.postRegister)
.get('/profile', usersController.getProfile);

module.exports = router;
