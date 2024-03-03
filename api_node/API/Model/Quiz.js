const mongoose = require('mongoose');
const Quiz = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    id:Number,
    text:String,
    options:[String],
    correctAnswer:String, 

})
module.exports = mongoose.model('Quiz',Quiz)
