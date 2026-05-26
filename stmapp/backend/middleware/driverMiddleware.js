// backend/middleware/driverMiddleware.js
import asyncHandler from 'express-async-handler';

export const driver = asyncHandler((req, res, next) => {
  if (req.user && req.user.role === 'driver') {
    return next();
  }
  res.status(403).json({ message: 'Driver access required' });
});
