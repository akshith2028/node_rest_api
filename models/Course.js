const { default: mongoose } = require('mongoose');
const mangoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title:{
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
    tuitionsFee:{
        type:Number,
        required:[true,'Please add a tuitions fee']
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


// Static method to get avg of course tuitions
CourseSchema.statics.getAverageCost = async function(bootcampId) {
    const obj = await this.aggregate([
        {
            $match: { bootcamp: bootcampId }
        },
        {
            $group: {
                _id: '$bootcamp',
                averageCost: { $avg: '$tuitionsFee' }
            }
        }
    ]);
    try {
        await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
            averageCost: Math.ceil(obj[0].averageCost / 10) * 10
        });
    } catch (err) {
        console.error(err);
    }
}

// Call getAverageCost after save
CourseSchema.post('save', function(){
    this.constructor.getAverageCost(this.bootcamp);
});

// Call getAverageCost before remove
CourseSchema.pre('remove', function(){
    this.constructor.getAverageCost(this.bootcamp);
});


module.exports = mongoose.model('Course',CourseSchema)