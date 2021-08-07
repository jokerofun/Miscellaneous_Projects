// const MongoClient = require('mongodb').MongoClient;

// const client = new MongoClient('mongodb://localhost:27017');
// client.connect(function (err) {
//     if (err) {
//         console.warn(err);
//         return;
//     }
//     console.log('Connected successfully to server');
//     const db = client.db('cars');
//     const collection = db.collection('people');

//     collection.insert({
//         name: 'George',
//         age: 21
//     }, function (err, result) {
//         console.log('Inserted George');
//     });

//     collection.find().toArray().then(data => {
//         console.log(data);
//     }).catch(e => console.log(e));

//     client.close();
// });

const mongoose = require('mongoose');
const Student = require('./Student');

mongoose.connect('mongodb://localhost:27017/cars', (err,obj)=>{
    const myStudent = new Student({
        name: 'Peter',
        age: 21
    });
    myStudent.save().then(result =>{
        console.log('success');
    }).catch(e => console.log(e));
});