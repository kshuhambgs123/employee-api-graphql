import bcrypt from 'bcryptjs';
import { createToken } from '../utils/jwt';

export const resolvers = {
  Query: {
    employee: async (_, { id }, { prisma }) => prisma.employee.findUnique({ where: { id: Number(id) } }),
    employees: async (_, { filter, sort, skip = 0, take = 10 }, { prisma, user }) => {
      if (!user || user.role !== 'ADMIN') throw new Error('Unauthorized');
      return prisma.employee.findMany({
        where: { ...filter },
        orderBy: sort ? { [sort.field]: sort.order.toLowerCase() } : undefined,
        skip,
        take,
      });
    },
  },

  Mutation: {
    addEmployee: async (_, { input }, { prisma, user }) => {
      if (!user || user.role !== 'ADMIN') throw new Error('Only admins can add employees');
      const hashedPassword = await bcrypt.hash(input.password, 10);
      return prisma.employee.create({
        data: { ...input, password: hashedPassword },
      });
    },

    updateEmployee: async (_, { id, input }, { prisma, user }) => {
      if (!user || user.role !== 'ADMIN') throw new Error('Unauthorized');
      return prisma.employee.update({
        where: { id: Number(id) },
        data: input,
      });
    },

    login: async (_, { email, password }, { prisma }) => {
      const user = await prisma.employee.findUnique({ where: { email } });
      if (!user) throw new Error('No user found');

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('Incorrect password');

      const token = createToken(user);
      return { token, user };
    },
  },
};
