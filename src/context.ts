import { PrismaClient } from '@prisma/client';
import { getUserFromToken } from './utils/jwt';

const prisma = new PrismaClient();

export const context = ({ req }) => {
  const token = req.headers.authorization || '';
  const user = getUserFromToken(token.replace('Bearer ', ''));
  return { prisma, user };
};
