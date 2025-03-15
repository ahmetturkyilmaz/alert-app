import rateLimit from "express-rate-limit";

export const standardLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
