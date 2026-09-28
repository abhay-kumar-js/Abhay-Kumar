import jwt from 'jsonwebtoken';
import { DataStore } from '../utils/dataStore.js';

export const protect = async (req, res, next) => {
  let token;

  // 1. Try to read token from HTTP-only Cookie
  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  // 2. Fallback to Authorization Header (Bearer token)
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no authentication token provided',
    });
  }

  try {
    const secret = process.env.JWT_SECRET || 'abhay-portfolio-secure-jwt-secret-key-2026';
    const decoded = jwt.verify(token, secret);

    const user = await DataStore.findUserById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, user not found',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token invalid or expired',
    });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied: Administrator privileges required',
    });
  }
};
