import rateLimit from 'express-rate-limit';

export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Allow up to 100 requests per window during development and testing
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many contact inquiries sent from this IP, please try again after 15 minutes',
  },
});

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Rate limit exceeded, please try again later',
  },
});
