const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // max 100 requests per minute per IP
  message: {
    error: 'Too many requests, please try again after a minute'
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = limiter;