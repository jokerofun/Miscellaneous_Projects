const mongoose = require('mongoose');

const studentSchema = {
    name: String,
    age:Number
};

const Student = new mongoose.model('Student',studentSchema);

module.exports = Student;