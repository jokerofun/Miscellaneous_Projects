var mongoose = require('mongoose');
var connectionStr = 'mongodb://admin:pesho123:pesho123@ds121295.mlab.com:21295/expressjs-course';

module.exports = ()=>{
    mongoose.connect(connectionStr);
};