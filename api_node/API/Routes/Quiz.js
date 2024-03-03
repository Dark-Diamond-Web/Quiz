const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Quiz = require('../Model/Quiz');
const SubmitQuiz = require('../Model/submit');

router.post('/PostQuizData', (req, res, next) => {
    const quiz = new Quiz({
        _id: new mongoose.Types.ObjectId, 
        id: req.body.id,
        text: req.body.text,
        options: req.body.options,
        correctAnswer: req.body.correctAnswer, 

    })
    quiz.save()
        .then(result => { 
            res.status(200).json({
                questions: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}); 

router.get('/quiz', (req, res, next) => { 
    Quiz.find({})
        .then(result => {
            res.status(200).json({
                questions: result, 
            });
        }) 
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            }) 
        })
})

router.post('/submit', (req, res, next) => { 
    const submitQuiz = req.body.map(data => new SubmitQuiz({
        questionId: data.id,
        selectedOption: data.ans,
    })) 
    SubmitQuiz.collection.insertMany(submitQuiz)
        .then(result => { 
            res.status(200).json({
                result: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

module.exports = router; 