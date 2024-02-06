const { default: mongoose } = require('mongoose');
const mangoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    tiile:{
        type:String,
        trim:true,
        required:[true,'Please add a course title']
    },
    description:{
        type:String,
        required:[true,'Please add a description']
    },
    weeks:{
        type:String,
        required:[true,'Please add number of weeks']
    },
    tuitionitionsFee:{
        type:Number,
        required:[true,'Please add a tuitionitions fee']
    },
    minimumSkill:{
        type:String,
        required:[true,'Please add a minimum skill'],
        enum:['beginner','intermediate','advanced']
    },
    scholarshipAvailable:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    bootcamp:{
        type:mongoose.Schema.ObjectId,
        ref:'Bootcamp',
        required:true
    }

});

module.exports = mongoose.model('Course',CourseSchema)