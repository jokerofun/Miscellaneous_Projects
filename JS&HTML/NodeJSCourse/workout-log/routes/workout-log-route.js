const express = require('express');
const WorkoutLogModel = require('../data/models/workout-log-model');
const router = express.Router();

router
    .post('/create', (req, res) => {
        const {
            name,
            exercises
        } = req.body;

        const mappedExercises = exercises.map(exercises => {
            return Object.assign({}, exercises, {
                reps: parseInt(exercises.reps),
                sets: parseInt(exercises.reps),
            });
        });

        const newWorkoutLog = new WorkoutLogModel({
            name,
            date: new Date(),
            exercises: mappedExercises,
        });

        newWorkoutLog.save(() => {
            res.redirect('/');
        });
    })
    .get('/all', (req,res)=>{
        const query = WorkoutLogModel.find({});

        query.limit(20);

        query.exec((err,results)=>{
            if(err){
                throw err;
            }

            res.render('/workout-logs',{logs: results});
        });
    })
    .get('/:logId', (req, res) => {
        const {
            logId
        } = req.params;
        const query = WorkoutLogModel.findById(logId);

        query.exec((err, result) => {
            if (err) {
                throw err;
            }

            res.render('workout-log',result);
        });
    })
    .get('/create', (req, res) => {
        res.redirect('/');
    });

module.exports = router;