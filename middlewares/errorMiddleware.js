const errorHandler = (error, req, res, next) => {
  if (res.headerSent) return next(error);
  res.status(error.code || 500);
  res.json({
    error: error.message || 'An unknown error occurred!!',
    stack: process.env.NODE_ENV === 'production' ? null : error.stack,
  });
}

module.exports = { errorHandler }
