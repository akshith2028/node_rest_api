const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require('../models/Course');

//@desc     Get all courses
//@route    GET /api/v1/courses
//@route    GET /api/v1/bootcamps/:bootcampId/courses
//@access   Public
exports.getCourses = asyncHandler(async(req, res, next) => {

    if(req.params.bootcampId){
        const courses = await Course.find({ bootcamp: req.params.bootcampId });

        return res.status(200).json({
            success:true,
            count:courses.length,
            data:courses
        });
    }else{
        res.status(200).json(res.advancedResults);
    }
});
    

//@desc      Get Single courses
//@route    GET /api/v1/courses/:id
//@access   Public
exports.getCourse = asyncHandler(async(req, res, next) => {
        
        const course = await Course.findById(req.params.id).populate({
            path:'bootcamp',
            select:'name description'
        });
        if(!course){
            next(new ErrorResponse(`Course not found with id of ${req.params.id}`, 404));
        }
        res.status(200).json({
            success:true,
            data:course
            });
       
    });

//@desc     Add courses
//@route    POST /api/v1/bootcamps/:bootcampId/courses
//@access   Private
exports.addCourse = asyncHandler(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId;
    req.body.user = req.user.id;
    const bootcamp = await Bootcamp.findById(req.params.bootcampId);
    if(!bootcamp){
        next(new ErrorResponse(`Bootcamp not found with id of ${req.params.bootcampId}`, 404));
    }
    const course = await Course.create(req.body);
   res.status(201).json({
       success:true,
       data:course
   });
});

//@desc     Update courses
//@route    PUT /api/v1/courses/:id
//@access   Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
    let course = await Course.findById(req.params.id);
    if(!course){
        next(new ErrorResponse(`Course not found with id of ${req.params.id}`, 404));
    }
    else{
        course = await Course.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators:true
        });
    }
    res.status(200).json({
        success:true,
        data:course
    });
});

//@desc      update courses
//@route    DELETE /api/v1/courses/:id
//@access   Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id);
    if(!course){
        next(new ErrorResponse(`Course not found with id of ${req.params.id}`, 404));
    }
    else{
        await course.remove();
    }
    res.status(200).json({
        success:true,
        data:{}
    });
});