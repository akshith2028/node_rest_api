// @desc    Logs requests   
// Used to log requests in devlopement env but using morgan now
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

module.exports = logger;
