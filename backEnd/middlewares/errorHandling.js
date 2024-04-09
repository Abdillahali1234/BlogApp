// not found middleware
const notFound = (req, res, next) => {
  const err = new Error(`Not Found-${req.originalUrl}`);

  next(err);
};

// error handlers middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV == "devlopment" ? err.stack : null,
  });
};
module.exports = {
  errorHandler,
  notFound,
};
