const mongoose = require('mongoose');

module.exports = function initData(){
    mongoose.connect('mongodb://admin:admin1@ds121295.mlab.com:21295/expressjs-course')
};