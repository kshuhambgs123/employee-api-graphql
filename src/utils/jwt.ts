import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export const createToken = (user: any) =>
  jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

export const getUserFromToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};
