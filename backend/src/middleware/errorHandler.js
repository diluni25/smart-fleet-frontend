function notFound(req, res) {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
}

function errorHandler(err, _req, res, _next) {
  if (err.code === 11000) return res.status(409).json({ success: false, message: 'A record with this unique value already exists' });
  if (err.statusCode) return res.status(err.statusCode).json({ success: false, message: err.message, conflicts: err.conflicts || undefined });
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).json({ success: false, message: err.message });
  }
  console.error(err);
  res.status(500).json({ success: false, message: 'Internal server error' });
}

module.exports = { notFound, errorHandler };
