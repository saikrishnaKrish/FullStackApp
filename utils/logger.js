const loggerMiddleware = (req, res, next) => {
    console.warn("requested", req.url);
   console.warn("body",req.body);
    next();
};

module.exports = loggerMiddleware;
