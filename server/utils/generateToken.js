import jwt from 'jsonwebtoken';

export const generateToken = (res, userId) => {
  const secret = process.env.JWT_SECRET || 'abhay-portfolio-secure-jwt-secret-key-2026';
  const token = jwt.sign({ id: userId }, secret, {
    expiresIn: '30d',
  });

  const isProduction = process.env.NODE_ENV === 'production';

  // Set HTTP-Only Cookie
  if (res && res.cookie) {
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'strict' : 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
  }

  return token;
};

export const clearToken = (res) => {
  if (res && res.cookie) {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });
  }
};
