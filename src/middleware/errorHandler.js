function notFound(req, res) {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
}
function errorHandler(err, _req, res, _next) {
  console.error(`[API] ${err.status || err.statusCode || 500}: ${err.message}`);
  if (err.code === 11000) return res.status(409).json({ success: false, message: 'Duplicate unique value' });
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).json({ success: false, message: err.message });
  }
  const code = Number(err.status || err.statusCode);
  const status = Number.isInteger(code) && code >= 400 && code < 600 ? code : 500;
  res.status(status).json({ success: false, message: status === 500 ? 'Internal server error' : err.message });
}
module.exports = { notFound, errorHandler };
