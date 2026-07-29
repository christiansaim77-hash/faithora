import jwt from 'jsonwebtoken';

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

function requireSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    const err: any = new Error('JWT_SECRET is not set in environment');
    err.status = 500;
    throw err;
  }
  return secret;
}

export function signToken(payload: object) {
  const secret = requireSecret();
  return jwt.sign(payload, secret, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string) {
  const secret = requireSecret();
  return jwt.verify(token, secret);
}
