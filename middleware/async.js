// @desc    Async error handler
//Used so that try catch can be skipped in controllers
// async funtions are wrapped with async handler
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}

module.exports = asyncHandler