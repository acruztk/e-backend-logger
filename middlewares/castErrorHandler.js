module.exports = function castErrorHandler (error, req, res, next) {
  if (error.name === 'CastError') {
    res.status(400).json({
      message: 'Invalid ID format'
    })
  } else {
    next(error)
  }
}
