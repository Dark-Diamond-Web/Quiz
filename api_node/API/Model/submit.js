const mongoose = require('mongoose');
const SubmitQuiz = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    questionId:Number,
    selectedOption:String,  

})
module.exports = mongoose.model('SubmitQuiz',SubmitQuiz)
